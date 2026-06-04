import { Router } from 'express'
import Product from '../models/Product.js'
import { cache } from '../lib/redis.js'

const router = Router()

// GET /api/products — list all products, optional category filter
router.get('/', async (req, res) => {
  try {
    const { category, search, featured } = req.query
    
    // Generate a unique cache key based on query parameters
    const cacheKey = `products:cat:${category || 'all'}:search:${search || 'none'}:feat:${featured || 'all'}`
    
    // Try to get from cache
    const cachedProducts = await cache.get(cacheKey)
    if (cachedProducts) {
      return res.json(cachedProducts)
    }

    const filter = {}
    if (category && category !== 'all') {
      filter.category = category
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }
    if (featured === 'true') {
      filter.featured = true
    }

    const products = await Product.find(filter).sort({ createdAt: -1 })
    
    // Save to cache for 10 minutes (600s)
    await cache.set(cacheKey, products, 600)
    
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/products/:id — single product
router.get('/:id', async (req, res) => {
  try {
    const cacheKey = `products:id:${req.params.id}`
    
    // Try to get from cache
    const cachedProduct = await cache.get(cacheKey)
    if (cachedProduct) {
      return res.json(cachedProduct)
    }

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    
    // Save to cache for 1 hour (3600s)
    await cache.set(cacheKey, product, 3600)
    
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
