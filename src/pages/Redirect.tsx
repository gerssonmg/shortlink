// src/components/RedirectToOriginalUrl.tsx

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import CircularProgress from '@mui/material/CircularProgress';


const Redirect = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      const urlKey = shortUrl!;
      console.log(shortUrl)
      const db = getDatabase();

      const urlRef = ref(db, 'shortlinks/' + urlKey);
      const snapshot = await get(urlRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        window.location.href = data.originalUrl;
      } else {
        alert('URL não encontrada');
        window.location.href = "https://shortlink-86962.web.app/";
      }
    };
    if(shortUrl)
        fetchOriginalUrl();
  }, [shortUrl]);

  return       <CircularProgress color="success" />  ;
};

export default Redirect;
