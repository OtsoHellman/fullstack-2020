import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => <p>{props.text} {props.value}</p>

const Statistics = ({ good, neutral, bad }) => {

  const getAverage = () => (good - bad) / (good + neutral + bad) || 0
  const getPositive = () => `${100 * good / (good + neutral + bad) || 0} %`
  return <>
    <h1>statistics</h1>

    {good+neutral+bad > 0 ? <>
    <StatisticLine text={"good"} value={good} />
    <StatisticLine text={"neutral"} value={neutral} />
    <StatisticLine text={"bad"} value={bad} />
    <StatisticLine text={"average"} value={getAverage()} />
    <StatisticLine text={"positive"} value={getPositive()} />
    </> : <p>No feedback given</p>}
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