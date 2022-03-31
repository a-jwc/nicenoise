export const sendRequest = async (
	url: string,
	payload: any,
	method: string
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
