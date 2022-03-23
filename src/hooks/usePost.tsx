import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function usePost<T>(
	url: string,
	payload: any,
	navigateURL: string
) {
	let navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [apiData, setApiData] = useState<T>();
	const [error, setError] = useState<unknown>();

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const res = await fetch(url, {
					mode: "cors",
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
					credentials: "include",
				});
				if (!res.ok) throw Error("Could not fetch data");
				const data = await res.json();
				setApiData(data);
				navigate(navigateURL, { replace: true });
			} catch (err) {
				setError(err);
				console.error(err);
				throw Error("Error");
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [navigateURL, payload, url]);

	return { isLoading, apiData, error };
}
