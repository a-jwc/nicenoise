import { useEffect, useState } from "react";

export default function useFetch(url: string) {
	const [isLoading, setIsLoading] = useState(false);
	const [apiData, setApiData] = useState(null);
	const [error, setError] = useState<unknown>();

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const resp = await fetch(url, {
					mode: "cors",
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});
				if (!resp.ok) throw Error("GET request failed");
				const data = await resp.json();
				setApiData(data);
			} catch (err) {
        console.error(err);
				setError(err);
				throw Error("Error");
			} finally {
				setIsLoading(false);
      }
		};
		fetchData();
	}, [url]);

	return { isLoading, apiData, error };
}
