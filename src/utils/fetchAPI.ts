import { HTTP_METHOD } from 'next/dist/server/web/http';

const fetchURLPrefix = process.env.NEXT_PUBLIC_API_URL;

const parseJSON = async (response: Response) => {
  const json = await response.json();
  return {
    status: response.status,
    ok: response.ok,
    data: json
  };
};

const fetchAPI = (url: string, method: HTTP_METHOD, body: any) =>
  fetch(fetchURLPrefix + url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })
    .then(parseJSON)
    .then((response) => {
      if (response.ok) {
        return Promise.resolve(response);
      }
      return Promise.reject(response);
    });

export default fetchAPI;
