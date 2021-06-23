import '../styles/card-questions.scss';

type RoomCodeProps = {
  content: string;
  author: string;
  avatar: string;
}

export function CardQuestion(props: RoomCodeProps) {
  return (
    <div className="question-card">
      <span> {props.content} </span>
      <div className="user-info">
        <img src={props.avatar} alt={props.author} />
        <span>{props.author}</span>
       </div>
    </div>
  )
}