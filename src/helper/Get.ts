export async function getData(url: string) {
  return fetch(`/api/${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json(); // or response.text() for plain text responses
    })
    .then((data) => {
      return data; // return the specific data you want to use
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error; // rethrow the error so it can be caught by the caller
    });
}
