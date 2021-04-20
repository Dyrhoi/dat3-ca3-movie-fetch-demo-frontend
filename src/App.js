import './App.css';
import facade from './apiFacade'
import React, { useState, useEffect } from "react"
import './styles/style1.css'
import './styles/style2.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams
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
  const [loggedIn, setLoggedIn] = useState(false)

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => setLoggedIn(true));
  }

  return (
    <div className="header">
      {!loggedIn ? (<LogIn login={login} />) :
        (
          <Router>
            <div>
              <Header />
              <div>
                <Switch>
                  <Route path="/user">
                    <User />
                  </Route>
                  <Route path="/admin">
                    <Admin />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
        )
      }
    </div>
  )
}

function App() {
  return (
    <UserLogin />
  )
}

function Header(prop) {
  return (
    <ul className="header">
      <li>
        <NavLink activeClassName="selected" to="/user">User</NavLink>
      </li>
      <li>
        <NavLink activeClassName="selected" to="/admin">Admin</NavLink>
      </li>
    </ul>
  )
}

function User() {
  return (
    <div className="content">
      This is users
    </div>
  )
}

function Admin() {
  return (
    <div className="content">
      This is admin
    </div>
  )
}

export default App;
