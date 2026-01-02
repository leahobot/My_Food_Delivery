import { useEffect, useState } from "react";

export const useFetch = <T>(fetchFunction: () => Promise<T>) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		setLoading(true);
		setError(null);

		try {
			const data = await fetchFunction();

			setData(data);
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Unknown error"));
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setData(null);
		setError(null);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { data, loading, error, refetch: fetchData, reset };
};
