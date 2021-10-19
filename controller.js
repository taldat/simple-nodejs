const moment = require('moment')
const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs_api"
})

module.exports = {
    create(req, res) {
        const { title, content, username, createdAt } = req.body
        
        if (!title) {
            res.json({
                status: 0,
                errorMessage: 'title is required'
            })
            return
        } else if (!typeof title == 'string') {
            res.json({
                status: 0,
                errorMessage: 'title is a string'
            })
            return
        } else if (title.trim().length > 255) {
            res.json({
                status: 0,
                errorMessage: 'title maximum length is 255'
            })
            return
        } 

        if (!content) {
            res.json({
                status: 0,
                errorMessage: 'content is required'
            })
            return
        } else if (!typeof content == 'string') {
            res.json({
                status: 0,
                errorMessage: 'content is a string'
            })
            return
        } else if (content.trim().length > 255) {
            res.json({
                status: 0,
                errorMessage: 'content maximum length is 255'
            })
            return
        }

        if (!username) {
            res.json({
                status: 0,
                errorMessage: 'username is required'
            })
            return
        } else if (!typeof username == 'string') {
            res.json({
                status: 0,
                errorMessage: 'username is a string'
            })
            return
        } else if (username.trim().length > 100) {
            res.json({
                status: 0,
                errorMessage: 'username maximum length is 100'
            })
            return
        }

        let post = {
            title,
            content,
            username
        }

        if (moment(createdAt).isValid()) {
            post.createdAt = createdAt
        } else {
            post.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
        }

        db.query('INSERT INTO posts SET ?', [post], function (error, results) {
            if (error) {
                res.json({
                    status: 0,
                    errorMessage: error
                })
                return
            } else {
                res.json({
                    status: 1,
                    data: {
                        id: results.insertId,
                        ...post
                    }
                })
                return
            }
        })
    },
    update(req, res) {
        const { id } = req.params
        const { title, content, username } = req.body

        if (!title) {
            res.json({
                status: 0,
                errorMessage: 'title is required'
            })
            return
        } else if (!typeof title == 'string') {
            res.json({
                status: 0,
                errorMessage: 'title is a string'
            })
            return
        } else if (title.trim().length > 255) {
            res.json({
                status: 0,
                errorMessage: 'title maximum length is 255'
            })
            return
        } 

        if (!content) {
            res.json({
                status: 0,
                errorMessage: 'content is required'
            })
            return
        } else if (!typeof content == 'string') {
            res.json({
                status: 0,
                errorMessage: 'content is a string'
            })
            return
        } else if (content.trim().length > 255) {
            res.json({
                status: 0,
                errorMessage: 'content maximum length is 255'
            })
            return
        }

        if (!username) {
            res.json({
                status: 0,
                errorMessage: 'username is required'
            })
            return
        } else if (!typeof username == 'string') {
            res.json({
                status: 0,
                errorMessage: 'username is a string'
            })
            return
        } else if (username.trim().length > 100) {
            res.json({
                status: 0,
                errorMessage: 'username maximum length is 100'
            })
            return
        }

        let post = {
            title,
            content,
            username
        }

        db.query('UPDATE posts SET ? WHERE id = ?', [post, id], (error, results) => {
            if (error) {
                res.json({
                    status: 0,
                    errorMessage: error
                })
                return
            } else {
                res.json({
                    status: 1,
                    data: {
                        id,
                        ...post
                    }
                })
                return
            }
        })
    },
    destroy(req, res) {
        const { id } = req.params
        db.query('DELETE FROM posts WHERE id = ?', [id], (error, results) => {
            if (error) {
                res.json({
                    status: 0,
                    errorMessage: error
                })
                return
            } else {
                res.json({
                    status: 1
                })
                return
            }
        })
    },
    get(req, res) {
        const { query, pageIndex, pageSize } = req.query

        if (!pageIndex) {
            res.json({
                status: 0,
                errorMessage: 'pageIndex is required'
            })
            return
        } else if (!typeof pageIndex == 'number') {
            res.json({
                status: 0,
                errorMessage: 'pageIndex is a number'
            })
            return
        } else if (pageIndex >= 0) {
            res.json({
                status: 0,
                errorMessage: 'pageIndex is greater than or equal to 0'
            })
            return
        }

        if (!pageSize) {
            res.json({
                status: 0,
                errorMessage: 'pageSize is required'
            })
            return
        } else if (!typeof pageSize == 'number') {
            res.json({
                status: 0,
                errorMessage: 'pageSize is a number'
            })
            return
        } else if (pageSize > 0) {
            res.json({
                status: 0,
                errorMessage: 'pageSize is greater than 0'
            })
            return
        }

        let sql = 'SELECT * FROM posts'

        if (query && typeof query == 'string') {
            sql += ` WHERE title LIKE '%${query}%'`
        }

        sql += ` LIMIT ${pageIndex*pageSize}, ${pageSize}`

        db.query(sql, (error, results) => {
            if (error) {
                res.json([])
                return
            } else {
                res.json(results)
                return
            }
        })
    }
}