import * as React from "react";
// import * as ReactDOM from "react-dom";

import Root from "../components/root/Root";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/admin/layout/Layout";
import Login from "../components/login/Login";
import User from "../components/admin/user/User";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // loader: rootLoader,
        children: [
            {
                path: "login",
                element: <Login />,
                // loader: teamLoader,
            },
        ],
    },
    {
        path: "admin",
        element: <Layout />,
        // loader: rootLoader,
        children: [
            {
                path: "user",
                element: <User />,
                // loader: teamLoader,
            },
        ],
    }
]);

export default router;