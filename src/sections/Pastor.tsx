import { useEffect, useRef, useState } from 'react';
import { Quote, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

const leadershipData = [
  {
    id: 1,
    headline: "Our Pastor",
    name: "Pastor Judge Green, IV",
    image: "/pastor-image-IV-Final.png",
    experience: "20+",
    experienceLabel: "Years of Pastoral Service",
    bio: [
      "Born in Little Rock, Arkansas, Pastor Green has dedicated over 20 years of his life to serving the Lord. He is a graduate of Little Rock Central High School and attended University of Arkansas at Pine Bluff & Arkansas Baptist College.",
      "Pastor Green was born and raised in a Christian-filled home, which has profoundly inspired his mission to preach the message of salvation and deliverance. He is the husband of Teunna Green and exemplifies the principles of accountability, responsibility, and integrity both in his personal life and pastoral duties.",
      "Known for his faith-driven approach, skill in preaching, and his ability to build strong relationships through the power of the Holy Spirit, Pastor Green believes in the Word of God, Genesis to Revelation."
    ]
  },
  {
    id: 2,
    headline: "Our First Lady",
    name: "Lady Teunna Green",
    image: "/lady-teunna-90.png", // Stand-in image for development
    experience: "15+",
    experienceLabel: "Years of Ministry",
    bio: [
      "Born in Little Rock, Arkansas, Pastor Green has dedicated over 20 years of his life to serving the Lord. He is a graduate of Little Rock Central High School and attended University of Arkansas at Pine Bluff & Arkansas Baptist College.",
      "Pastor Green was born and raised in a Christian-filled home, which has profoundly inspired his mission to preach the message of salvation and deliverance. He is the husband of Teunna Green and exemplifies the principles of accountability, responsibility, and integrity both in his personal life and pastoral duties.",
      "Known for his faith-driven approach, skill in preaching, and his ability to build strong relationships through the power of the Holy Spirit, Pastor Green believes in the Word of God, Genesis to Revelation."
    ]
  }
];

const Pastor = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Intersection Observer for Section Animation
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

  // Automatic Rotation Effect (Switches every 6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // 6000ms = 6 seconds

    return () => clearInterval(interval);
  }, [currentIndex]); // Reset interval whenever slide changes manually to prevent clipping

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? leadershipData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === leadershipData.length - 1 ? 0 : prev + 1));
  };

  const currentLeader = leadershipData[currentIndex];

  return (
    <section 
      id="pastor" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-light/50" />
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5" />
      </div>

      <div className="relative z-10 w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1 flex flex-col justify-between h-full">
            <div>
              {/* Static Section Label */}
              <div 
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-12 h-[2px] bg-primary" />
                <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">Our Leadership</span>
              </div>

              {/* Carousel Content Container */}
              <div key={currentIndex} className="transition-all duration-500 ease-in-out animate-fadeIn">
                {/* Dynamic Headline */}
                <h2 
                  className={`heading-lg text-navy mb-4 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                >
                  {currentLeader.headline}
                </h2>

                {/* Dynamic Leader Name */}
                <h3 
                  className={`font-display font-bold text-3xl text-primary mb-6 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  {currentLeader.name}
                </h3>

                {/* Dynamic Bio */}
                <div 
                  className={`space-y-4 mb-6 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  {currentLeader.bio.map((paragraph, index) => (
                    <p key={index} className="body-md text-text-gray">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                  aria-label="Previous leader"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {/* Dots Indicators */}
                <div className="flex gap-2">
                  {leadershipData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-primary/20'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={handleNext}
                  className="p-2 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                  aria-label="Next leader"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Static Elements Block (Persistent at the bottom) */}
            <div>
              {/* Quote */}
              <div 
                className={`relative bg-primary-light rounded-2xl p-6 mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                <p className="font-script text-2xl text-gold pl-8">
                  "To Love the Lord is to Serve His People"
                </p>
              </div>

              {/* Contact Info */}
              <div 
                className={`flex flex-wrap gap-4 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <a 
                  href="mailto:sjmbc@stjamesbc.org"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-body text-sm font-medium">Email Pastor</span>
                </a>
                <a 
                  href="tel:4797825756"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-body text-sm font-medium">(479) 782-5756</span>
                </a>
              </div>
            </div>
          </div>

          {/* Image Side (Rotates along with Carousel Content) */}
          <div 
            className={`order-1 lg:order-2 relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div key={currentIndex} className="relative transition-all duration-500 ease-in-out animate-fadeIn">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={currentLeader.image} 
                  alt={currentLeader.name} 
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-primary/20 rounded-xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-xl -z-10" />

              {/* Experience Badge */}
              <div 
                className={`absolute bottom-8 left-8 bg-white rounded-xl shadow-xl p-4 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <span className="font-display font-bold text-white text-xl">{currentLeader.experience}</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-navy">Years of</p>
                    <p className="font-body text-sm text-text-gray">{currentLeader.experienceLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pastor;