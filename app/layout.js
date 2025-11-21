import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Event Registration - NTCOG Kenya",
  description: "Register for New Testament Church of God Kenya events, conferences, and programs. Secure online registration with M-PESA and Stripe payment options.",
  keywords: "NTCOG Kenya, event registration, church events, conferences, M-PESA payment, online registration",
  authors: [{ name: "NTCOG Kenya" }],
  openGraph: {
    title: "Event Registration - NTCOG Kenya",
    description: "Register for NTCOG Kenya events and conferences",
    url: "https://events.ntcogk.org",
    siteName: "NTCOG Kenya Events",
    images: [
      {
        url: "/mainLogo.png",
        width: 1200,
        height: 630,
        alt: "NTCOG Kenya Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Registration - NTCOG Kenya",
    description: "Register for NTCOG Kenya events and conferences",
    images: ["/mainLogo.png"],
  },
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/favicon.ico",
  },
  manifest: "/manifest.json",
  themeColor: "#1E4E9A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1E4E9A" />
      </head>
      <body className="antialiased min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="min-h-[calc(100vh-64px-200px)]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
