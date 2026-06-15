import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logoWhite from '../assets/logo-white.png';
import logoColor from '../assets/logo-color.png';

  const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
    const threshold = window.innerHeight * 0.5; 
    setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { 
      name: 'About', 
      href: '#about',
      dropdown: [
        { name: 'Our Story', href: '#about' },
        { name: 'Service Times', href: '#service-times' },
      ]
    },
    { 
      name: 'Ministries', 
      href: '#ministries',
      dropdown: [
        { name: 'Youth Ministry', href: '#ministries' },
        { name: 'Music & Arts', href: '#ministries' },
        { name: 'Spiritual Formation', href: '#ministries' },
        { name: 'Community Care', href: '#ministries' },
      ]
    },
    {name: 'Leadership', href: '#pastor'},
    { name: 'Watch', href: '#watch' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full section-padding">
          <div className="flex items-center justify-between">


{/* Logo Anchor */}
<a 
  href="#home" 
  onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
  className="flex items-center gap-3 group"
>
  {/* logo container */}
<div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 relative ${
  isScrolled ? 'bg-white shadow-sm' : 'bg-white/10 backdrop-blur-sm'
}`}>
  {/* Color Logo (Visible when scrolled) */}
  <img 
    src={logoColor} 
    alt="St. James Logo" 
    className={`absolute inset-0 w-full h-full object-contain p-1.5 transition-opacity duration-500 ${
      isScrolled ? 'opacity-100' : 'opacity-0'
    }`}
  />
  
  {/* White Logo (Visible at top) */}
  <img 
    src={logoWhite} 
    alt="St. James Logo" 
    className={`absolute inset-0 w-full h-full object-contain p-1.5 transition-opacity duration-500 ${
      isScrolled ? 'opacity-0' : 'opacity-100'
    }`}
  />
</div>

  {/* This text part also remains part of the Home link */}
  <div className={`hidden sm:block transition-all duration-300 ${
    isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
  }`}>
    <span className="font-display font-semibold text-navy text-sm">St. James MBC</span>
  </div>
</a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-body font-medium text-sm transition-all duration-300 ${
                      isScrolled 
                        ? 'text-navy hover:text-primary hover:bg-primary/5' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </a>
                  
                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                          className="block px-4 py-3 text-sm font-body text-navy hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#service-times"
                onClick={(e) => { e.preventDefault(); scrollToSection('#service-times'); }}
                className={`px-6 py-2.5 rounded-lg font-body font-semibold text-sm transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-primary text-white hover:bg-primary-dark' 
                    : 'bg-white text-primary hover:bg-white/90'
                }`}
              >
                Join Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-navy hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-navy/95 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}>
          <div className="p-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="block px-4 py-3 text-navy font-body font-medium hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a
                href="#service-times"
                onClick={(e) => { e.preventDefault(); scrollToSection('#service-times'); }}
                className="block w-full px-4 py-3 bg-primary text-white text-center font-body font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Join Us This Sunday
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
