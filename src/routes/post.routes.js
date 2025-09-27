import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

// Listar todos los posts
router.get("/", postController.getAll);

// Mostrar formulario para crear nuevo post
router.get("/create", postController.showCreateForm);

// Crear nuevo post
router.post("/create", postController.create);

// Mostrar un post específico
router.get("/:id", postController.getById);

// Mostrar formulario para editar post
router.get("/:id/edit", postController.showEditForm);

// Actualizar post
router.post("/:id/edit", postController.update);

// Eliminar post
router.post("/:id/delete", postController.delete);

export default router;
