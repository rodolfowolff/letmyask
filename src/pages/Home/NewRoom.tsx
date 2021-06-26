import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import { Aside } from "../../components/Aside";
import { Button } from '../../components/Button';

import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

import './styles.scss';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [ newRoom, setNewRoom ] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
      name: user?.name,
      avatar: user?.avatar
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <Aside />
      {/* <aside>
        <img src={ilustrationImg} alt="Ilustration response" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside> */}
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo LetMeAsk" />
          <img src={user?.avatar} alt={user?.name} className="avatar" />
          <h3>{user?.name}</h3>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}