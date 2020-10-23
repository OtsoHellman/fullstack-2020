import listHelper from '../utils/listHelper'

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const blogs = [
            {likes: 5}
        ]
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {likes: 5},
            {likes: 3},
            {likes: 1},
            {likes: 13}
        ]
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(22)
    })
})