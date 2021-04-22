import { apiUrl } from '../settings'
import React, { useState, useEffect } from "react"

const URL = apiUrl + "/ext/admin"

function Admin() {
    const [content, setContent] = useState([])
    useEffect(() => {
        fetch(URL).then((res) => res.json()).then((data) => {
            setContent(data.results)
        });
    }, [])
    return (
        content
    )
}

export default Admin;