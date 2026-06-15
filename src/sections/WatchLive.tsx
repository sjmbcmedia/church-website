import { useEffect, useRef, useState } from 'react';
import {Loader2, Play, Youtube, ExternalLink, Radio } from 'lucide-react';

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

  const WatchLive = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  {/* LIVE YT CODE */}
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);  const [liveVideoId, setLiveVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const CHANNEL_ID = 'UCXV4-JaH-ilFqo1zgFhl87Q';
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;  

  {/* END LIVE YT CODE */}
  useEffect(() => {
  {/* LIVE YT CODE */}
  const fetchYouTubeData = async () => {
    try {
        // Search for a live stream
        const liveRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`
        );
        const liveData = await liveRes.json();
        if (liveData.items?.length > 0) {
          setLiveVideoId(liveData.items[0].id.videoId);
        }

        // Fetch the 3 most recent videos
        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=3&order=date&type=video&key=${API_KEY}`
        );
        const videosData = await videosRes.json();
        setVideos(videosData.items || []);
      } catch (error) {
        console.error("YouTube fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchYouTubeData();
  {/* END LIVE YT CODE */}
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

   return (
    <section 
      id="watch" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-navy overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div 
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-12 h-[2px] bg-primary" />
            <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">Online Worship</span>
            <div className="w-12 h-[2px] bg-primary" />
          </div>

          <h2 
            className={`heading-lg text-white mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Watch Live
          </h2>

          <p 
            className={`body-md text-white/70 max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Join us every Sunday at 10:45 AM CST for our live worship service. 
            Can't make it? Watch our archived sermons anytime.
          </p>
        </div>

        {/* Main Video Player */}
        <div 
          className={`max-w-5xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div 
            className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video">
              <img 
                src={videos.length > 0 ? videos[0].snippet?.thumbnails?.high?.url : "/video-thumbnail.jpg"} 
                alt="Live worship service" 
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovering ? 'scale-105' : 'scale-100'
                }`}
              />              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-navy/40 transition-opacity duration-500 ${
                isHovering ? 'opacity-60' : 'opacity-40'
              }`} />

              {/* Live Badge */}
              {liveVideoId && (
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full shadow-lg">
                  <Radio className="w-4 h-4 text-white animate-pulse" />
                  <span className="font-body text-sm font-semibold text-white uppercase tracking-wider">LIVE NOW</span>
                </div>
              )}

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* LIVE YT CODE */}
                {liveVideoId ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=0&rel=0`}
                      title="YouTube live stream"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <a 
                    href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative w-24 h-24 rounded-full bg-white flex items-center justify-center transition-all duration-500 ${
                      isHovering ? 'scale-110 shadow-2xl' : 'scale-100'
                    }`}
                  >
                    <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
                    <div className={`absolute inset-0 rounded-full border-2 border-white/50 animate-ping ${
                      isHovering ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </a>
                )}
                {/* END LIVE YT CODE */}
              </div>

              {/* Service Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy to-transparent">
                <p className="font-body text-white/70 text-sm mb-1">
                  {liveVideoId ? "Currently Broadcasting Live" : "Sundays at 10:45 AM CST"}
                </p>
                <h3 className="font-display font-semibold text-white text-xl">
                  {liveVideoId 
                    ? "Join us for our Live Service" 
                    : (videos.length > 0 ? videos[0].snippet?.title : "Sunday Morning Worship Experience")
                  }
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Services */}
        <div 
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold text-white text-xl">Recent Services</h3>
            <a 
              href="https://www.youtube.com/channel/UCXV4-JaH-ilFqo1zgFhl87Q"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-body font-medium hover:underline"
            >
              View All
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-4 min-h-[100px] items-center">
            {isLoading ? (
              <div className="col-span-3 flex justify-center py-8">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              videos.map((video, index) => (
                <a
                  key={video.id?.videoId || index}
                  href={`https://www.youtube.com/watch?v=${video.id?.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  {/* ... the rest of the link content we added in Step 11 ... */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                      <Youtube className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-body font-medium text-white text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {video.snippet?.title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'")}
                      </h4>
                      <p className="font-body text-white/60 text-xs mb-1">
                        {video.snippet?.channelTitle}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-body text-white/40 text-xs">
                          {new Date(video.snippet?.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>

        {/* Subscribe CTA */}
        <div 
          className={`text-center mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <a 
            href="https://www.youtube.com/channel/UCXV4-JaH-ilFqo1zgFhl87Q?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-body font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Youtube className="w-6 h-6" />
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default WatchLive;
