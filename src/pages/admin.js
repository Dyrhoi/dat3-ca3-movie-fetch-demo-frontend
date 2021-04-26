import facade from "../authenticationFacade";
import React, { useState, useEffect } from "react";

function Admin() {
	const [content, setContent] = useState([]);
	useEffect(() => {
		facade.fetchData("/api/info/admin").then((data) => setContent(data));
	}, []);
	return <div>{JSON.stringify(content)}</div>;
}

export default Admin;
