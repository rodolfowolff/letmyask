import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {database} from '../services/firebase';
import {useAuth} from './useAuth';

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: 'string';
      avatar: 'string';
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: 'string';
    avatar: 'string';
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const {user} = useAuth();
  const history = useHistory();

  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const [title, setTitle] = useState('');
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [checkIsAdmin, setCheckIsAdmin] = useState(false);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.get().then((room) => {
      if (!room.exists()) {
        alert('Essa sala já não existe mais!!');
        history.push('/');
        return;
      }
    });

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();

      if (databaseRoom?.closedAt) {
        alert('Essa sala foi encerrada!!');
        history.push('/');
        return;
      }

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuetions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id
          )?.[0],
        };
      });

      const questionSorted = parsedQuetions.sort((a, b) => b.likeCount - a.likeCount);

      setCheckIsAdmin(databaseRoom?.authorId === user?.id ? true : false);
      setQuestions(questionSorted);
      setTitle(databaseRoom?.title);
      setName(databaseRoom?.name);
      setAvatar(databaseRoom?.avatar);
    });

    history.push(`/rooms/${roomId}`);

    return () => {
      roomRef.off('value');
    };
  }, [roomId, checkIsAdmin, user?.id, history]);

  return {questions, title, name, avatar, checkIsAdmin};
}
