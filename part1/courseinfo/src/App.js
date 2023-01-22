import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };

  const Content = ({ parts }) => {
    const contents = parts.map((part) => {
      return <Part key={part.name} part={part} />;
    });

    return contents;
  };

  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Total = ({ parts }) => {
    let total = 0;
    parts.forEach((part) => {
      total += part.exercises;
    });
    return <p>Number of exercises {total}</p>;
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <br />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
