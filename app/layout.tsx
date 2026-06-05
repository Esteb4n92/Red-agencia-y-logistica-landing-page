import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Red Agencia y Logística | Eventos Premium en Barranquilla',
  description: 'Red es tu agencia de eventos premium en Barranquilla y el Caribe. Bodas, fincas, catering, asados y convivencias con logística integral. Más de 10 años y 200+ eventos producidos. ¡Cotiza hoy!',
  keywords: [
    'agencia de eventos barranquilla',
    'bodas barranquilla',
    'catering barranquilla colombia',
    'fincas para eventos barranquilla',
    'logística de eventos caribe',
    'convivencias empresariales barranquilla',
    'asados barranquilla',
    'producción de eventos colombia',
    'RED agencia barranquilla',
  ],
  robots: { index: true, follow: true },
  authors: [{ name: 'RED Agencia y Logística' }],
  alternates: {
    canonical: 'https://redagencia.com.co',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://redagencia.com.co',
    siteName: 'RED Agencia y Logística',
    title: 'RED Agencia y Logística | Eventos Premium en Barranquilla',
    description: 'Agencia de eventos premium en Barranquilla. Bodas, fincas, catering y logística integral en el Caribe colombiano. +200 eventos. Cotiza gratis.',
    images: [
      {
        url: 'https://redagencia.com.co/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RED Agencia y Logística - Eventos Premium Barranquilla',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RED Agencia y Logística | Barranquilla',
    description: 'Bodas, fincas, catering y logística integral en el Caribe colombiano.',
    images: ['https://redagencia.com.co/og-image.jpg'],
  },
  icons: {
    icon: '/icono red.jpg',
    apple: '/icono red.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EventPlanner",
              "name": "RED Agencia y Logística",
              "description": "Agencia de eventos premium en Barranquilla con logística integral para bodas, fincas, catering y convivencias en el Caribe colombiano.",
              "url": "https://redagencia.com.co",
              "telephone": "+573008008156",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Barranquilla",
                "addressRegion": "Atlántico",
                "addressCountry": "CO"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "10.9639",
                "longitude": "-74.7964"
              },
              "areaServed": "Región Caribe, Colombia",
              "priceRange": "$$-$$$",
              "sameAs": [
                "https://www.instagram.com/redagenciabq/"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
