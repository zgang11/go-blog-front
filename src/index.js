import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './login';
import Container from './admin/layout';
import './utils/axios'

const router = createBrowserRouter([
  {
     path: '/',
     element: <Login/>
  },
  {
    path: 'admin',
    element: <Container/>,
    children:[
      {
        path: 'article',
        name: 'article'
      },
      {
        path: 'article-table',
        name: 'article-table'
      },
      {
        path: 'tag',
        name: 'tag'
      },
    ]
 },
 {
    path: 'login',
    element: <Login/>
 }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
