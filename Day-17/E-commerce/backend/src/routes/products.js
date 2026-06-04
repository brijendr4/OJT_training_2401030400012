import { Router } from 'express'
import { getProducts, getProductById } from '../controllers/productController.js'

const router = Router()

// GET /api/products — public, with optional filters
router.get('/', getProducts)

// GET /api/products/:id — public
router.get('/:id', getProductById)

export default router
