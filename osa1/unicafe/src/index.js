import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => <p>{props.name} {props.amount}</p>

const Statistics = ({ good, neutral, bad }) => {

  const getAverage = () => (good - bad) / (good + neutral + bad) || 0
  const getPositive = () => `${100 * good / (good + neutral + bad) || 0} %`
  return <>
    <h1>statistics</h1>
    <Statistic name={"good"} amount={good} />
    <Statistic name={"neutral"} amount={neutral} />
    <Statistic name={"bad"} amount={bad} />
    <Statistic name={"average"} amount={getAverage()} />
    <Statistic name={"positive"} amount={getPositive()} />
  </>
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)