const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs
    .map(blog => blog.likes)
    .reduce((a,b) => a+b, 0)

export default { dummy, totalLikes }