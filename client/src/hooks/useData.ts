import { useEffect, useState } from "react";
import ApiClient, { CanceledError } from "../services/ApiClient";
import { token } from "../constant";

export interface FetchResponse<T> {
  data: T[];
}

const useData = <T>(endpoint: string) => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setisLoading(true);
    const controller = new AbortController();

    ApiClient.get<FetchResponse<T>>(endpoint, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${token()}`, // Replace `token` with your actual token value
      },
    })
      .then((res) => {
        setData(res.data.data);
        setisLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });

    return () => controller.abort();
  }, []);

  return { data, error, isLoading, setData };
};

export default useData;
