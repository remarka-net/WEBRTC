import {useState, useEffect, useRef} from 'react';
import socket from '../../socket';
import ACTIONS from '../../socket/actions';
import {useHistory} from 'react-router';
import {v4} from 'uuid';

export default function Main() {
  const history = useHistory();
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
  }, []);

  return (
    <div ref={rootNode}>
      <h1>Наявні Сесії</h1>

      <ul>
        {rooms.map(roomID => (
          <li key={roomID}>
            {roomID}
            <button className='joinButton' onClick={() => {
              history.push(`/room/${roomID}`);
            }}>Приєднатися до конференції</button>
          </li>
        ))}
      </ul>

      <button className='roomButton' onClick={() => {
        history.push(`/room/${v4()}`);
      }}>Створити конференцію</button>
    </div>
  );
}