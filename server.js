const express = require('express');
const helmet = require("helmet")
const morgan = require('morgan')

//import Db models
const postDb = require('./data/helpers/postDb')
const tagDb = require('./data/helpers/tagDb')
const userDb = require('./data/helpers/userDb')

//instance of express server
const server = express()

// add json middleware
server.use(express.json())

// add helmet  and morgan middleware
server.use(helmet())
server.use(morgan('dev'))


server.get('/', (req, res) =>{
    res.send('Welcome to API for POST, TAGS AND USERS')
})

//POSTS API CRUD
server.get('/posts',(req, res) => {
    const post = postDb.get()
    post
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({error : `Sorry $(err) Has occurred`})
        })

})

server.get('/posts/:id',(req, res) => {
    const { id } = req.params
        const taggedPosts = postDb.getPostTags(id)
        taggedPosts
            .then( response => {
                responds.message = 'Post Sucessful'
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json( {error : `Post wasn't sucessfull because of ${err}`} )
            })

})

server.post('/posts',(req, res) => {
    const { userId, text } = req.body
    const newPost = { userId, text }
    if(!userId || !text){
        res.status(400).json({ error : 'Please provide your userId and Text'})
    }
    else{
        const posts = postDb.insert(newPost)
        posts
            .then( response => {
                responds.message = 'Post Sucessful'
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json( {error : `Post wasn't sucessfull because of ${err}`} )
            })
    }

})


server.put('/posts/:id',(req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body
    const newPost = { userId, text }

    if(!userId || !text){
        res.status(400).json({ error : 'Please provide your userId and Text'})
    }
    else {
        const updatedPost = postDb.update( id, newPost )
        updatedPost
           .then(responds => {
            responds.message = 'update was sucessful'
               res.status(200).json(responds)
           })
           .catch(err => {
               res.status(500).json({ error : "there was an error while updating records"})
           })
    }

})

server.delete('/posts/:id',(req, res) => {
    const { id } = req.params
    console.log(id)
    const detetedPost = postDb.remove(id)
    detetedPost
        .then(responds => {
        res.status(200).json(responds)
        })
        .catch(err => {
        res.status(404).json({ error : "Delete was not sucessful" })
        })
})


//TAG API CRUD

server.get('/tags',(req, res) => {
    const tags = tagDb.get()
    tags
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({error : `Sorry $(err) Has occurred`})
        })

})

server.post('/tags',(req, res) => {
    const { userId, text } = req.body
    const newTag = { userId, text }
    if(!userId || !text){
        res.status(400).json({ error : 'Please provide your userId and Text'})
    }
    else{
        const posts = tagDb.insert(newTag)
        posts
            .then( response => {
                responds.message = 'Post Sucessful'
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json( {error : `Post wasn't sucessfull because of ${err}`} )
            })
    }

})

server.put('/tags/:id',(req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body
    const tag = { userId, text }

    if(!userId || !text){
        res.status(400).json({ error : 'Please provide your userId and Text'})
    }
    else {
        const taggedPost = tagDb.update( id, tag )
        taggedPost
           .then(response => {
            response.message = 'Tag update was sucessful'
               res.status(200).json(response)
           })
           .catch(err => {
               res.status(500).json({ error : "there was an error while updating Tag"})
           })
    }

})

server.delete('/tags/:id',(req, res) => {
    const { id } = req.params
    const taggedPost = tagDb.remove(id)
    taggedPost
        .then(responds => {
        res.status(200).json(responds)
        })
        .catch(err => {
        res.status(404).json({ error : "Delete was not sucessful" })
        })
})

// USERS API CRUD
server.get('/users',(req, res) => {
    const users = userDb.get()
    users
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({error : `Sorry $(err) Has occurred`})
        })

})

server.get('/posts/:id',(req, res) => {
    const { id } = req.params
        const userPost = userDb.getUserPosts(id)
        userPost
            .then( response => {
                responds.message = 'Post Sucessful'
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json( {error : `Post wasn't sucessfull because of ${err}`} )
            })

})

server.post('/users',(req, res) => {
    const { userId, user } = req.body
    const newUser = { userId, user }
    if(!userId || !user){
        res.status(400).json({ error : 'Please provide your userId and Text'})
    }
    else{
        const newUserCreated = userDb.insert(newUser)
        newUserCreated
            .then( response => {
                responds.message = 'user created Sucessfully'
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json( {error : `Post wasn't sucessfull because of ${err}`} )
            })
    }

})


server.put('/users/:id',(req, res) => {
    const { id } = req.params;
    const { userId, user } = req.body
    const newUser = { userId, user }

    if(!userId || !user){
        res.status(400).json({ error : 'Please provide your userId and Text'})
    }
    else {
        const updatedUser = userDb.update( id, newUser )
        updatedUser
           .then(responds => {
            responds.message = 'user update was sucessful'
               res.status(200).json(responds)
           })
           .catch(err => {
               res.status(500).json({ error : "there was an error while updating records"})
           })
    }

})

server.delete('/users/:id',(req, res) => {
    const { id } = req.params
    const detetedUser = userDb.remove(id)
    detetedUser
        .then(responds => {
        res.status(200).json(responds)
        })
        .catch(err => {
        res.status(404).json({ error : "user Delete was not sucessful" })
        })
})


server.listen(5000, () =>{
    console.log('API is Running !!!!')
})