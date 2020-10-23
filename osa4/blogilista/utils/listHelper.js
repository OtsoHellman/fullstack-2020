import _ from 'lodash'
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs
    .map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)

const favoriteBlog = (blogs) => blogs.length > 0
    ? blogs.reduce((bestBlog, blog) => bestBlog.likes > blog.likes ? bestBlog : blog)
    : null

const mostBlogs = (blogs) => {
    if (blogs.length < 1) {
        return null
    }
    const blogsAuthored = _.groupBy(blogs, blog => blog.author)

    return Object.keys(blogsAuthored)
        .map(author => ({
            author,
            blogs: blogsAuthored[author].length
        }))
        .reduce((bestAuthor, author) => bestAuthor.blogs > author.blogs
            ? bestAuthor
            : author)
}

const mostLikes = (blogs) => {
    if (blogs.length < 1) {
        return null
    }
    const blogsAuthored = _.groupBy(blogs, blog => blog.author)

    return Object.keys(blogsAuthored)
        .map(author => ({
            author,
            likes: blogsAuthored[author]
                .map(blog => blog.likes)
                .reduce((a,b) => a+b)
        }))
        .reduce((bestAuthor, author) => bestAuthor.likes > author.likes
            ? bestAuthor
            : author)
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }