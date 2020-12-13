import * as React from 'react';
import axios from 'axios';

type UseDataApiReturnTypes = {
  data: string | [];
  doFetch: (url: string) => void;
};

// https://juejin.im/post/6844903807000772621#heading-0
const useDataApi = (
  initialUrl: string,
  initialData: string | [],
): UseDataApiReturnTypes => {
  const [url, setUrl] = React.useState(initialUrl);
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [url]);

  const doFetch = (newUrl: string) => {
    setUrl(newUrl);
  };
  //   return { ...state, doFetch };
  return { data, doFetch };
};

export default useDataApi;
