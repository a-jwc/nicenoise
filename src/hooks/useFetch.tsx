import { useEffect, useState } from "react";
import { User } from "../interfaces/interface";

export default function useFetch<T>(url: string) {
	const [isLoading, setIsLoading] = useState(false);
	const [apiData, setApiData] = useState<T>();
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
				setError(err);
				throw err;
			} finally {
				setIsLoading(false);
      }
		};
		fetchData();
	}, [url]);

	return { isLoading, apiData, error };
}
