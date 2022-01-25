import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setisLoading(true);

            try {
                const res = await fetch(url, {signal: controller.signal});
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                const data = await res.json();
                setisLoading(false);
                setData(data);
                setError(null);
            }
            catch (error) {
                if (error.name === 'AbortError') {
                    console.log('fetch was aborted')
                } else {
                    setisLoading(false)
                    setError('could not fetch the data')
                }
            }
        };

        fetchData();
        
        return () => {
            controller.abort()
        };
    }, [url])

    return {data, isLoading, error}
}
