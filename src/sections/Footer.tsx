import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Heart, ChevronRight } from 'lucide-react';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';
import logoColor from '../assets/logo-color.png';

  const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Ministries', href: '#ministries' },
    { name: 'Leadership', href: '#pastor' },
    { name: 'Watch Live', href: '#watch' },
    { name: 'Contact', href: '#contact' },
  ];

  const ministries = [
    { name: 'Youth Ministry', href: '#ministries' },
    { name: 'Music & Arts', href: '#ministries' },
    { name: 'Christian Education', href: '#ministries' },
    { name: 'Evangelism / Outreach', href: '#ministries' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/saintjamesmbcfs', label: 'Facebook' },
    { icon: FaXTwitter, href: 'https://twitter.com/SJMBC_FortSmith', label: 'X formorly Twitter' },
//    { icon: Instagram, href: 'https://www.instagram.com/sjmbc_fs', label: 'Instagram' },
    { icon: FaTiktok, href: 'https://www.tiktok.com/@sjmbcfs', label: 'TikTok' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UCXV4-JaH-ilFqo1zgFhl87Q', label: 'YouTube' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-navy overflow-hidden">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 33.3C672 37 768 43 864 45C960 47 1056 45 1152 41.7C1248 37 1344 30 1392 26.7L1440 23V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z" fill="white"/>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative pt-24 pb-12">
        <div className="w-full section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Church Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                {/* Circle Container */}
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
                  <img 
                    src={logoColor} 
                    alt="St. James Logo" 
                    className="w-full h-full object-contain p-1.5" 
                  />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">St. James MBC</h3>
                  <p className="font-body text-xs text-white/60">Fort Smith, AR</p>
                </div>
              </div>
              {/* ... rest of your code */}

              <p className="font-body text-white/70 text-sm mb-6">
                A Christ-centered, community-focused church dedicated to sharing the love of Jesus Christ since 1893.
              </p>

              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-primary transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ministries */}
            <div>
              <h4 className="font-display font-semibold text-white mb-6">Ministries</h4>
              <ul className="space-y-3">
                {ministries.map((ministry, index) => (
                  <li key={index}>
                    <a
                      href={ministry.href} 
                      onClick={(e) => { e.preventDefault(); scrollToSection(ministry.href); }}
                      className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-primary transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      {ministry.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Times */}
            <div>
              <h4 className="font-display font-semibold text-white mb-6">Service Times</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-white">Sunday School</p>
                    <p className="font-display font-semibold text-white/90">9:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-white">Sunday Worship</p>
                    <p className="font-display font-semibold text-white/90">10:45 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-white">Wednesday Bible Study</p>
                    <p className="font-display font-semibold text-white/90">12:00 PM & 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm text-white/70">4916 High St, Fort Smith, AR</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm text-white/70">(479) 782-5756</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm text-white/70">info@stjamesbc.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-body text-sm text-white/50 text-center md:text-left">
                © {currentYear} Saint James Missionary Baptist Church - Fort Smith, Arkansas
              </p>
              <p className="font-body text-sm text-white/50 flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for the glory of God
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
