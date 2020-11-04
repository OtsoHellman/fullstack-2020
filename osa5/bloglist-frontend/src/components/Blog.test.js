import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = {
  name: 'testiuser',
  username: 'root'
}

const blog = {
  title: 'Testblog',
  author: 'Testjaebae',
  likes: 23,
  url: 'viinaarannasta.ee',
  user
}

test('renders content', () => {
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.likes)
  expect(component.container).not.toHaveTextContent(blog.url)
})

test('shows likes and url when "view" is clicked', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.likes)
  expect(component.container).toHaveTextContent(blog.url)
})