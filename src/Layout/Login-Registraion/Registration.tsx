import React from 'react';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import auth, { db } from '../Firebase/Firebase';
import { doc, setDoc } from 'firebase/firestore';

const Registration: React.FC = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as string;
        const name = formData.get('name') as string;
        const photoUrl = formData.get('photo-url') as string;

        console.log("Registering:", name, photoUrl, email, password, role);

        try {
            // Create user
            const result: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            if (user) {
                // Store user data in Firestore
                await setDoc(doc(db, 'Users', user.uid), {
                    email: user.email,
                    displayName: name,
                    photoURL: photoUrl,
                    role: role
                });

                console.log('User registration successful');
            }
        } catch (error: any) {
            console.error("Registration failed:", error.message);
        }
    };

    return (
        <div>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <label className="fieldset-label">Name</label>
                                <input type="text" name="name" className="input" placeholder="Name" required />

                                <label className="fieldset-label">Photo URL</label>
                                <input type="text" name="photo-url" className="input" placeholder="Photo URL" required />

                                <label className="fieldset-label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" required />

                                <label className="fieldset-label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" required />

                                <label className="fieldset-label">Role</label>
                                <input type="text" name="role" className="input" placeholder="Role" required />

                                <button type="submit" className="btn btn-neutral mt-4">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
