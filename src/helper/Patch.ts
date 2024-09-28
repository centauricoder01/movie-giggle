export async function patchData<T>(url: string, data: T) {
  console.log(data, "this is the data of the Patch request");
  return fetch(`/api/${url}`, {
    method: "PATCH", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Specify the content type
      // Add any other headers if needed
    },
    body: JSON.stringify(data), // Convert your data to a JSON string
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      return data; // Handle the data received
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );

      return error;
    });
}
