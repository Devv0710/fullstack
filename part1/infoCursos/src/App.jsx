const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};
const Content = ({ course }) => {
  const parts = course.parts;
  return (
    <div>
      <Part title={parts[0].name} numberOfExercises={parts[0].exercises} />
      <Part title={parts[1].name} numberOfExercises={parts[1].exercises} />
      <Part title={parts[2].name} numberOfExercises={parts[2].exercises} />
    </div>
  );
};
const Part = ({ title, numberOfExercises }) => {
  return (
    <p>
      {title} {numberOfExercises}
    </p>
  );
};
const Total = ({ course }) => {
  const parts = course.parts;
  let numberOfExercises = 0;
  parts.forEach((part) => (numberOfExercises += part.exercises));
  return <p>Number of exercises {numberOfExercises}</p>;
};
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentlas of React",
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

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};
export default App;
