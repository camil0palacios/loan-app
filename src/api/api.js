const API_URL = "http://localhost:4000";

const request = (basePath) => {
  const post = async (path = "", body = {}) => {
    const url = basePath + path;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return response.json();
    } catch (error) {
      alert(`There has been an error in the request ${error.error}`);
    }
  };

  return { post };
};

const api = request(API_URL);

export { api };
