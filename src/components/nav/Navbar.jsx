import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoaderContext from '../../contexts/loadder/LoaderContext';
import Loader from '../loader/Loader';

const Navbar = () => {

    // useNavigate to navigate url
    const navigate = useNavigate();

    //root url
    const url_local = process.env.REACT_APP_ROOT_URL;

    //get current route
    let location = useLocation();

    // context from LoaderContext
    const context = useContext(LoaderContext);
    const { isLoaderEnable, setIsLoaderEnable } = context;

    // auth token
    let auth_token = localStorage.getItem('auth-token')

    const handleLogout = async () => {
        try {
            setIsLoaderEnable(true);
            localStorage.removeItem('auth-token');
            const response = await fetch(url_local + "api/authentication/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': auth_token
                },
            });
            // converting response to json
            let json = await response.json();

            if (json.status === true) {
                localStorage.removeItem('auth-token', json.authToken);
                navigate('/login')
                json.success.forEach(el => {
                    toast.success(el.msg);
                });
            } else {
                json.errors.forEach(el => {
                    toast.error(el.msg);
                });
            }
        } catch (error) {
            toast.error("Oops! Something went wrong.");
        } finally {
            setIsLoaderEnable(false);
        }
    }
    return (
        <div>
            {isLoaderEnable && <Loader />}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            {!auth_token && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
                            </li>}
                        </ul>

                        {auth_token && <button className="btn btn-outline-success" type="button" onClick={handleLogout}>LogOut</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar