export async function deleteData(url: string) {
  return fetch(`/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Add other headers if necessary (e.g., authorization headers)
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // or response.text() for plain text responses
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error;
    });
}
