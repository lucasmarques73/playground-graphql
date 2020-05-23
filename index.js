const {
    ApolloServer,
    gql
} = require('apollo-server');

const tags = [{
        id: "1",
        name: "tech",
        posts: ["1", "3", "4", "5", "6", "7"]
    },
    {
        id: "2",
        name: "personal",
        posts: ["2", "4", "6", "8"]
    }
]

const posts = [{
        id: "1",
        title: 'Harry Potter and the Chamber of Secrets',
        tags: ["1"],
    },
    {
        id: "2",
        title: 'Jurassic Park',
        tags: ["2"],
    },
    {
        id: "3",
        title: 'Harry Potter and the Chamber of Secrets',
        tags: ["1"],
    },
    {
        id: "4",
        title: 'Jurassic Park',
        tags: ["1", "2"],
    },
    {
        id: "5",
        title: 'Harry Potter and the Chamber of Secrets',
        tags: ["1"],
    },
    {
        id: "6",
        title: 'Jurassic Park',
        tags: ["1", "2"],
    },
    {
        id: "7",
        title: 'Harry Potter and the Chamber of Secrets',
        tags: ["1"],
    },
    {
        id: "8",
        title: 'Jurassic Park',
        tags: ["2"],
    },
];

const typeDefs = gql `

  type Tag {
      id: ID
      name: String
      posts: [Post]
  }

  type Post {
    id: ID
    title: String
    tags: [Tag]
  }

  type Query {
    posts: [Post]
    tags: [Tag]
  }

  type Mutation {
  addPost(title: String): Post
}
`;

const resolvers = {
    Tag: {
        posts: (tag) => posts.filter(p => p.tags.includes(tag.id))
    },
    Post: {
        tags: (post) => tags.filter(t => t.posts.includes(post.id))
    },
    Query: {
        posts: () => posts,
        tags: () => tags
    },
    Mutation: {
        addPost: (_, data) => {

            
            const newPost = {
                id: posts.length + 1,
                ...data
            }
            posts.push(newPost)

            return newPost
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({
    port: process.env.PORT || 4000
}).then(({
    url
}) => {
    console.log(`Server ready at ${url}`);
});