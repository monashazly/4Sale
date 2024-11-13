import { useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [pending, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(url, options);
        const result = await response.text();

        setData(result);
        console.log("result", result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, options]);

  return { data, pending, error };
};

export default useFetch;
