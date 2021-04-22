import facade from "../authenticationFacade"
import React, { useState, useEffect } from "react"
import {apiUrl} from "../settings"

const URL = apiUrl

function Admin() {
    const [content, setContent] = useState([])
    const fetchData = () => {
        const options = facade.makeOptions("GET", true); //True add's the token
        return fetch(URL + "api/info/admin", options).then(facade.handleHttpErrors);
      };
    useEffect(() => {
       setContent (fetchData())
    }, [])
    return (
        <div>

   {JSON.stringify(content)}

        </div>
    )
}

export default Admin;