import { useEffect, useRef, useState } from 'react';
import { ArrowRight, GraduationCap, Music, BookOpen, Heart, /*Globe*/ } from 'lucide-react';
{/* import { MapPin, Phone, Mail, Clock, Send, Facebook, Youtube } from 'lucide-react'; */}

const Ministries = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const ministries = [
    {
      title: 'Youth Ministry',
      description: 'Empowering youth to discover their purpose and grow in faith through dynamic programs and mentorship.',
      image: '/ministry-1-sj.jpg',
      icon:  GraduationCap,
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Music & Arts',
      description: 'Praising God through worship, choir, and creative expressions that inspire and uplift our congregation.',
      image: '/ministry-2-sj.jpg',
      icon: Music,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Christian Education',
      description: 'Deepening our relationship with Christ through Bible study, prayer, and discipleship programs.',
      image: '/ministry-3-sj.jpg',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Evangelism / Outreach',
      description: 'Serving our local community through outreach and support.',
      image: '/ministry-4-sj.jpg',
      icon: Heart,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section 
      id="ministries" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-primary-light overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 87, 184, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(0, 87, 184, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-12 h-[2px] bg-primary" />
            <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">Get Involved</span>
            <div className="w-12 h-[2px] bg-primary" />
          </div>

          <h2 
            className={`heading-lg text-navy mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Our Ministries
          </h2>

          <p 
            className={`font-script text-3xl text-gold mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Grow with us in faith
          </p>

          <p 
            className={`body-md text-text-gray max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Discover your place in our church family. We have ministries for every age and stage of life.
          </p>
        </div>

        {/* Ministries Grid - Masonry Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${index === 1 ? 'lg:mt-12' : ''} ${index === 3 ? 'lg:mt-[-48px]' : ''}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                {/* Image */}
                <img 
                  src={ministry.image} 
                  alt={ministry.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ministry.color} flex items-center justify-center mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500`}>
                  <ministry.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-display font-semibold text-white text-xl mb-2">
                    {ministry.title}
                  </h3>

                  <p className="font-body text-white/70 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {ministry.description}
                  </p>

                  <a 
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Border Glow on Hover */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="font-body text-text-gray mb-4">
            Want to get involved or learn more about a ministry?
          </p>
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 btn-primary"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Ministries;
