'use client'

import { useEffect, useRef, useState, useCallback, forwardRef } from 'react'
import Image from 'next/image'
import { Menu, X, Play, Instagram, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const LOGO_URL =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RED%20logo%20transparente-WD1wJd9kAQy3LIjnWzFfICwMc3xCkj.png'

// Safe Unsplash IDs — verified working
const IMG = {
  venue:    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
  wedding:  'https://images.unsplash.com/photo-1519741497674-611481863552',
  dining:   'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
  catering: 'https://images.unsplash.com/photo-1555244162-803834f70033',
  bbq:      'https://images.unsplash.com/photo-1558030006-450675393462',
}

const GALLERY_IMAGES = [
  '/fotos/seleccion/foto-05.jpg',
  '/fotos/seleccion/foto-06.jpg',
  '/fotos/seleccion/foto-07.jpg',
  '/fotos/seleccion/foto-12.jpg',
  '/fotos/seleccion/foto-14.jpg',
  '/fotos/seleccion/foto-40.jpg',
  '/fotos/seleccion/foto-46.jpg',
  '/fotos/seleccion/foto-56.jpg',
  '/fotos/seleccion/foto-59.jpg',
  '/fotos/seleccion/foto61.png',
  '/fotos/seleccion/foto-05.jpg',
  '/fotos/seleccion/foto-06.jpg',
  '/fotos/seleccion/foto-07.jpg',
  '/fotos/seleccion/foto-12.jpg',
  '/fotos/seleccion/foto-14.jpg',
  '/fotos/seleccion/foto-40.jpg',
  '/fotos/seleccion/foto-46.jpg',
  '/fotos/seleccion/foto-56.jpg',
  '/fotos/seleccion/foto-59.jpg',
  '/fotos/seleccion/foto61.png',
]

const SERVICE_DATA = [
  {
    titleES: 'Fincas', titleEN: 'Venues',
    descES: 'Fincas para eventos en Barranquilla y la Costa Caribe. Producción integral, decoración y logística completa para tu celebración.',
    descEN: 'Event venues in Barranquilla and the Caribbean Coast. Full production, decoration and logistics for your celebration.',
    image: '/fotos/seleccion/foto-01.jpg',
  },
  {
    titleES: 'Bodas', titleEN: 'Weddings',
    descES: 'Organización de bodas en Barranquilla. Cada detalle coordinado para que solo disfrutes el día más importante de tu vida.',
    descEN: 'Wedding planning in Barranquilla. Every detail coordinated so you only enjoy the most important day of your life.',
    image: '/fotos/foto-28.jpg',
  },
  {
    titleES: 'Iglesias y Campamentos', titleEN: 'Church & Camps',
    descES: 'Logística para campamentos juveniles y retiros espirituales en la Costa Caribe. Alimentación, transporte y coordinación completa.',
    descEN: 'Logistics for youth camps and spiritual retreats on the Caribbean Coast. Catering, transport and full coordination.',
    image: '/fotos/seleccion/foto60 iglesia.png',
  },
  {
    titleES: 'Catering', titleEN: 'Catering',
    descES: 'Servicio de catering para eventos en Barranquilla. Menús diseñados por chefs con los mejores sabores de la región Caribe.',
    descEN: 'Catering service for events in Barranquilla. Chef-designed menus with the best flavors of the Caribbean region.',
    image: '/fotos/seleccion/foto-54.jpg',
  },
  {
    titleES: 'Asados RED', titleEN: 'RED BBQ',
    descES: 'Asados y parrillas para eventos en Barranquilla. El sabor auténtico del Caribe colombiano para tu celebración familiar o empresarial.',
    descEN: 'BBQ and grill for events in Barranquilla. The authentic flavor of the Colombian Caribbean for your family or corporate celebration.',
    image: '/fotos/seleccion/foto 56 mejorada.png',
  },
  {
    titleES: 'Convivencias', titleEN: 'Group Events',
    descES: 'Convivencias y reuniones grupales en Barranquilla. Nos encargamos de todo para que tu grupo solo se preocupe por disfrutar.',
    descEN: 'Group gatherings and retreats in Barranquilla. We handle everything so your group only has to enjoy.',
    image: '/fotos/foto-16.jpg',
  },
]


const TESTIMONIALS = [
  {
    name: 'Pastor Andrés Gómez',
    type: 'Campamento',
    quote:
      'Logística impecable para nuestro retiro. 250 personas atendidas con excelencia y una calidez que solo RED puede dar.',
    initials: 'AG',
  },
  {
    name: 'María Fernanda Polo',
    type: 'Boda',
    quote:
      'El equipo de RED hizo nuestro matrimonio absolutamente impecable. Profesionalismo y elegancia en cada detalle.',
    initials: 'MF',
  },
  {
    name: 'Juan Pablo Bermúdez',
    type: 'Corporativo',
    quote:
      'Coordinación perfecta en nuestro evento empresarial. Nuestros invitados quedaron completamente encantados.',
    initials: 'JP',
  },
  {
    name: 'Carolina Méndez',
    type: 'Finca',
    quote: 'La mejor decisión fue confiar en RED. Cada detalle superó ampliamente nuestras expectativas.',
    initials: 'CM',
  },
  {
    name: 'Roberto Hernández',
    type: 'Asado',
    quote:
      'El asado más espectacular que hemos vivido. RED transformó nuestra celebración familiar en algo único.',
    initials: 'RH',
  },
  {
    name: 'Ana Sofía Villamizar',
    type: 'Convivencia',
    quote:
      'Organización perfecta para nuestro retiro empresarial en Barranquilla. Todo fluyó de manera natural.',
    initials: 'AV',
  },
]

const STATS = [
  { value: 100, suffix: '+', labelES: 'Eventos realizados', labelEN: 'Events completed', isText: false, text: '' },
  { value: 10, suffix: '+', labelES: 'Años de experiencia', labelEN: 'Years of experience', isText: false, text: '' },
  { value: 100, suffix: '%', labelES: 'Logística completa', labelEN: 'Complete logistics', isText: false, text: '' },
  { value: 0, suffix: '', labelES: 'Toda la región', labelEN: 'All the region', isText: true, text: 'Caribe' },
]

type Lang = 'ES' | 'EN'

const T = {
  ES: {
    nav: ['Servicios', 'Eventos', 'Testimonios', 'Contacto'],
    navHrefs: ['#servicios', '#eventos', '#testimonios', '#contacto'],
    hero: { eyebrow: 'Agencia de eventos · Barranquilla, Colombia', h1: ['Creamos', 'experiencias', 'que perduran.'], sub: 'Más de 100 eventos realizados en la Costa Caribe. Bodas, fincas, catering y convivencias.', cta: 'Ver nuestros eventos', stats: ['Eventos', 'Años', 'Dedicación'] },
    services: { label: 'Servicios', title: 'Lo que producimos', sub: 'Agencia de eventos en Barranquilla especializada en bodas, fincas, catering, asados y convivencias en la Costa Caribe.', cta: 'Más detalles →' },
    gallery: { label: 'Galería', title: 'Así son nuestros eventos', sub: 'Momentos, montajes y experiencias producidas en toda la región Caribe.' },
    reel: { label: 'Reel', title: 'Mira cómo lo vivimos', c1t: 'Boda - Finca Caribe', c1s: 'Producción integral desde el amanecer', c2t: 'Retiro de Jóvenes', c2s: 'Logística para retiro de jóvenes y campamentos en la Costa Caribe' },
    testi: { label: 'Testimonios', title: 'Lo que dicen', sub: 'Experiencias reales de familias, parejas y empresas en Barranquilla y el Caribe.' },
    about: { label: 'Nuestra historia', h: ['Una familia,', 'una pasión,', 'un evento perfecto.'], p1: 'RED nació en Barranquilla de la mano de Robinson, su esposa Elise y su hijo Daniel. Tres personas, una sola misión: producir eventos con la calidez, la precisión y el sabor que solo una familia puede dar.', p2: 'Nos especializamos en la logística y la gastronomía de eventos en fincas, haciendas y espacios al aire libre en toda la Costa Caribe. Desde la decoración hasta el último plato, todo queda en manos de la familia RED.', p3: 'Cuando contratas a RED no contratas una empresa — contratas a una familia que pone el alma en cada evento. Eso se siente, y nuestros clientes lo saben.', cta: 'Agenda tu evento →' },
    cta: { t1: '¿Listo para tu', t2: 'próximo evento?', sub: 'Hablemos. Te ayudamos a producir con la elegancia y precisión que solo RED puede ofrecerte.', wa: 'Escríbenos por WhatsApp', email: 'Agenda una llamada' },
    floating: 'Cotizar evento',
  },
  EN: {
    nav: ['Services', 'Events', 'Testimonials', 'Contact'],
    navHrefs: ['#servicios', '#eventos', '#testimonios', '#contacto'],
    hero: { eyebrow: 'Event agency · Barranquilla, Colombia', h1: ['We create', 'experiences', 'that last.'], sub: 'Over 100 events on the Caribbean Coast. Weddings, venues, catering and corporate retreats.', cta: 'See our events', stats: ['Events', 'Years', 'Dedication'] },
    services: { label: 'Services', title: 'What we create for you', sub: 'Event agency in Barranquilla specialized in weddings, venues, catering, BBQ and group gatherings on the Caribbean Coast.', cta: 'More details →' },
    gallery: { label: 'Gallery', title: 'This is how our events look', sub: 'Moments, setups and experiences produced across the Caribbean region.' },
    reel: { label: 'Reel', title: 'See how we experience it', c1t: 'Wedding - Caribbean Venue', c1s: 'Full production from start to dawn', c2t: 'Youth Retreat', c2s: 'Logistics for youth retreats and camps on the Caribbean Coast' },
    testi: { label: 'Testimonials', title: 'What they say', sub: 'Real experiences from families, couples and businesses in Barranquilla and the Caribbean.' },
    about: { label: 'Our story', h: ['One family,', 'one passion,', 'one perfect event.'], p1: 'RED was born in Barranquilla with Robinson, his wife Elise and their son Daniel. Three people, one mission: to produce events with the warmth, precision and flavor that only a family can offer.', p2: 'We specialize in event logistics and gastronomy at venues, haciendas and open-air spaces across the Caribbean Coast. From decoration to the last dish, everything stays in the hands of the RED family.', p3: 'When you hire RED, you are not hiring a company — you are hiring a family that puts its heart into every event. You can feel it, and our clients know it.', cta: 'Schedule your event →' },
    cta: { t1: 'Ready for your', t2: 'next event?', sub: "Let's talk. We help you produce with the elegance and precision that only RED can offer.", wa: 'Write to us on WhatsApp', email: 'Schedule a call' },
    floating: 'Get a quote',
  },
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<Lang>('ES')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ParticleLayer />
      <main className="overflow-x-hidden w-full max-w-full">
        <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} lang={lang} setLang={setLang} />
        <HeroSection lang={lang} />
        <ServicesSection lang={lang} />
        <GallerySection lang={lang} />
        <ReelSection lang={lang} />
        <TestimonialsSection lang={lang} />
        <StatsSection lang={lang} />
        <AboutSection lang={lang} />
        <FooterSection lang={lang} />
      </main>
      <FloatingCTA lang={lang} />
    </>
  )
}

// ── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({
  scrolled,
  menuOpen,
  setMenuOpen,
  lang,
  setLang,
}: {
  scrolled: boolean
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  lang: Lang
  setLang: (l: Lang) => void
}) {
  const t = T[lang]
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#080c14]/96 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo — responsive size */}
        <a href="#" className="relative h-10 w-36 md:h-16 md:w-52 flex-shrink-0">
          <Image src={LOGO_URL} alt="RED Agencia" fill className="object-contain object-left-top" />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {t.nav.map((label, i) => (
            <a
              key={label}
              href={t.navHrefs[i]}
              className="text-[0.78rem] tracking-[0.14em] uppercase text-white/55 hover:text-white transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop lang switcher — glass pill, always readable */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center rounded-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
            <button
              onClick={() => setLang('ES')}
              className={`px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${lang === 'ES' ? 'bg-[#00b4d8] text-white' : 'text-white/60 hover:text-white'}`}
            >
              ES
            </button>
            <button
              onClick={() => setLang('EN')}
              className={`px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${lang === 'EN' ? 'bg-[#00b4d8] text-white' : 'text-white/60 hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile: lang switcher siempre visible + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center rounded-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
            <button
              onClick={() => setLang('ES')}
              className={`px-3 py-1.5 text-[0.68rem] font-bold tracking-wide transition-all duration-200 ${lang === 'ES' ? 'bg-[#00b4d8] text-white' : 'text-white/55 hover:text-white'}`}
            >ES</button>
            <button
              onClick={() => setLang('EN')}
              className={`px-3 py-1.5 text-[0.68rem] font-bold tracking-wide transition-all duration-200 ${lang === 'EN' ? 'bg-[#00b4d8] text-white' : 'text-white/55 hover:text-white'}`}
            >EN</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white/70 p-2">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mobile-menu bg-[#080c14]/96 backdrop-blur-xl border-t border-white/5 px-6 py-7 space-y-5">
          {t.nav.map((label, i) => (
            <a
              key={label}
              href={t.navHrefs[i]}
              className="block text-base font-medium text-white/65 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────

function HeroSection({ lang }: { lang: Lang }) {
  const card1 = useRef<HTMLDivElement>(null)
  const card2 = useRef<HTMLDivElement>(null)
  const card3 = useRef<HTMLDivElement>(null)
  const card4 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const cards = [card1.current, card2.current, card3.current, card4.current].filter(Boolean)
    const textEls = ['.hero-eyebrow', '.hero-h1', '.hero-sub', '.hero-rule', '.hero-stats-row']

    gsap.set(cards, { opacity: 0, scale: 0.88, y: 30 })
    gsap.set(textEls, { opacity: 0, y: 28 })

    // Mobile: cards stay semi-transparent so they don't cover the text/stats
    const mo = [0.28, 0.18, 0.14, 0]

    const tl = gsap.timeline({ delay: 0.25 })

    tl.to([cards[3], cards[2]], {
      opacity: isMobile ? (i: number) => (i === 0 ? mo[3] : mo[2]) : 1,
      scale: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.15,
      ease: 'power3.out',
    })
    .to([cards[0], cards[1]], {
      opacity: isMobile ? (i: number) => (i === 0 ? mo[0] : mo[1]) : 1,
      scale: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=0.7')
    .to('.hero-eyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
    }, '-=0.5')
    .to('.hero-h1', {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
    }, '-=0.55')
    .to('.hero-sub', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.55')
    .to('.hero-rule', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.5')
    .to('.hero-stats-row', {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
    }, '-=0.45')

    return () => { tl.kill() }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Mouse parallax — desktop only
    if (window.matchMedia('(max-width: 768px)').matches) return

    let rafId: number
    const mouse = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5
    }

    const tick = () => {
      cur.x += (mouse.x - cur.x) * 0.055
      cur.y += (mouse.y - cur.y) * 0.055
      if (card1.current)
        card1.current.style.transform = `rotate(2deg) translate(${cur.x * 28}px, ${cur.y * 28}px)`
      if (card2.current)
        card2.current.style.transform = `rotate(-5deg) translate(${cur.x * -45}px, ${cur.y * -45}px)`
      if (card3.current)
        card3.current.style.transform = `rotate(7deg) translate(${cur.x * 62}px, ${cur.y * 62}px)`
      if (card4.current)
        card4.current.style.transform = `rotate(-8deg) translate(${cur.x * -26}px, ${cur.y * -26}px)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="inicio" className="relative h-[100dvh] overflow-hidden bg-[#080c14]">
      {/* Fondos y orbs */}
      <div className="hero-dot-grid" />
      <div className="hero-radial" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      {/* Cards — todas absolutas, detrás del texto (z < 20) */}
      <div ref={card1} className="hero-card hero-c1">
        <Image src="/fotos/seleccion/foto-02.jpg" alt="Venue elegante" fill className="object-cover" priority sizes="(max-width: 768px) 80vw, 36vw" />
        <div className="hero-card-shine" />
      </div>
      <div ref={card2} className="hero-card hero-c2">
        <Image src="/fotos/seleccion/foto-25.jpg" alt="Boda elegante" fill className="object-cover" sizes="(max-width: 768px) 140px, 22vw" />
        <div className="hero-card-shine" />
      </div>
      <div ref={card3} className="hero-card hero-c3">
        <Image src="/fotos/seleccion/foto-52.jpg" alt="Catering premium" fill className="object-cover" sizes="(max-width: 768px) 95px, 17vw" />
        <div className="hero-card-shine" />
      </div>
      <div ref={card4} className="hero-card hero-c4">
        <Image src="/fotos/seleccion/foto54 mejorada.png" alt="Convivencia" fill className="object-cover" sizes="13vw" />
        <div className="hero-card-shine" />
      </div>

      {/* Texto — absoluto sobre toda la sección, centrado verticalmente */}
      <div className="hero-text-overlay">
        <div className="hero-text-inner-wrap">
          {(() => { const h = T[lang].hero; return (<>
            <span className="hero-eyebrow">{h.eyebrow}</span>
            <h1 className="hero-h1">
              {h.h1[0]}<br />
              {h.h1[1]}<br />
              <em>{h.h1[2]}</em>
            </h1>
            <p className="hero-sub">{h.sub}</p>
            <a
              href="#eventos"
              className="inline-block mt-6 px-7 py-3 rounded-full border border-[#00b4d8] text-[#f5f0e8] bg-transparent text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#00b4d8]/10 no-underline decoration-0"
            >
              {h.cta}
            </a>
            <div className="hero-rule hidden" />
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="hero-stat-num">100+</span>
                <span className="hero-stat-lbl">{h.stats[0]}</span>
              </div>
              <div className="hero-stat-sep" />
              <div className="hero-stat-item">
                <span className="hero-stat-num">10+</span>
                <span className="hero-stat-lbl">{h.stats[1]}</span>
              </div>
              <div className="hero-stat-sep" />
              <div className="hero-stat-item">
                <span className="hero-stat-num">100%</span>
                <span className="hero-stat-lbl">{h.stats[2]}</span>
              </div>
            </div>
          </>)})()}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="hero-scroll-bar" />
      </div>
    </section>
  )
}

// ── Services ─────────────────────────────────────────────────────────────────

const ServicesSection = forwardRef<HTMLDivElement, { lang: Lang }>(function ServicesSection({ lang }, ref) {
  const innerRef = useRef<HTMLDivElement>(null)
  const t = T[lang].services

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const ctx = gsap.context(() => {
      const pairs = [
        ['.svc-0', '.svc-1'],
        ['.svc-2', '.svc-3'],
        ['.svc-4', '.svc-5'],
      ]
      pairs.forEach((pair) => {
        gsap.fromTo(
          pair,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pair[0],
              start: isMobile ? 'top bottom' : 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, innerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="servicios" className="py-14 md:py-24 px-4 md:px-6 bg-[#f8f9fa]">
      <div ref={innerRef} className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-14">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title text-[#1a1a2e]">{t.title}</h2>
          <p className="section-sub text-[#64748b] max-w-lg mt-4">{t.sub}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 grid-flow-dense">
          {SERVICE_DATA.map((svc, i) => (
            <div
              key={svc.titleES}
              className={`svc-${i} group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-transparent hover:border-[#00b4d8]/20`}
            >
              <div className="relative h-52 md:h-56 overflow-hidden">
                <Image
                  src={svc.image}
                  alt={lang === 'ES' ? svc.titleES : svc.titleEN}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </div>
              <div className="p-5 md:p-6">
                <div className="w-0 group-hover:w-10 h-0.5 bg-[#00b4d8] mb-3 transition-all duration-500 ease-out rounded-full" />
                <h3 className="font-[var(--font-playfair)] text-xl font-bold text-[#1a1a2e] mb-2 leading-tight group-hover:text-[#00b4d8] transition-colors duration-300">
                  {lang === 'ES' ? svc.titleES : svc.titleEN}
                </h3>
                <p className="text-[#64748b] text-sm leading-relaxed mb-4">
                  {lang === 'ES' ? svc.descES : svc.descEN}
                </p>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-1.5 text-[#00b4d8] text-sm font-semibold tracking-wide hover:gap-3 transition-all duration-300"
                >
                  {t.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

// ── Gallery ───────────────────────────────────────────────────────────────────

const GallerySection = forwardRef<HTMLDivElement, { lang: Lang }>(function GallerySection({ lang }, ref) {
  const [shuffled, setShuffled] = useState(GALLERY_IMAGES.slice(0, 10))

  useEffect(() => {
    const arr = GALLERY_IMAGES.slice(0, 10).slice()
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setShuffled(arr)
  }, [])

  const row1 = shuffled
  const row2 = shuffled.slice().reverse()
  const t = T[lang].gallery

  return (
    <section ref={ref} id="eventos" className="py-14 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <p className="section-label">{t.label}</p>
        <h2 className="section-title text-[#1a1a2e]">{t.title}</h2>
        <p className="section-sub text-[#64748b] max-w-lg mt-4">{t.sub}</p>
      </div>

      {/* ── Desktop: dos filas horizontales ── */}
      <div className="hover-pause hidden md:block space-y-5">
        <div className="flex overflow-hidden">
          <div className="flex gap-5 animate-marquee-left">
            {[...row1, ...row1, ...row1, ...row1].map((src, i) => (
              <div key={`r1-${i}`} className="relative h-40 w-56 md:h-48 md:w-72 lg:h-56 lg:w-80 flex-shrink-0 rounded-2xl overflow-hidden group">
                <Image
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="384px"
                />
                <div className="absolute inset-0 bg-[#00b4d8]/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex gap-5 animate-marquee-right">
            {[...row2, ...row2, ...row2, ...row2].map((src, i) => (
              <div key={`r2-${i}`} className="relative h-40 w-56 md:h-48 md:w-72 lg:h-56 lg:w-80 flex-shrink-0 rounded-2xl overflow-hidden group">
                <Image
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="384px"
                />
                <div className="absolute inset-0 bg-[#00b4d8]/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: dos columnas verticales con scroll invertido ── */}
      <div className="gallery-mobile-wrap md:hidden">

        {/* Columna izquierda — sube */}
        <div className="gallery-mobile-col">
          <div className="gallery-mobile-track-up">
            {[...row1, ...row1, ...row1].map((src, i) => (
              <div key={`col1-${i}`} className="gallery-mobile-card">
                <Image
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="45vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha — baja */}
        <div className="gallery-mobile-col">
          <div className="gallery-mobile-track-down">
            {[...row2, ...row2, ...row2].map((src, i) => (
              <div key={`col2-${i}`} className="gallery-mobile-card">
                <Image
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="45vw"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
})

// ── Reel ──────────────────────────────────────────────────────────────────────

function ReelCard({ src, title, sub, index, isActive, onActivate, onDeactivate }: {
  src: string; title: string; sub: string; index: number
  isActive: boolean; onActivate: () => void; onDeactivate: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return }
    if (!isActive) videoRef.current?.pause()
  }, [isActive])

  function toggle() {
    const v = videoRef.current
    if (!v) return
    if (isActive) {
      v.pause()
      onDeactivate()
    } else {
      onActivate()
      v.play().catch(() => { onDeactivate() })
    }
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer reel-float-card"
      style={{ animationDelay: `${index * -3.5}s` }}
      onClick={toggle}
    >
      <div className="relative h-80 rounded-2xl overflow-hidden bg-[#0d1420]">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="metadata"
          onEnded={onDeactivate}
        />
        <div className={`absolute inset-0 bg-[#080c14]/30 transition-colors duration-500 ${isActive ? 'opacity-0 pointer-events-none' : ''}`} />
      </div>

      {/* Play / Pause button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <div className="w-20 h-20 bg-[#00b4d8]/90 hover:bg-[#00b4d8] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-[1.15] reel-play-glow">
          {isActive
            ? <span className="flex gap-1.5"><span className="w-2.5 h-7 bg-white rounded-sm"/><span className="w-2.5 h-7 bg-white rounded-sm"/></span>
            : <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          }
        </div>
      </div>

      {/* Caption */}
      <div className={`absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-[#080c14]/90 to-transparent rounded-b-2xl transition-transform duration-300 ${isActive ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
        <h3 className="font-[var(--font-playfair)] text-xl font-bold text-white">{title}</h3>
        <p className="text-white/55 text-sm mt-1">{sub}</p>
      </div>
    </div>
  )
}

function ReelSection({ lang }: { lang: Lang }) {
  const t = T[lang].reel
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const reels = [
    { src: '/videos/reel-01.mp4', title: t.c1t, sub: t.c1s },
    { src: '/videos/reel-02.mp4', title: t.c2t, sub: t.c2s },
  ]

  return (
    <section className="py-14 md:py-24 px-4 md:px-6 bg-[#080c14]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title text-[#f5f0e8]">{t.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {reels.map((reel, i) => (
            <ReelCard
              key={i}
              src={reel.src}
              title={reel.title}
              sub={reel.sub}
              index={i}
              isActive={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
              onDeactivate={() => setActiveIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function TestimonialsSection({ lang }: { lang: Lang }) {
  const t = T[lang].testi
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    const timer = setInterval(() => emblaApi.scrollNext(), 4000)
    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(timer)
    }
  }, [emblaApi])

  return (
    <section id="testimonios" className="py-14 md:py-24 px-4 md:px-6 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-12 flex-wrap gap-6">
          <div>
            <p className="section-label">{t.label}</p>
            <h2 className="section-title text-[#1a1a2e]">{t.title}</h2>
            <p className="section-sub text-[#64748b] max-w-lg mt-4">{t.sub}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-[#1a1a2e]/15 hover:border-[#00b4d8] hover:text-[#00b4d8] flex items-center justify-center transition-all duration-300 text-[#1a1a2e]/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-[#1a1a2e]/15 hover:border-[#00b4d8] hover:text-[#00b4d8] flex items-center justify-center transition-all duration-300 text-[#1a1a2e]/50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="flex-[0_0_calc(100%-1.5rem)] md:flex-[0_0_calc(50%-1.5rem)] lg:flex-[0_0_calc(33.333%-1.5rem)] min-w-0"
              >
                <div className="testimonial-card h-full p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#0077b6] flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a1a2e] text-sm">{t.name}</p>
                      <span className="text-xs bg-[#00b4d8]/12 text-[#00b4d8] px-3 py-0.5 rounded-full font-medium mt-1 inline-block">
                        {t.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#64748b] leading-relaxed text-[0.925rem]">&ldquo;{t.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'w-8 bg-[#00b4d8]' : 'w-2 bg-[#1a1a2e]/15'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Stats ──────────────────────────────────────────────────────────────────────

function StatsSection({ lang }: { lang: Lang }) {
  const [counters, setCounters] = useState(STATS.map(() => 0))
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true)
          STATS.forEach((stat, i) => {
            if (stat.isText) return
            const target = stat.value
            const steps = 60
            const inc = target / steps
            let cur = 0
            const timer = setInterval(() => {
              cur += inc
              if (cur >= target) {
                cur = target
                clearInterval(timer)
              }
              setCounters((prev) => {
                const next = [...prev]
                next[i] = Math.floor(cur)
                return next
              })
            }, 2000 / steps)
          })
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [animated])

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-[#00b4d8] via-[#0096c7] to-[#0077b6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS.map((stat, i) => (
            <div key={stat.labelES}>
              <div className="font-[var(--font-playfair)] text-5xl md:text-6xl font-bold text-white">
                {stat.isText ? stat.text : `${counters[i]}${stat.suffix}`}
              </div>
              <div className="text-white/65 mt-3 text-xs tracking-[0.16em] uppercase">
                {lang === 'ES' ? stat.labelES : stat.labelEN}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── About ──────────────────────────────────────────────────────────────────────

const AboutSection = forwardRef<HTMLDivElement, { lang: Lang }>(function AboutSection({ lang }, ref) {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.about-img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: innerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.utils.toArray<Element>('.about-fade').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, innerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-14 md:py-24 px-4 md:px-6 bg-white">
      <div ref={innerRef} className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative overflow-hidden rounded-2xl h-[280px] md:h-[520px]">
            <Image
              src="/fotos/seleccion/foto43 mejorada.jpeg"
              alt="RED Equipo"
              fill
              className="about-img object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {(() => { const t = T[lang].about; return (
          <div>
            <p className="about-fade section-label">{t.label}</p>
            <h2 className="about-fade font-[var(--font-playfair)] text-4xl md:text-6xl font-bold text-[#1a1a2e] leading-[1.06] mb-6 md:mb-8">
              {t.h[0]}<br />{t.h[1]}<br />{t.h[2]}
            </h2>
            <div className="space-y-5 text-[#64748b] leading-relaxed text-[1.02rem]">
              <p className="about-fade">{t.p1}</p>
              <p className="about-fade">{t.p2}</p>
              <p className="about-fade">{t.p3}</p>
            </div>
            <a
              href="#contacto"
              className="about-fade inline-flex items-center gap-2 mt-10 px-8 py-4 bg-[#1a1a2e] hover:bg-[#00b4d8] text-white font-semibold rounded-full transition-all duration-300 text-sm tracking-wide"
            >
              {t.cta}
            </a>
          </div>
          )})()}
        </div>
      </div>
    </section>
  )
})

// ── Footer / CTA ───────────────────────────────────────────────────────────────

function FooterSection({ lang }: { lang: Lang }) {
  const t = T[lang].cta
  return (
    <>
      <section id="contacto" className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden bg-[#080c14]">
        <div className="absolute inset-0">
          <Image
            src="/fotos/foto-02.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.13]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080c14]/70 via-transparent to-[#080c14]/80" />
        </div>
        <div className="cta-glow" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#00b4d8]/20 rounded-full animate-particle"
              style={{
                left: `${8 + i * 7.5}%`,
                animationDelay: `${i * 1.3}s`,
                animationDuration: `${14 + (i % 5) * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-[var(--font-playfair)] text-4xl md:text-7xl font-bold text-[#f5f0e8] leading-[1.08] mb-6 md:mb-8">
            {t.t1}<br />
            <em className="italic text-[#00b4d8]">{t.t2}</em>
          </h2>
          <p className="text-[#f5f0e8]/45 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            {t.sub}
          </p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/573008008156"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_32px_rgba(37,211,102,0.55)] text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {t.wa}
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 md:py-12 px-4 md:px-6 bg-[#040710] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8">
          {/* Logo centrado en mobile */}
          <div className="relative h-16 w-52 md:h-20 md:w-64 flex-shrink-0">
            <Image src={LOGO_URL} alt="RED" fill className="object-contain object-center md:object-left" />
          </div>

          {/* Links — wrappean en mobile, fila en desktop */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 md:gap-8 text-[0.72rem] tracking-[0.15em] uppercase text-white/25">
            {T[lang].nav.map((label, i) => (
              <a key={label} href={T[lang].navHrefs[i]} className="hover:text-white/60 transition-colors whitespace-nowrap">
                {label}
              </a>
            ))}
          </div>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/redagenciabq/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors text-sm"
          >
            <Instagram className="w-4 h-4" />
            @redagenciabq
          </a>
        </div>

        <div className="max-w-7xl mx-auto mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/[0.04] text-center text-white/20 text-xs tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} RED - Barranquilla, Colombia
        </div>
      </footer>
    </>
  )
}

// ── Particle Layer ─────────────────────────────────────────────────────────────

function ParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 30 : 65

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * (isMobile ? 2.5 : 3.5) + 1.2,
      speedY: -(Math.random() * 0.55 + 0.15),
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.45 + 0.18,
      type: Math.random() > 0.5 ? 0 : Math.random() > 0.5 ? 1 : 2,
    }))

    const COLORS = ['0,180,216', '0,150,200', '100,220,240']

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.y -= p.speedY * 0.8 + 0.15
        p.x += p.speedX

        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        const drawY = p.y
        const col = COLORS[p.type]

        ctx.beginPath()
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col}, ${p.opacity})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, drawY, p.size * 2.2, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(p.x, drawY, 0, p.x, drawY, p.size * 2.2)
        grad.addColorStop(0, `rgba(${col}, ${p.opacity * 0.35})`)
        grad.addColorStop(1, `rgba(${col}, 0)`)
        ctx.fillStyle = grad
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  )
}

// ── Floating CTA ───────────────────────────────────────────────────────────────

function FloatingCTA({ lang }: { lang: Lang }) {
  return (
    <a
      href="https://wa.me/573008008156"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      aria-label="Cotizar evento por WhatsApp"
    >
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span>{T[lang].floating}</span>
    </a>
  )
}
