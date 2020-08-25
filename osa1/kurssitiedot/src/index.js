import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = ({ course }) => (
    <h1>{course}</h1>
  )

  const Content = ({ contents }) => (
    <>
      {contents.map(content =>
        <p key={content.part}>
          {content.part} {content.exercise}
        </p>
      )}
    </>
  )

  const Total = ({ exercises }) => (
    <p>Number of exercises {exercises.reduce((a, b) => a + b)}</p>
  )

  return (
    <div>
      <Header course={course} />
      <Content contents={[
        {
          part: part1,
          exercise: exercises1
        },
        {
          part: part2,
          exercise: exercises2
        },
        {
          part: part3,
          exercise: exercises3
        },
      ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))