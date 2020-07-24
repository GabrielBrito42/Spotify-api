import React,{useState, useEffect} from 'react';
import './player.css';

function Player(props){

  const[link, setLink] = useState('');
  const[conta, setConta] = useState(0);
  const[lista, setLista] = useState('');


  useEffect(() => {
    props.items.map(item => {
    setLink(item.album.images[0].url);
    setConta(item.duration_ms);
    })
    console.log()
  }, [conta, link, props.progress_ms])

	const backgroundStyles = {
		backdroungImage:`url(${link})`
	};

  const progressBarStyles = {
    width: (props.progress_ms * 100 / conta) + '%'
  };
  
	return(
     props.items.map(item => (
       <div className="App">
        <div className="main-wrapper">
          <div className="now-playing__img">
            <img src={item.album.images[0].url} />
          </div>
          <div className="now-playing__side">
            <div className="now-playing__name">{item.name}</div>
            <div className="now-playing__artist">
              {item.artists[0].name}
            </div>
            <div className="now-playing__status">
              {props.is_playing ? "Playing" : "Paused"}
            </div>
            <div className="progress">
              <div className="progress__bar" style={progressBarStyles} />
            </div>
          </div>
          <div className="background" style={backgroundStyles} />{" "}
        </div>
      </div>
    ))
	)
}
export default Player;