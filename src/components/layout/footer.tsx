

import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container py-12 grid grid-cols-1 mx-auto md:grid-cols-4 gap-8">
      {/* Company Info */}
      <div>
        <h3 className="text-lg font-semibold mb-4">AutoParts</h3>
        <p className="text-sm text-muted-foreground">
          Your trusted source for high-quality auto parts and accessories.
        </p>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-md font-semibold mb-4">Contact Us</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+90 (555) 123-4567</span>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>support@autoparts.com</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Istanbul, Turkey</span>
          </li>
        </ul>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-md font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h4 className="text-md font-semibold mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="border-t py-6 text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Auto Parts. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer