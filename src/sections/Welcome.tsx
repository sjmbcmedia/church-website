import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Heart, Users, BookOpen } from 'lucide-react';

  const Welcome = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Heart,
      title: 'Christ Centered',
      description: 'Everything we do is rooted in our faith in Jesus Christ.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We believe in building strong relationships and supporting one another.',
    },
    {
      icon: BookOpen,
      title: 'Bible Based',
      description: 'Our teachings are grounded in the Holy Scriptures.',
    },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary" />
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-primary" />
      </div>

      <div className="w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/welcome-image-sj.jpg" 
                  alt="Church community" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>

              {/* Floating Card */}
              {/* <a href="https://www.stjamesbc.org/church-history" target = '_blank' className="block hover:opacity-80 transition-opacity"> */}
              <div 
                className={`absolute -bottom-8 -right-8 bg-white rounded-xl shadow-xl p-6 max-w-[200px] transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl text-navy">130+</p>
                    <p className="font-body text-sm text-text-gray">Years of Faith</p>
                  </div>
                </div>
              </div>
              {/* </a> */}

              {/* Decorative Element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-xl -z-10" />
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            {/* Section Label */}
            <div 
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-12 h-[2px] bg-primary" />
              <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">About Us</span>
            </div>

            {/* Headline */}
<h2
  className={`heading-lg text-navy mb-4 transition-all duration-700 leading-[0.9] ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
  style={{ transitionDelay: '300ms' }}
>
  Welcome to
  <span className="block text-primary mt-1.5">Saint James</span>
  <span className="block text-[0.5em] tracking-widest text-primary mt-1.5">
    <span className="text-[1.12em]">M</span>issionary{" "}
    <span className="text-[1.12em]">B</span>aptist{" "}
    <span className="text-[1.12em]">C</span>hurch
  </span>
</h2>

            {/* Script Accent */}
            <p 
              className={`font-script text-3xl text-gold mt-6 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              A place to belong, a people who care
            </p>

{/* Description */}
            <div 
              className={`space-y-6 mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <p className="body-md text-text-gray">
                We are a Christ-centered, community-focused church dedicated to sharing the love of Jesus Christ. 
                Our mission is to edify and sanctify believers through the preaching of the Gospel and the power of worship.
              </p>

              {/* Floating Vision Statement Card */}
              <div className="bg-purple-50 rounded-2xl p-6 shadow-xl text-center border border-purple-100 max-w-xl mx-auto transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-display font-bold text-3xl text-purple-950 mb-3 underline underline-offset -5">
                  Vision Statement
                </h3>
                <p className="body-md text-text-black">
                  Saint James Missionary Baptist Church is a church that is committed to empowering, equipping, energizing and enlightening God's believer through the teaching and preaching of the infallible word of God.
                </p>
              </div>
            </div>

            {/* Features */}
            <div 
              className={`grid sm:grid-cols-3 gap-6 mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {features.map((feature, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto sm:mx-0 mb-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-navy text-sm mb-1">{feature.title}</h3>
                  <p className="font-body text-xs text-text-gray">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a 
              href="https://www.stjamesbc.org/church-history" target='_blank'
              className={`inline-flex items-center gap-2 text-primary font-body font-semibold hover:gap-4 transition-all duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '700ms' }}
             >
              Learn Our Story
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
