import { useEffect, useRef, useState } from 'react';
import { Play, Clock, MapPin, ChevronRight } from 'lucide-react';
import { FaPrayingHands } from 'react-icons/fa';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        const parallaxElements = heroRef.current.querySelectorAll('.parallax');
        
        parallaxElements.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-speed') || '0.3');
          (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
        });

        // Fade out content on scroll
        const content = heroRef.current.querySelector('.hero-content');
        const scrollOffset = 200;
        if (content) {
          const opacity = Math.max(0, 1 - ((scrollY - scrollOffset) / (heroHeight * 0.2)));
          (content as HTMLElement).style.opacity = String(opacity);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 parallax" data-speed="0.3">
        <img 
          src="./hero-bg-sjmbc.jpg" 
          alt="Church facility" 
          className="w-full h-full object-cover scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-transparent to-transparent" />

      {/* Animated Light Rays Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[100%] bg-gradient-radial from-primary/10 via-transparent to-transparent animate-pulse" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 w-full section-padding pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 font-body text-sm">Join us every Sunday</span>
          </div>

          {/* Main Headline */}
          <h1 
            className={`heading-xl text-white mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <span className="block">Christ Centered,</span>
            {/* <span className="block text-primary-light">|</span> */}
            <span className="block">Community Focused</span>
          </h1>

          {/* Subheadline */}
          <p 
            className={`body-lg text-white/80 max-w-2xl mb-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            For over 130 years, St. James has been a beacon of faith in Fort Smith. 
            Join our family for powerful worship, uplifting gospel music, and the unchanging Word of God.
          </p>

          {/* CTAs */}
<div 
            className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
{/* Join Us Button - Line 98 */}
            <button 
              onClick={() => scrollToSection('#service-times')}
              className="btn-primary group w-full sm:w-auto justify-center"
            >
              Join Us This Sunday
              <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Watch Live Button - Line 105 */}
            <button 
              onClick={() => scrollToSection('#watch')}
              className="btn-outline group w-full sm:w-auto justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Live
            </button>

            {/* Request Prayer Button - Line 111 */}
            <button 
              onClick={() => scrollToSection('#contact')}
              className="btn-outline group w-full sm:w-auto justify-center"
            >
              <FaPrayingHands className="w-5 h-5 mr-2" />
              Request Prayer
            </button>
          </div>

          {/* Service Times Bar */}
          <div 
            className={`flex flex-wrap gap-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-body text-xs text-white/60">Sunday Worship</p>
                <p className="font-display font-semibold">10:45 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-body text-xs text-white/60">Location</p>
                <p className="font-display font-semibold">Fort Smith, AR</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
