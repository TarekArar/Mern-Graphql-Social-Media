const Post = require('../../models/Post')

const postsresolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            }
            catch(err){
                throw new Error(err)
            }
        }
    }
}

module.exports = postsresolvers