import postService from "../services/postService.js";

class PostController {
    // Mostrar todos los posts (Vista)
    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Mostrar formulario para crear nuevo post
    async showCreateForm(req, res) {
        try {
            res.render("post-create");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Crear nuevo post
    async create(req, res) {
        try {
            const { userId } = req.body; 
            const post = await postService.createPost(userId, req.body);
            res.redirect("/posts"); // Redirecciona a la lista de posts
        } catch (error) {
            res.status(400).render("post-create", { error: error.message });
        }
    }

    // Mostrar un post específico
    async getById(req, res) {
        try {
            const { id } = req.params;
            const post = await postService.getPostById(id);
            if (!post) {
                return res.status(404).render("404", { message: "Post no encontrado" });
            }
            res.render("post-detail", { post });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Mostrar formulario para editar post
    async showEditForm(req, res) {
        try {
            const { id } = req.params;
            const post = await postService.getPostById(id);
            if (!post) {
                return res.status(404).render("404", { message: "Post no encontrado" });
            }
            res.render("post-edit", { post });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar post
    async update(req, res) {
        try {
            const { id } = req.params;
            const post = await postService.updatePost(id, req.body);
            if (!post) {
                return res.status(404).render("404", { message: "Post no encontrado" });
            }
            res.redirect("/posts"); // Redirecciona a la lista de posts
        } catch (error) {
            res.status(400).render("post-edit", { error: error.message, post: req.body });
        }
    }

    // Eliminar post
    async delete(req, res) {
        try {
            const { id } = req.params;
            const post = await postService.deletePost(id);
            if (!post) {
                return res.status(404).json({ error: "Post no encontrado" });
            }
            res.redirect("/posts"); // Redirecciona a la lista de posts
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new PostController();
