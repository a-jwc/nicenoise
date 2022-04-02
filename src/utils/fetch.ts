export const sendRequest = async (
	url: string,
	method: string,
	payload?: any
) => {
	try {
		const res = await fetch(url, {
			mode: "cors",
			method: `${method}`,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			credentials: "include",
		});
		if (!res.ok) throw Error("Could not fetch data");
		return res;
	} catch (e) {
		throw e;
	}
};

export const logout = async () => {
	try {
		const res = await fetch("http://localhost:8000/api/v1/auth/logout", {
			mode: "cors",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		if (!res.ok) throw Error("Could not fetch data");
		await res.json();
	} catch (err) {
		console.error(err);
		throw Error("Error");
	} finally {
		console.log("Logged out");
		window.location.reload();
	}
};
