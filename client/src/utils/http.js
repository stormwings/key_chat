export default class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      const req = await fetch(url);
      const json = await req.json();
      return json;
    } catch (error) {
      console.log('HTTP GET Error: ', error);
      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      const request = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await request.json();
      return json;
    } catch (error) {
      console.error('HTTP POST Error: ', error);
      throw Error(error);
    }
  };

  put = async (url, body) => {
    try {
      const request = await fetch(url, {
        method: 'PUT',
        body,
      });
      const json = await request.json();
      return json;
    } catch (error) {
      console.error('HTTP PUT Error: ', error);
      throw Error(error);
    }
  };

  remove = async (url) => {
    try {
      const request = await fetch(url, {
        method: 'DELETE',
      });
      const json = await request.json();
      return json;
    } catch (error) {
      console.error('HTTP DELETE Error: ', error);
      throw Error(error);
    }
  };
}