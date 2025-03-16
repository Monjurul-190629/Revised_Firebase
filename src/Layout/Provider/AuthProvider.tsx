import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import auth, { db } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";

// Define types
interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => Promise<any>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const signIn = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);
            if (firebaseUser) {
                console.log("User logged in:", firebaseUser);

                try {
                    const docRef = doc(db, "Users", firebaseUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("User data found:", docSnap.data());
                        setUser(firebaseUser); // ✅ Store user data correctly
                    } else {
                        console.log("No user document found!");
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.log("User logged out.");
                setUser(null);
            }

            setLoading(false);
        });

        return unsubscribe; // ✅ Proper cleanup
    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Create a custom hook to use Auth
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
