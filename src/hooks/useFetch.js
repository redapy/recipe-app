import { useEffect, useState } from "react";

export const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);

    const postData = (postData) => {
        setOptions({
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async (postOption) => {
            setisLoading(true);

            try {
                const res = await fetch(url, {...postOption, signal: controller.signal});
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

        if (method === "GET") {
            fetchData();
        }

        if (method === "POST") {
            fetchData(options);
        }
        

        
        return () => {
            controller.abort()
        };
    }, [url, method, options])

    return {data, isLoading, error, postData}
}
