import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.post("/", cartController.create);
router.post("/:cid/products/:pid", cartController.addProduct);
router.get("/:cid", cartController.getById);
router.delete("/:cid/products/:pid", cartController.removeProduct);
router.put("/:cid", cartController.update);
router.put("/:cid/products/:pid", cartController.updateProductQuantity);
router.delete("/:cid", cartController.clear);

export default router;
