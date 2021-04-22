import { apiUrl } from '../settings'
import React, { useState, useEffect } from "react"

const URL = apiUrl + "/info/user"

function User() {
    const [content, setContent] = useState([])
    useEffect(() => {
        fetch(URL).then((res) => res.json()).then((data) => {
            setContent(data.results)
        });
    }, [])

    return (
        <div>

        </div>
    )
}

export default User;