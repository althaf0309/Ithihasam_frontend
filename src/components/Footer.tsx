import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const PHONE = "+911234567890";
const WHATSAPP = "911234567890";

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-foreground text-primary-foreground">
      <div className="container grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-xs font-bold text-primary-foreground">HS</span>
            </div>
            <span className="text-lg font-bold">HomeServ</span>
          </div>
          <p className="text-sm opacity-70">
            Professional home services at your doorstep. Trusted by thousands.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/" className="hover:opacity-100">Home</Link></li>
            <li><Link to="/#services" className="hover:opacity-100">Services</Link></li>
            <li><Link to="/#why-us" className="hover:opacity-100">About Us</Link></li>
            <li><Link to="/admin" className="hover:opacity-100">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Services</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>Electrical & Plumbing</li>
            <li>Painting Services</li>
            <li>Appliance Servicing</li>
            <li>Carpentry & Woodwork</li>
            <li>Deep Cleaning</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact Us</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li className="flex items-center gap-2">
              <Phone size={14} /> <a href={`tel:${PHONE}`}>+91 12345 67890</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={14} />
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} /> info@homeserv.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} /> Mumbai, India
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4 text-center text-xs opacity-50">
        © 2026 HomeServ. All rights reserved.
      </div>
    </footer>
  );
}
