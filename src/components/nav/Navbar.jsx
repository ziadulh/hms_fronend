import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

    //root url
    const url_local = process.env.REACT_APP_ROOT_URL;

    //get current route
    let location = useLocation();

    const handleLogout = async () => {
        try {
            let auth_token = localStorage.getItem('auth-token')
            localStorage.removeItem('auth-token');
            const response = await fetch(url_local + "api/authentication/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': auth_token
                },
            });
            let json = await response.json();
            console.log(json);

            // if (json.status === true) {
            //   localStorage.setItem('auth-token', json.authToken);
            //   navigate('/')
            //   console.log(json);
            // } else {
            //   console.log(json);
            //   // json.errors.forEach(el => {
            //   //   toast.error(el.msg);
            //   // });
            // }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
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
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
                            </li>
                        </ul>

                        <button className="btn btn-outline-success" type="button" onClick={handleLogout}>LogOut</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar