import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogCreateForm from './BlogCreateForm'

const blog = {
  title: 'Testblog',
  author: 'Testjaebae',
  url: 'viinaarannasta.ee'
}

test('calls callback with correct props when submitted', () => {
  const postBlogMockHander = jest.fn()
  const component = render(
    <BlogCreateForm postBlog={postBlogMockHander} />
  )
  const blogCreateForm = component.container.querySelector('#blogCreateForm')
  const titleInput = component.container.querySelector('#titleInput')
  const authorInput = component.container.querySelector('#authorInput')
  const urlInput = component.container.querySelector('#urlInput')

  fireEvent.change(titleInput, {
    target: { value: blog.title }
  })
  fireEvent.change(authorInput, {
    target: { value: blog.author }
  })
  fireEvent.change(urlInput, {
    target: { value: blog.url }
  })
  fireEvent.submit(blogCreateForm)

  expect(postBlogMockHander.mock.calls).toHaveLength(1)
  expect(postBlogMockHander.mock.calls[0][0]).toMatchObject(blog)
})