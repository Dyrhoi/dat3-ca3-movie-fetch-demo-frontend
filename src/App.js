import "bootstrap/dist/css/bootstrap.min.css"
import facade from './apiFacade'
import React, { useState, useEffect } from "react"
import * as userFacade from './user'
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
    <div>
      <h2>Login</h2>
      <form onChange={onChange} >
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  )

}

function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")

  useEffect(() => {
    facade.fetchData().then(data => setDataFromServer(data.msg));
  }, [])

  return (
    <div className="content">
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
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
                {user.username}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

function User() {
  return (
    <div>
      This is users
    </div>
  )
}

function Admin() {
  return (
    <div>
      This is admin
    </div>
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
