import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  )
}

function ProductCard({ product, onOpen }) {
  return (
    <button
      onClick={() => onOpen(product)}
      className="group relative w-full overflow-hidden rounded-2xl bg-white/5 p-5 text-left ring-1 ring-white/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00A8A8]/20"
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 40px rgba(0,168,168,0.12)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-20 bg-gradient-to-br from-[#00A8A8]/0 via-[#00A8A8]/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/80 grid place-items-center">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold tracking-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-white/70">{product.subtitle}</p>
        </div>
        <div className="shrink-0 rounded-xl bg-[#00A8A8]/10 px-3 py-1 text-[#00A8A8] font-semibold">₹{product.price.toLocaleString('en-IN')}</div>
      </div>
    </button>
  )
}

function Modal({ open, onClose, product }) {
  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#0A1A2F]/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
        <div
          className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-0 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 ${
            open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
          }`}
          role="dialog"
        >
          {product && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative bg-[#0A1A2F]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                <button onClick={onClose} className="absolute right-3 top-3 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Close">✕</button>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold leading-tight">{product.name}</h3>
                <p className="mt-2 text-white/80">{product.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.features.slice(0, 4).map((f) => (
                    <Badge key={f}>• {f}</Badge>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Price</p>
                    <p className="text-2xl font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="rounded-xl bg-[#FF6F61] px-4 py-2 font-semibold text-white shadow transition hover:brightness-110">Buy Now</button>
                    <button className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-semibold text-white backdrop-blur transition hover:bg-white/20">Add to Cart</button>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold">Key Features</h4>
                  <ul className="mt-2 grid list-disc gap-1 pl-5 text-sm text-white/80">
                    {product.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const PRODUCTS = [
  {
    id: 'ultrascan-pro',
    name: 'UltraScan Pro Currency Fake Note Detector',
    subtitle: 'UV • IR • MG • MT • Dual Display',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1599387950934-1a22be059e5b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxVbHRyYVNjYW4lMjBQcm8lMjBDdXJyZW5jeSUyMEZha2V8ZW58MHwwfHx8MTc2MzE5MjY5M3ww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description:
      'Advanced real/fake detection with UV, MG, IR and Optical scanning for 100% accuracy. Compact, durable and perfect for shops, banks and offices.',
    features: [
      'Detects fake, torn and mismatched currency',
      'Multi-detection sensors: UV + IR + MG + MT',
      'Fast scanning speed up to 1000 notes/min',
      'Dual display with clear status indicators',
      'Audio and light alarm for counterfeit notes',
      'Supports ₹10 to ₹2000 denominations',
      'Auto start/stop and multi-currency support',
      '1-year warranty and premium build quality',
    ],
    specs: [
      { label: 'Speed', value: '1000 Notes/Minute' },
      { label: 'Power', value: '230V AC' },
      { label: 'Weight', value: '1.2 kg' },
      { label: 'Start/Stop', value: 'Auto' },
      { label: 'Warranty', value: '1 Year' },
    ],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'cashcount-x1',
    name: 'CashCount X1 High-Speed Counter',
    subtitle: 'Smart Counting • Dual CIS • Batch Mode',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1618004912476-29818d81ae2e?q=80&w=1470&auto=format&fit=crop',
    description:
      'High-speed currency counting with counterfeit detection. Batch and add mode for efficient cash handling.',
    features: [
      'Dual CIS sensors for accuracy',
      'Supports batch and add modes',
      'Automatic half-note detection',
      'Low-noise optimized motors',
      'Large LED display',
      'Energy efficient and durable',
    ],
    specs: [
      { label: 'Speed', value: '1200 Notes/Minute' },
      { label: 'Power', value: '230V AC' },
      { label: 'Weight', value: '4.1 kg' },
      { label: 'Display', value: 'LED' },
    ],
    video: 'https://www.youtube.com/embed/oHg5SJYRHA0',
  },
  {
    id: 'vault-guard',
    name: 'VaultGuard UV/MG Detector',
    subtitle: 'Desktop • Compact • Pro Sensors',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1470&auto=format&fit=crop',
    description:
      'Compact desktop detector with UV/MG sensors for quick validation at counters and cash desks.',
    features: [
      'Quick validation in under 1 second',
      'Pro-grade UV/MG sensors',
      'Low power consumption',
      'Compact and durable body',
      'Suitable for retail counters',
    ],
    specs: [
      { label: 'Sensor', value: 'UV/MG' },
      { label: 'Power', value: '12V DC' },
      { label: 'Weight', value: '0.9 kg' },
    ],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
]

export default function App() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const ultrascan = useMemo(() => PRODUCTS[0], [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openModal = (p) => {
    setSelected(p)
    setOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#0A1A2F] selection:bg-[#00A8A8]/30 selection:text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#0A1A2F]/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#00A8A8] to-[#FF6F61] text-white shadow-lg shadow-[#00A8A8]/30 ring-1 ring-white/20">
              SG
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-white">Sri Gokula Krishna Marketing</p>
              <p className="text-xs text-white/70">Your Trusted Partner in Currency Safety</p>
            </div>
          </a>
          <nav className="hidden gap-6 md:flex">
            {[
              { href: '#products', label: 'Products' },
              { href: '#why', label: 'Why Choose Us' },
              { href: '#reviews', label: 'Reviews' },
              { href: '#about', label: 'About' },
              { href: '#contact', label: 'Contact' },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-white/80 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#products" className="rounded-xl bg-[#00A8A8] px-4 py-2 font-semibold text-white shadow transition hover:brightness-110">
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
              Premium • Secure • Accurate
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Currency Fake Note Detection Machines
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Securing every note, every transaction — advanced technology for real note detection and cash counting.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#products" className="rounded-2xl bg-[#FF6F61] px-6 py-3 font-semibold text-white shadow transition hover:brightness-110">
                Explore Products
              </a>
              <a href="#detail" className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
                View UltraScan Pro
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <Badge>1-Year Warranty</Badge>
              <Badge>Pan-India Support</Badge>
              <Badge>Trusted by Shops & Banks</Badge>
            </div>
          </div>
        </div>
        <div className="pointer-events-none relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {['UV', 'IR', 'MG', 'Optical'].map((tag) => (
                <div key={tag} className="rounded-xl bg-[#0A1A2F]/60 p-3 text-center text-sm ring-1 ring-white/10">
                  {tag} Detection
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="products" className="relative z-10 border-t border-white/10 bg-[#0A1A2F] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured Machines</h2>
              <p className="mt-2 text-white/70">Premium detectors, cash counters and bank-grade equipment.</p>
            </div>
            <a href="#detail" className="hidden rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-semibold text-white backdrop-blur transition hover:bg-white/20 md:inline-block">View Details</a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="relative z-10 border-t border-white/10 bg-gradient-to-b from-[#0A1A2F] to-[#0A1A2F] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-white">Why Choose Us?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-white/70">Accuracy, security and durability at the core — authenticity you can depend on.</p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Trusted Partner', desc: 'Serving shops, banks and offices across India.', icon: '✅' },
              { title: 'Advanced Tech', desc: 'UV, IR, MG, MT sensors with optical scanning.', icon: '🧠' },
              { title: 'Assured Quality', desc: '1-year warranty with reliable after-sales.', icon: '🛡️' },
              { title: 'Value & Support', desc: 'Competitive pricing and great customer care.', icon: '🤝' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-white/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="relative z-10 border-t border-white/10 bg-[#0A1A2F] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-white">Customer Reviews</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              '⭐⭐⭐⭐⭐ “Accurate machine. Helps avoid fake currency.”',
              '⭐⭐⭐⭐⭐ “Highly recommended for shops & banks.”',
              '⭐⭐⭐⭐⭐ “Reliable, fast and easy to use.”',
            ].map((r, i) => (
              <blockquote key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90 backdrop-blur">
                {r}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail (UltraScan Pro) */}
      <section id="detail" className="relative z-10 border-t border-white/10 bg-gradient-to-b from-[#0A1A2F] to-[#0A1A2F] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <img src={ultrascan.image} alt={ultrascan.name} className="w-full rounded-xl object-cover" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">UltraScan Pro Currency Fake Note Detection Machine</h3>
              <p className="mt-2 text-white/80">
                Advanced real/fake detection machine with UV, MG, IR, and Optical scanning technology for 100% currency accuracy.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {ultrascan.features.slice(0, 6).map((f) => (
                  <Badge key={f}>• {f}</Badge>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="rounded-xl bg-[#00A8A8]/10 px-4 py-2 text-xl font-semibold text-[#00A8A8]">₹{ultrascan.price.toLocaleString('en-IN')}</div>
                <button className="rounded-xl bg-[#FF6F61] px-5 py-2.5 font-semibold text-white shadow transition hover:brightness-110">Add to Cart</button>
                <button className="rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 font-semibold text-white backdrop-blur transition hover:bg-white/20">Buy Now</button>
                <button className="rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 font-semibold text-white backdrop-blur transition hover:bg-white/20">Download Brochure</button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {ultrascan.specs.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/90 backdrop-blur">
                    <p className="text-sm text-white/60">{s.label}</p>
                    <p className="font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-white font-semibold">Demo Video</h4>
                <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src={ultrascan.video}
                      title="UltraScan Pro Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-white font-semibold">FAQ</h4>
                <div className="mt-3 grid gap-3">
                  {[
                    { q: 'Does it detect all INR denominations?', a: 'Yes, supports ₹10, ₹20, ₹50, ₹100, ₹200, ₹500, ₹2000.' },
                    { q: 'What is the warranty?', a: 'We provide a 1-year warranty with dedicated support.' },
                    { q: 'Is there audio/visual alert for fake notes?', a: 'Yes, both audio and light alarms are triggered.' },
                  ].map((f) => (
                    <div key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/90 backdrop-blur">
                      <p className="font-medium">{f.q}</p>
                      <p className="mt-1 text-white/70">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 border-t border-white/10 bg-[#0A1A2F] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-white">About Us</h2>
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90 backdrop-blur">
            <p>
              Sri Gokula Krishna Marketing is a trusted provider of high-quality currency verification machines, fake note detectors, cash counting machines, and financial security devices. We are committed to delivering reliable and advanced technology to shops, banks, offices, and businesses across India.
            </p>
            <p className="mt-3">
              With a focus on accuracy, security, and durability, our products ensure that every transaction is safe. We offer excellent customer support, competitive pricing, and 100% assured quality.
            </p>
            <p className="mt-3 font-medium">Our mission is simple:</p>
            <p className="mt-1">To protect businesses from counterfeit currency and improve cash-handling efficiency through advanced technology.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 border-t border-white/10 bg-gradient-to-b from-[#0A1A2F] to-[#0A1A2F] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
              <p className="mt-2 text-white/70">Request a demo, quote or technical assistance. We respond within 24 hours.</p>
              <div className="mt-6 grid gap-3 text-white/90">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">📞 +91-90000-00000</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">✉️ support@sgkmarketing.com</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">📍 India — Nationwide Service</div>
              </div>
            </div>
            <form className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-white/70">Name</label>
                  <input required className="mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none backdrop-blur" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Phone</label>
                  <input required className="mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none backdrop-blur" placeholder="Your phone" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-white/70">Email</label>
                  <input type="email" required className="mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none backdrop-blur" placeholder="you@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-white/70">Message</label>
                  <textarea rows={4} className="mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none backdrop-blur" placeholder="How can we help?" />
                </div>
              </div>
              <button type="submit" className="mt-4 w-full rounded-xl bg-[#00A8A8] px-5 py-3 font-semibold text-white shadow transition hover:brightness-110">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A1A2F] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/60">© {new Date().getFullYear()} Sri Gokula Krishna Marketing. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </footer>

      <Modal open={open} onClose={() => setOpen(false)} product={selected} />
    </div>
  )
}
