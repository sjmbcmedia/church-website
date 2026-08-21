import { useEffect, useState } from 'react';
import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Welcome from './sections/Welcome';
import ServiceTimes from './sections/ServiceTimes';
import Ministries from './sections/Ministries';
import Pastor from './sections/Pastor';
import WatchLive from './sections/WatchLive';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export interface YouTubeVideo {
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

const CHANNEL_ID = 'UCXV4-JaH-ilFqo1zgFhl87Q';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRecentVideo, setHasRecentVideo] = useState(false);

  useEffect(() => {
    // Trigger animations after page load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        // 1. Search for an active live stream
        const liveRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`
        );
        const liveData = await liveRes.json();
        let isLiveActive = false;

        if (liveData.items?.length > 0) {
          setLiveVideoId(liveData.items[0].id.videoId);
          isLiveActive = true;
        }

        // 2. Fetch the 3 most recent videos
        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=3&order=date&type=video&key=${API_KEY}`
        );
        const videosData = await videosRes.json();
        const fetchedVideos: YouTubeVideo[] = videosData.items || [];
        setVideos(fetchedVideos);

        // 3. Check 24-hour threshold
        if (isLiveActive) {
          setHasRecentVideo(true);
        } else if (fetchedVideos.length > 0) {
          const latestPublishDate = new Date(fetchedVideos[0].snippet.publishedAt).getTime();
          const now = Date.now();

          // Adjust this time window as needed:
          // 24 hours = 1 * 24 * 60 * 60 * 1000
          // 7 days   = 7 * 24 * 60 * 60 * 1000
          const twentyFourHoursMs = 7 *24 * 60 * 60 * 1000;

          if (now - latestPublishDate <= twentyFourHoursMs) {
            setHasRecentVideo(true);
          }
        }
      } catch (error) {
        console.error('YouTube fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchYouTubeData();
  }, []);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />
      <main>
        <Hero hasRecentVideo={hasRecentVideo} />
        <Welcome />
        <ServiceTimes />
        <Ministries />
        <Pastor />
        <WatchLive videos={videos} liveVideoId={liveVideoId} isLoading={isLoading} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;