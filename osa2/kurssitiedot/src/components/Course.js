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

export default Course