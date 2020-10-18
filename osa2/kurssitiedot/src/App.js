import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ content }) => <p>{content.name} {content.exercises}</p>

const Content = ({ contents }) => (
    <>
        {contents.map(content => <Part key={content.name} content={content} />)}
    </>
)

const Total = ({ parts }) => (
    <p>Number of exercises {
        parts
            .map(part => part.exercises)
            .reduce((a, b) => a + b)
    }</p>
)

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content contents={course.parts}
            />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            {courses.map(course => <Course course={course} key={course.id} />)}
        </div>
    )
}

export default App