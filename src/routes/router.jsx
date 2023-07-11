import * as React from "react";
// import * as ReactDOM from "react-dom";

import Root from "../components/root/Root";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/admin/layout/Layout";
import Login from "../components/login/Login";
import User from "../components/admin/user/User";
import Meal from "../components/admin/meal/Meal";
import Expenditure from "../components/admin/expenditure/Expenditure";

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
            // {
            //     path: "meal",
            //     element: <Meal />,
            //     // loader: teamLoader,
            // },
            {
                path: "meal/:consumer",
                element: <Meal />,
                // loader: teamLoader,
            },
            {
                path: "expenditure",
                element: <Expenditure />,
                // loader: teamLoader,
            },
        ],
    }
]);

export default router;