import * as React from "react";
// import * as ReactDOM from "react-dom";

import Root from "../components/root/Root";
import Login from "../components/login/Login";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/admin/layout/Layout";

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
    }
]);

export default router;