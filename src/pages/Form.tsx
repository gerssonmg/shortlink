import React, {useState} from 'react'
import { getDatabase, ref, set } from 'firebase/database';

const generateShortUrl = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrlKey = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUrlKey += characters[randomIndex];
    }
    return shortUrlKey;
  };

const Form = () => {

    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState<string | null>(null);


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
          setShortUrl(shortUrl);

          setUrl("");
          alert("URL encurtada com sucesso!");
        } catch (error) {
          console.error("Erro ao encurtar URL: ", error);
        }
      }
    };

    const handleCopy = () => {
        if (shortUrl) {
          navigator.clipboard.writeText(shortUrl);
          alert(`URL copiada: ${shortUrl}`);
        }
      };

    
  return (
    <>
    
    <form onSubmit={handleSubmit}>
        <div style={{display:"flex", flexDirection:"column"}}>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Insira a URL"
        required
        style={{ padding: '10px', fontSize: '16px', marginBottom: "12px" }}
        />
        
          <button type="submit">Encurtar URL</button>
    </div>
  </form>



    <p className="read-the-docs">
      Digite a URL que deseja encurtar
    </p>

    {shortUrl && (
        <div style={{ marginTop: '40px' }}>
        <hr/>
          <p style={{margin: "0"}}>URL encurtada</p>
          <p style={{margin: "0"}}>click para copiar</p>
          <div
            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'green' }}
            onClick={handleCopy}
          >
            {shortUrl}
          </div>
        </div>
      )}
    </>
  )
}

export default Form