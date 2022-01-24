import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, {signal: controller.signal});
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                const data = await res.json();
                setLoading(false);
                setError(null);
                setData(data);
            }
            catch (error) {
                if (error.name === 'AbortError') {
                    console.log('fetch was aborted')
                } else {
                    setLoading(false)
                    setError('could not fetch the data')
                }
            }
        };
        fetchData();
        
        return () => {
            controller.abort()
        }
    }, [url, data, loading, error])

    return {data, loading, error}
}

export default useFetch