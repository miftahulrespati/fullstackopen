import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ header, content, vote }) => {
  return (
    <div>
      <h1>{header}</h1>
      {content}
      <br />
      has {vote} votes
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const len = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);
  const [points, setPoints] = useState(new Array(len).fill(0));

  const handleNext = () => {
    let num = Math.floor(Math.random() * len);
    while (num === selected) {
      num = Math.floor(Math.random() * len);
    }
    setSelected(num);
  };

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;

    setPoints(copy);
    setMostVoted(copy.indexOf(Math.max(...copy)));
  };

  return (
    <div>
      <Anecdote
        header="Anecdote of the day"
        content={anecdotes[selected]}
        vote={points[selected]}
      />
      <Button
        text="vote"
        onClick={() => {
          handleVote();
        }}
      />
      <Button
        text="next anecdote"
        onClick={() => {
          handleNext();
        }}
      />
      <br />
      <Anecdote
        header="Anecdote with most votes"
        content={anecdotes[mostVoted]}
        vote={points[mostVoted]}
      />
    </div>
  );
};

export default App;
