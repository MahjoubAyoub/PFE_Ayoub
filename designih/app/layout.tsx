import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Designih",
  description: "A web application for creating and editing visual templates",
  generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&family=Open+Sans&family=Poppins&family=Montserrat&family=Playfair+Display&family=Oswald&family=Raleway&family=Merriweather&family=Nunito&family=Quicksand&family=Ubuntu&family=PT+Sans&family=Source+Sans+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
