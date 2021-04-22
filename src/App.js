import logo from './startcode-logo.png'
import "bootstrap/dist/css/bootstrap.min.css"
import facade from './authenticationFacade'
import React, { useState, useEffect } from "react"
import * as userFacade from './user'
import User from './pages/user'
import Admin from './pages/admin'
import Welcome from './pages/welcome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <img src={logo} alt="Logo" className="mx-auto d-block" />
      <form onChange={onChange} onSubmit={performLogin}>
        <div className="row align-self-center">
          <div className="row mb-2">
            <label for="username" className="col-sm-2 col-form-label">User name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="username" placeholder="User name" />
            </div>
          </div>
          <div className="row mb-3">
            <label for="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form><br />
      <Welcome />
    </div>
  )
}

function UserLogin() {
  const [user, setUser] = useState(null)
  const logout = () => {
    facade.logout()
    setUser(null);
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => {
        setUser(userFacade.getInfo(facade.getToken()))
      });
  }

  useEffect(() => {
    setUser(userFacade.getInfo(facade.getToken()))
  }, [])

  return (
    <div>
      {!user ? (<LogIn login={login} />) :
        (
          <Router>
            <div>
              <Header user={user} logout={logout} />
              <div>
                <Switch>
                  {userFacade.hasRole(user, "user") ? (
                    <Route path="/user">
                      <User />
                    </Route>) : ("")}
                  {userFacade.hasRole(user, "admin") ? (
                    <Route path="/admin">
                      <Admin />
                    </Route>) : ("")}
                </Switch>
              </div>
            </div>
          </Router>
        )
      }
    </div >
  )
}

function Header({ user, logout }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Quick start code</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {userFacade.hasRole(user, "user") ? (
                <NavLink className="nav-link" activeClassName="active" to="/user">User</NavLink>
              ) : ("")}
              {userFacade.hasRole(user, "admin") ? (
                <NavLink className="nav-link" activeClassName="active" to="/admin">Admin</NavLink>
              ) : ("")}
              <NavLink className="nav-link" activeClassName="" exact to="/" onClick={logout}>Logout</NavLink>
              <span className="navbar-text">
                Logged in as: {user.username}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

function App() {
  return (
    <>
      <UserLogin />
    </>
  )
}

export default App;
