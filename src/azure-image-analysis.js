// Llamar a la API Image Analysis 4.0 de Azure
const analyzeImage = async (image) => {
  const subscriptionKey = process.env.REACT_APP_KEY;
  const uriBase = process.env.REACT_APP_URIBASE;

  console.log(subscriptionKey);
  console.log(uriBase);
  // Request parameters.
  const params = {
    features: "tags,read,caption,denseCaptions,smartCrops,objects,people",
    language: "en",
    "api-version": "2023-02-01-preview",
  };
  // Perform the REST API call.
  const response = await fetch(uriBase + "?" + new URLSearchParams(params), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    },
    body: JSON.stringify({ url: image }),
  });
  const data = await response.json();
  return data;
};

const isConfigured = () => {
  if (process.env.REACT_APP_KEY && process.env.REACT_APP_URIBASE) {
    return true;
  } else {
    return false;
  }
};
export { analyzeImage, isConfigured };
