import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import CategoryGrid from './components/CategoryGrid'
import ProductShowcase from './components/ProductShowcase'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <HeroSlider />
      <CategoryGrid />
      <ProductShowcase />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default App
