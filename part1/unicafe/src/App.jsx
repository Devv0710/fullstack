import { useState } from "react";
const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good + bad * -1) / total;
  const positive = (100 * good) / total;
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
