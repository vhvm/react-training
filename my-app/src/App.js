import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import NavBarCustom from './components/NavBar';
import Home from './pages/Home'

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <NavBarCustom />
      <App />
    </Router>
  );
};

export default AppWrapper;