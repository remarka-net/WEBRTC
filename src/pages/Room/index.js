import {useParams} from 'react-router';
import useWebRTC, {LOCAL_VIDEO} from '../../hooks/useWebRTC';

function layout(clientsNumber = 1) {
  const pairs = Array.from({length: clientsNumber})
    .reduce((acc, next, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }

      return acc;
    }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs.map((row, index, arr) => {

    if (index === arr.length - 1 && row.length === 1) {
      return [{
        width: '100%',
        height,
      }];
    }

    return row.map(() => ({
      width: '50%',
      height,
    }));
  }).flat();
}

export default function Room() {
  const {id: roomID} = useParams();
  const {clients, provideMediaRef} = useWebRTC(roomID);
  const videoLayout = layout(clients.length);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      height: '100vh',
    }}>
      {clients.map((clientID, index) => {
        return (
         
          <div key={clientID} style={videoLayout[index]} id={clientID}>
            <video className='myVideo'
              width='100%'
              height='100%'
              ref={instance => {
                provideMediaRef(clientID, instance);
              }}
              autoPlay
              playsInline
              controls
              muted={clientID === LOCAL_VIDEO}
            />
            
            {/* <button onclick="enableMute()" type="button">Mute sound</button> */}
            <button onClick={() => {  
var vid = document.getElementsByClassName("myVideo");
vid.muted = true
}} width='100px' height='100px'>Muted</button>

<button onClick={() => {  
var value = `/room/${roomID}`;
  navigator.clipboard.writeText(value );
  alert("Copied value: " + value );
}} width='100px' height='100px'>Copy url</button>


            {/* <button onclick="myFunction()" width='100px' height='100%px'>Copy url</button> */}
          
          </div>
          
        );
      })}
    </div>
    
  );
  
}

var vid = document.getElementsByClassName("myVideo");

function enableMute() { 
vid.muted = true
};


