const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs
    .map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)

const favoriteBlog = (blogs) => blogs.length > 0
    ? blogs.reduce((bestBlog, blog) => bestBlog.likes > blog.likes ? bestBlog : blog)
    : null

export default { dummy, totalLikes, favoriteBlog }