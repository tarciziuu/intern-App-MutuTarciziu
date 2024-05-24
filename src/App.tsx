import { NavLink, Outlet, Route, Routes } from 'react-router-dom';

import Home from 'pages/home';
import Users from 'pages/users';

import logo from './assets/images/logo.webp';
import './App.scss';

const Layout = () => (
  <div className="layout-container">
    <header className="header">
      <NavLink to="/">
        <img alt="Company Logo" className="logo" src={logo} />
      </NavLink>
      <nav>
        <ul>
          <li className="header__links">
            <NavLink to="/" className="home__link">
              Home
            </NavLink>
          </li>
          <li className="header__links">
            <NavLink to="/users" className="users__link">
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <Outlet />
  </div>
);

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route element={<Home />} path="/" />
      <Route element={<Users />} path="/users" />
    </Route>
  </Routes>
);

export default App;
