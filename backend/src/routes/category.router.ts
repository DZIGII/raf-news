import { Router } from "express";
import { CategoryController } from "../controller/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()
const categoryController = new CategoryController()

router.get("/", (req, res) => {
    categoryController.findAll(req, res)
})

router.get("/find", (req, res) => {
    categoryController.findByName(req, res)
})

router.get("/:id", (req, res) => {
    categoryController.find(req, res)
})

router.post("/", authMiddleware, (req, res) => {
    categoryController.create(req, res)
})

router.put("/", authMiddleware, (req, res) => {
    categoryController.update(req, res)
})

router.delete("/:id", authMiddleware, (req, res) => {
    categoryController.delete(req, res)
})

export default router
