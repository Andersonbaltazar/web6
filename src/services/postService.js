import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        // Procesar hashtags si vienen como string separado por comas
        if (postData.hashtags && typeof postData.hashtags === 'string') {
            postData.hashtags = postData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag);
        }

        return await postRepository.create({ ...postData, user: user._id });
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPostsByUser(userId) {
        return await postRepository.findByUser(userId);
    }

    async getPostById(postId) {
        return await postRepository.findById(postId);
    }

    async updatePost(postId, postData) {
        // Procesar hashtags si vienen como string separado por comas
        if (postData.hashtags && typeof postData.hashtags === 'string') {
            postData.hashtags = postData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
        
        return await postRepository.update(postId, postData);
    }

    async deletePost(postId) {
        return await postRepository.delete(postId);
    }
}

export default new PostService();
