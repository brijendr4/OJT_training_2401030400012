import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaFacebook, FaGithub, FaDribbble, FaPaperPlane } from 'react-icons/fa'

export default function Footer() {
  function handleSubscribe(e) {
    e.preventDefault()
    alert('Thank you for subscribing to our newsletter!')
  }

  return (
    <footer className="border-t border-light bg-primary pb-8 pt-12 mt-16 relative z-10">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Info and Socials */}
          <div className="space-y-4">
            <h5 className="font-extrabold uppercase text-xs tracking-wider text-zinc-800">Fashion & Freedom</h5>
            <p className="text-zinc-500 text-xs leading-relaxed font-semibold">
              Premium menswear designed with high utility features, breathable fabrics, and classic cuts built for modern active motion.
            </p>
            
            <ul className="flex items-center gap-3 list-none p-0 m-0 pt-2">
              <li>
                <a href="https://twitter.com/themesberg" target="_blank" rel="noopener noreferrer" className="btn btn-icon-only btn-pill btn-primary" aria-label="twitter social link">
                  <FaTwitter className="text-xs text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/themesberg/" target="_blank" rel="noopener noreferrer" className="btn btn-icon-only btn-pill btn-primary" aria-label="facebook social link">
                  <FaFacebook className="text-xs text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="https://github.com/themesberg" target="_blank" rel="noopener noreferrer" className="btn btn-icon-only btn-pill btn-primary" aria-label="github social link">
                  <FaGithub className="text-xs text-zinc-500" />
                </a>
              </li>
              <li>
                <a href="https://dribbble.com/themesberg" target="_blank" rel="noopener noreferrer" className="btn btn-icon-only btn-pill btn-primary" aria-label="dribbble social link">
                  <FaDribbble className="text-xs text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h5 className="font-extrabold uppercase text-xs tracking-wider text-zinc-800 mb-4">Collections</h5>
            <ul className="space-y-2.5 text-xs text-zinc-500 list-none p-0 m-0 font-bold uppercase tracking-wider">
              <li><Link to="/products" className="hover:text-zinc-900 transition-colors no-underline text-inherit">All Collections</Link></li>
              <li><Link to="/products?category=shirts" className="hover:text-zinc-900 transition-colors no-underline text-inherit">Linen Shirts</Link></li>
              <li><Link to="/products?category=jackets" className="hover:text-zinc-900 transition-colors no-underline text-inherit">Denim Jackets</Link></li>
              <li><Link to="/products?category=pants" className="hover:text-zinc-900 transition-colors no-underline text-inherit">Chino Pants</Link></li>
            </ul>
          </div>

          {/* Column 3: Corporate Info */}
          <div>
            <h5 className="font-extrabold uppercase text-xs tracking-wider text-zinc-800 mb-4">Company Info</h5>
            <ul className="space-y-2.5 text-xs text-zinc-500 list-none p-0 m-0 font-bold uppercase tracking-wider">
              <li><a href="#" className="hover:text-zinc-900 transition-colors no-underline text-inherit">Blog Articles</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors no-underline text-inherit">Our Story</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors no-underline text-inherit">Shipping Policies</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors no-underline text-inherit">Returns Center</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscribe Form */}
          <div className="space-y-3">
            <h5 className="font-extrabold uppercase text-xs tracking-wider text-zinc-800">Subscribe</h5>
            <p className="text-zinc-500 text-xs leading-relaxed font-semibold">
              Join our active mailing list. We send rare newsletters highlighting exclusive drops.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input 
                required 
                type="email" 
                className="form-control" 
                placeholder="example@company.com" 
                aria-label="Subscribe email input"
              />
              <button type="submit" className="btn btn-primary w-full text-xs font-black uppercase py-2.5 flex items-center justify-center gap-2">
                <FaPaperPlane className="text-[10px]" /> Subscribe Now
              </button>
            </form>
          </div>

        </div>

        {/* Separator line & copyright */}
        <hr className="border-t border-zinc-300 my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-400 font-black uppercase tracking-wider">
          <p>© 2026 Fashion & Freedom. Designed based on Neumorphic kits.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-650 transition-colors no-underline text-inherit">Terms</a>
            <a href="#" className="hover:text-zinc-650 transition-colors no-underline text-inherit">Privacy</a>
            <a href="#" className="hover:text-zinc-650 transition-colors no-underline text-inherit">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
