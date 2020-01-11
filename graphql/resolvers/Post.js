const Post = require('../../models/Post')
const checkAuth = require('../../util/checkAuth')
const {AuthenticationError, UserInputError} = require('apollo-server')

const postsresolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt: -1})
                return posts
            }
            catch(err){
                throw new Error(err)
            }
        },

        async getPost(_, { postId } ) {
            try {
                const post = await Post.findById(postId);
                if(post) return post
                else throw new Error("Post Not Found")
            }
            catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context)
            if (body.trim() ==='') throw new UserInputError("Post body should not be empty")

            const newPost = new Post({
                user: user._id,
                username: user.username,
                body,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save()

            return post
        },
        async deletePost(_, { postId }, context ) {
            const user = checkAuth(context)
            try {
                const post = await Post.findById(postId);

                if(user.username === post.username ) {
                    await post.delete()
                    return "post deleted succefully"
                    }
                else throw new AuthenticationError("action not allowed")
            }
            
            catch(err) {throw new Error("post doesn't exist")}
        },
        async createComment(_, {postId, body}, context){
            const {username} = checkAuth(context)
            if (body.trim() === "") throw new UserInputError("Comment cannot be empty")

            const post = await Post.findById(postId)

            if(post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            }

            else throw new UserInputError("Post not Found") 
        },

        async deleteComment(_, {commentId, postId}, context) {
            const {username} = checkAuth(context)
            const post = await Post.findById(postId)

            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId)
                if (commentIndex < 0) throw new UserInputError("Comment not found")
                console.log(post)
                if (( post.comments[commentIndex].username != username)) throw new UserInputError("You Haven't permission to delete this comment")
                post.comments.splice(commentIndex, 1)
                await post.save()
            }
            
            return post
        },
        async toggleLike(_, {postId}, context){
            const {username} = checkAuth(context)

            const post = await Post.findById(postId)

            if(post) {
                const likeIndex = post.likes.findIndex(like => like.username === username)

                console.log(likeIndex)
                if (likeIndex >= 0){
                    post.likes.splice(likeIndex, 1)
                }

                else {
                    post.likes.unshift({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                
                await post.save()
                return post
            }

            else throw new UserInputError("Post not Found") 
        }
    }
}

module.exports = postsresolvers