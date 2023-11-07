import React, { useEffect, useState } from "react";
import {
  analyzeImage,
  isConfigured as isConfiguredAnalyze,
} from "./azure-image-analysis";
import {
  generarImagen,
  isConfigured as isConfiguredImagen,
} from "./azure-image-generation";
function App() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [claves, setClaves] = useState(null);
  const [url, setUrl] = useState("");
  const handleChange = (e) => {
    setUrl(e.target.value);
  };
  useEffect(() => {
    if (datos) {
      setClaves(Object.keys(datos));
    }
  }, [datos]);

  if (!isConfiguredAnalyze() || !isConfiguredImagen()) {
    return <h1>Las variables de entorno no estan configuuradas</h1>;
  }
  return (
    <>
      <h1>Computer vision</h1>
      <p>Ingrese URL</p>
      <input
        value={url}
        onChange={handleChange}
        placeholder="Ingrese la URL"
        style={{ width: "80vw" }}
      />
      <hr></hr>
      <button
        onClick={async () => {
          setCargando(true);
          const data = await analyzeImage(url);
          setDatos(data);
          setCargando(false);
        }}
      >
        Analizar
      </button>
      <button
        onClick={async () => {
          setCargando(true);
          const data = await generarImagen(url);
          setDatos({ ...data, prompt: url });
          setUrl(data.data[0].url);
          setCargando(false);
        }}
      >
        Generar
      </button>
      <br />
      <br />
      {cargando ? <h1>Cargando...</h1> : ""}
      {datos ? <h1>Computer Vision Analysis</h1> : ""}
      {datos ? <img src={url} alt="Imagen" width="300" /> : ""}
      {claves
        ? claves.map((clave) => {
            return (
              <div key={clave}>
                <h2>{clave}</h2>
                {datos[clave] ? <p>{JSON.stringify(datos[clave])}</p> : ""}
              </div>
            );
          })
        : ""}
    </>
  );
}

export default App;
