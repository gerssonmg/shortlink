import React, {useState} from 'react'
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

const Form = () => {

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
    <p className="read-the-docs">
      Digite a URL que deseja encurtar
    </p>
    </>
  )
}

export default Form