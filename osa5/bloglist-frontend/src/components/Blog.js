import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const pStyle = { margin: 0 }

const Blog = ({ blog, postLike }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return <div style={blogStyle}>
    <p style={pStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "hide" : "view"}
      </button>
    </p>
    {isExpanded && <div>
      <p style={pStyle}>{blog.url}</p>
      <p style={pStyle}>
        likes {blog.likes}
        <button onClick={() => postLike({ ...blog, user: blog.user.id, likes: blog.likes + 1 })}>
          like
        </button>
      </p>
      <p style={pStyle}>{blog.user.name}</p>
    </div>}
  </div>
}

export default Blog
