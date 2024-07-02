import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getDatabase, ref, set } from 'firebase/database';
import { Box } from '@mui/material';

const generateShortUrl = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortUrlKey = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortUrlKey += characters[randomIndex];
  }
  return shortUrlKey;
  // return `https://shortlink-86962.web.app/${shortUrl}`;
};


function App() {

  const [count, setCount] = useState(0)

  const [url, setUrl] = useState("");


  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const db = getDatabase();

    const eventRef = ref(db, 'events/' + Date.now());
    set(eventRef, {
      t: "title",
    })      .then(() => {
        alert('Evento cadastrado com sucesso!');
            })
      .catch(() => {
        alert('Erro ao criar URL');
      });
    


    if (url) {
      const shortUrlKey = generateShortUrl();
      const shortUrl = `https://short.ly/${shortUrlKey}`;

      try {
        await set(ref(db, 'shortlinks/' + shortUrlKey), {
          originalUrl: url,
          shortUrl: shortUrl
        });
        setUrl("");
        alert("URL encurtada com sucesso!");
      } catch (error) {
        console.error("Erro ao encurtar URL: ", error);
      }
    }
  };


  return (
    <>

    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Insira a URL"
          required
          />

            <button type="submit">Encurtar URL</button>
      </Box>
    </form>
{/* 
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
      <p className="read-the-docs">
        Digite a URL que deseja encurtar
      </p>
    </>
  )
}

export default App
