import { createBrowserRouter } from 'react-router-dom';
import Main from '../Main';
import Home from '../Home/Home';
import Login from '../Login-Registraion/Login';
import Registration from '../Login-Registraion/Registration';

export const router = createBrowserRouter([
    {
        path: '/',
        element : <Main></Main>,
        children : [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/Login',
                element: <Login></Login>
            },
            {
                path: '/Registration',
                element: <Registration></Registration>
            }
        ]
    }
])