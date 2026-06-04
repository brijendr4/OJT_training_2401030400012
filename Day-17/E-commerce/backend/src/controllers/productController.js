import Product from '../models/Product.js'
import { cache } from '../lib/redis.js'

// Escape special regex characters to prevent MongoDB regex injection
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// GET /api/products
export async function getProducts(req, res, next) {
  try {
    const { category, search, featured } = req.query

    // Build a stable cache key
    const cacheKey = `products:cat:${category || 'all'}:search:${search || 'none'}:feat:${featured || 'all'}`

    const cachedProducts = await cache.get(cacheKey)
    if (cachedProducts) {
      return res.json(cachedProducts)
    }

    const filter = {}

    if (category && category !== 'all') {
      // Validate against allowed categories to prevent unexpected queries
      const allowed = ['shirts', 'jackets', 'pants', 'shoes', 'accessories']
      if (!allowed.includes(category)) {
        return res.status(400).json({ error: 'Invalid category.' })
      }
      filter.category = category
    }

    if (search) {
      // Escape user input to prevent MongoDB regex injection attack
      const safeSearch = escapeRegex(search.trim().slice(0, 100)) // max 100 chars
      filter.name = { $regex: safeSearch, $options: 'i' }
    }

    if (featured === 'true') {
      filter.featured = true
    }

    const products = await Product.find(filter).sort({ createdAt: -1 })

    // Cache for 10 minutes
    await cache.set(cacheKey, products, 600)

    res.json(products)
  } catch (err) {
    next(err)
  }
}

// GET /api/products/:id
export async function getProductById(req, res, next) {
  try {
    const cacheKey = `products:id:${req.params.id}`

    const cachedProduct = await cache.get(cacheKey)
    if (cachedProduct) {
      return res.json(cachedProduct)
    }

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found.' })

    // Cache single product for 1 hour
    await cache.set(cacheKey, product, 3600)

    res.json(product)
  } catch (err) {
    next(err)
  }
}
