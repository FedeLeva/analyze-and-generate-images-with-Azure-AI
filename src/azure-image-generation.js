// Generar una imagen con la API de OpenAI
const generarImagen = async (texto) => {
  const uriBase = process.env.REACT_APP_URIOPENAI;
  const apikey = process.env.REACT_APP_APIKEY;

  const response = await fetch(uriBase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apikey}`,
    },
    body: JSON.stringify({
      prompt: texto,
    }),
  });

  return await response.json();
};

const isConfigured = () => {
  if (process.env.REACT_APP_URIOPENAI && process.env.REACT_APP_APIKEY) {
    return true;
  } else {
    return false;
  }
};

export { generarImagen, isConfigured };
