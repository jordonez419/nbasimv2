// import { Navigate, Outlet } from "react-router-dom";
// import react from 'react'
// import { Route, Redirect } from "react-router-dom";

// const ProtectedRoute = ({ isLoggedIn: isLoggedIn, component: Component, ...rest }) => {
//     return <Route {...rest} render={(props) => {
//         if (isLoggedIn) {
//             return <Component />
//         } else {
//             return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//         }
//     }} />
// }
// export default ProtectedRoute

import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        if (props.isLoggedIn) {
            return <Component {...props} />
        } else {
            // alert('Wrong username or password!')
            return <Navigate to="/" />
        }
    }} />
}

export default ProtectedRoute;