import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { signup, login, me } from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// Rate limiter: max 10 requests per 15 minutes per IP on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: 'Too many requests. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
})

// POST /api/auth/signup — public, rate-limited
router.post('/signup', authLimiter, signup)

// POST /api/auth/login — public, rate-limited
router.post('/login', authLimiter, login)

// GET /api/auth/me — protected via authenticate middleware
router.get('/me', authenticate, me)

export default router
