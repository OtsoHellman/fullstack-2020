const tokenExtractor = (req, res, next) => {
    try {
        const authorization = req.get('authorization')
        const token = authorization && authorization.toLowerCase().startsWith('bearer ') && authorization.substring(7)
        req.token = token
    } catch (error) {
        next(err)
    }
    next()
}


export default { tokenExtractor }