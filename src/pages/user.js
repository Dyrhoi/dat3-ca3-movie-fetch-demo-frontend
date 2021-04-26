import facade from "../authenticationFacade";
import React, { useState, useEffect } from "react";

function User() {
	const [content, setContent] = useState([]);
	useEffect(() => {
		facade.fetchData("/api/info/user").then((data) => setContent(data));
	}, []);
	return <div>{JSON.stringify(content)}</div>;
}

export default User;
