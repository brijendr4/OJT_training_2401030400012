import { Router } from 'express'
import Order from '../models/Order.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// POST /api/orders — create order (protected)
router.post('/', authenticate, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Order must have at least one item.' })
    }
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address) {
      return res.status(400).json({ error: 'Shipping address is required.' })
    }

    const order = await Order.create({
      user: req.userId,
      items,
      total,
      shippingAddress
    })

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/orders/me — get current user's orders (protected)
router.get('/me', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate('items.product')

    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
