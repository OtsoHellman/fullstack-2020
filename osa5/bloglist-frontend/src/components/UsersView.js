import React, { useState, useEffect } from 'react'
import userService from '../services/user'

const BlogView = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll()
            .then(response => setUsers(response))
    }, [])

    return (users.length > 0 && <>
        <h1>Users</h1>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <tr key={user.username}>
                    <th>{user.name}</th>
                    <th>{user.blogs.length}</th>
                </tr>)}
            </tbody>
        </table>
    </>)
}

export default BlogView