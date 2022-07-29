import { createServer } from 'graphql-yoga'


//Demo user data
const usersData = [
    {
        id: '1',
        name: 'Richard Mora',
        age: 23
    },
    {
        id: '2',
        name: 'Fernando Alonso',
        age: 18
    },
    {
        id: '3',
        name: 'Ayrton Senna',
        age: 34
    }
]


//Demo posts data
const postsData = [
    {
        id: '1',
        title: 'Post 1st',
        body: 'This is my first post',
        published: false,
        author: '1'
    },
    {
        id: '2',
        title: 'Post 2nd',
        body: 'This is my second post',
        published: true,
        author: '2'
    },
    {
        id: '3',
        title: 'Post 3rd',
        body: 'This is my third post',
        published: false,
        author: '3'
    }
]

//Type definitions (schema)

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        user: User!
        post: Post!
        
    }

    type User {
        id: ID!
        name: String!
        age: Int!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }


`

//Resolvers
const resolvers = {
    Query: {
        user: () => {
            return {
                id: () => '1',
                name: () => 'Ricardo Capiro',
                age: () => 23
            }
        },
        users: (parent, args) => {
            if (!args.query){
                return usersData
            }        
            return usersData.filter((user)=>{
                return user.name.toString().toLowerCase().includes(args.query.toString().toLowerCase())
            })
        },
        post: () => {   
            return {
                id: '001',
                title: 'Special Post',
                body: 'This is a special Post',
                published: false,
                author: '3'
            }
        },
        posts: (parent,args) => {
            if (!args.query){
                return postsData
            }
           return postsData.filter((post)=>{
                const isTitle = post.title.toString().toLowerCase().includes(args.query.toString().toLowerCase())
                const isBody = post.body.toString().toLowerCase().includes(args.query.toString().toLowerCase())
                return isTitle || isBody
            })
            
        }

    },
    Post: {
        author: (parent, args, ctx, info) => {
            return usersData.find((user) => {
                return user.id === parent.author
            })
        }
    }
}
const server = createServer({
    schema: {
        typeDefs,
        resolvers
    }
})

server.start()

