import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import * as $ from "jquery";
import {authEndpoint, clientId, redirectUri, scopes} from './config';
import Player from './components/player';
import hash from './hash';

function App() {

  const[spotify, setSpotify] = useState({album:{images:[{url:''}]}, name:'', artists:[{name:''}], duration_ms: ''});
  const[is_playing, setIsPlaying] =  useState(false);
  const[no_data, setNoData] = useState(false);
  const[token, setToken] = useState(null);
  const[progress_ms, setProgressMs] = useState(0);

  useEffect(() => {
    let _token = hash.access_token;

    if(_token){
      setToken(_token);
      getCurrentlyPlaying(_token);
    }
    const interval = setInterval(() => {
      tick();
    }, 5000)
    return () => {
      clearInterval(interval);
    }
  }, [progress_ms, spotify]);

  function getCurrentlyPlaying(token){
      $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if(!data) {
          setNoData(true);
          return;
        }
        setSpotify(data.item);
        setIsPlaying(data.is_playing);
        setProgressMs(data.progress_ms);
        setNoData(false);
      }
    });
  }

  function tick() {
    if(token) {
      getCurrentlyPlaying(token);
    }
  }

  return (
    <div className="App">
      {!token && (
      <a className="btn btn--loginApp-link" 
      href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20")}&response_type=token&show_dialog=true`}>
      Logar no Spotify
      </a>
      )}
      {token && !no_data && spotify &&(   
      <Player items={[spotify]} is_playing={is_playing} progress_ms={progress_ms}/>
      )}
      {no_data && (
        <p>
          Voce precisa estar escutando algo.
        </p>
      )}
    </div>
  );
}

export default App;
