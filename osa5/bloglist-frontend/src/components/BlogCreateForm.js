import React, { useState } from 'react'

const BlogCreateForm = ({ postBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()
    postBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return <form id="blogCreateForm" onSubmit={submitBlog}>
    <div>
      title:
      <input
        id="titleInput"
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)} />
    </div>
    <div>
      author:
      <input
        id="authorInput"
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)} />
    </div>
    <div>
      url:
      <input
        id="urlInput"
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)} />
    </div>
    <button id="submitBlog" type="submit">create</button>
  </form>
}

export default BlogCreateForm