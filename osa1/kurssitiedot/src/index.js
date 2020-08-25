import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Header = ({ course }) => <h1>{course}</h1>

  const Part = ({ content }) => <p>{content.name} {content.exercises}</p>

  const Content = ({ contents }) => (
    <>
      {contents.map(content => <Part key={content.name} content={content} />)}
    </>
  )

  const Total = ({ exercises }) => <p>Number of exercises {exercises.reduce((a, b) => a + b)}</p>


  return (
    <div>
      <Header course={course} />
      <Content contents={[part1, part2, part3]}
      />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))