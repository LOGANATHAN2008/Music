import React, { useState, useEffect } from 'react';
import { Play, Pause, Music, Radio, Zap, LayoutTemplate, MessageSquare, Activity, Globe, Download } from 'lucide-react';
import { gplLicense } from './licenseText';
import './index.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Hide preloader after 2.5 seconds
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (t) => Math.floor(t).toString().padStart(2, '0');

  // Conventional Logic
  let convWidth = time;
  let isRebuffering = false;
  if (time > 50 && time < 65) {
    convWidth = 50;
    isRebuffering = true;
  } else if (time >= 65) {
    convWidth = time - 15; // catches up
  }

  // BitChord Logic
  let opusWidth = Math.min(time, 40);
  let flacWidth = Math.max(0, time - 40);
  let isFlac = time > 40;

  const features = [
    {
      icon: <Activity className="feature-icon-svg" />,
      tag: "Automix Engine",
      title: 'Automix [Beta]',
      desc: 'DJ-style transitions with true beat-matching and tempo-stretching. It analyzes the BPM of upcoming tracks and crossfades seamlessly for an uninterrupted listening experience.'
    },
    {
      icon: <Zap className="feature-icon-svg" />,
      tag: "Playback",
      title: 'True Gapless Playback',
      desc: 'No artificial silence between tracks. True crossfade adjustable from 0 to 12s for uninterrupted listening, just like professional DJ software.'
    },
    {
      icon: <LayoutTemplate className="feature-icon-svg" />,
      tag: "Design System",
      title: 'Frosted-glass UI',
      desc: 'Telegram-style translucent bars with dynamic Material 3 theming extracted from the current playing album art. A truly immersive visual experience.'
    },
    {
      icon: <MessageSquare className="feature-icon-svg" />,
      tag: "Lyrics Integration",
      title: 'Apple-like Lyrics',
      desc: 'Word-synced animated lyrics sourced from top providers. Follow along perfectly as the song progresses with buttery smooth scrolling and animations.'
    },
    {
      icon: <Globe className="feature-icon-svg" />,
      tag: "Connectivity",
      title: 'Discord Rich Presence',
      desc: 'Show off what you\'re listening to directly on your Discord profile in real-time, including album art, artist, and current playback progress.'
    }
  ];

  return (
    <>
      <div className={`preloader ${!isLoading ? 'slide-out' : ''}`}>
        <div className="preloader-background"></div>
        <div className="preloader-content">
          <div className="logo-pulse-wrapper">
            <div className="pulse-ring"></div>
          </div>
          <div className="preloader-bar modern-bar">
            <div className="preloader-progress modern-progress"></div>
          </div>
        </div>
        <img 
          src="/developer-logo.png" 
          alt="Loading Logo" 
          className="preloader-logo modern" 
          onClick={() => !isLoading && setIsMenuOpen(!isMenuOpen)}
        />
        {!isLoading && (
          <div className={`dev-menu ${isMenuOpen ? 'open' : ''}`}>
            <a href="https://loganathanm.in" target="_blank" rel="noreferrer">Portfolio</a>
            <a href="https://contact.loganathanm.in" target="_blank" rel="noreferrer">Contact</a>
          </div>
        )}
      </div>
      
      <div className="app">
        <section className="hero-section">
          <div className="hero-content">
          <img src="/Logo.png" alt="BitChord Logo" className="logo" />
          <h1 className="title">BitChord</h1>
          <p className="subtitle">The Aesthetic YouTube Music Client for True Audiophiles</p>
          
          <div className="download-grid">
            <a href="/BitChord-v1.8.apk" download="BitChord-v1.8.apk" className="download-card">
              <svg viewBox="0 0 24 24" fill="currentColor" className="download-icon">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592c.1158-.2018.046-.4593-.1558-.5751-.2018-.1158-.4593-.046-.5751.1558l-2.0161 3.4914c-1.4274-.649-3.0452-1.0094-4.7578-1.0094-1.7126 0-3.3304.3604-4.7578 1.0094L5.6001 5.4418c-.1158-.2018-.3733-.2716-.5751-.1558-.2018.1158-.2716.3733-.1558.5751l1.9973 3.4592C2.6889 11.626 0 15.6144 0 20.317h24c0-4.7026-2.6889-8.691-6.866-11.0044"/>
              </svg>
              <div className="download-info">
                <span className="download-title">Android</span>
                <span className="download-subtitle">AVAILABLE NOW</span>
              </div>
            </a>
            <div className="download-card disabled">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="download-icon">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
              <div className="download-info">
                <span className="download-title">Android TV</span>
                <span className="download-subtitle">COMING SOON</span>
              </div>
            </div>
            <a href="/BitChord-1.8-beta1-windows-x64-portable.zip" download="BitChord-1.8-beta1-windows-x64-portable.zip" className="download-card">
              <svg viewBox="0 0 24 24" fill="currentColor" className="download-icon">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
              </svg>
              <div className="download-info">
                <span className="download-title">Windows</span>
                <span className="download-subtitle">AVAILABLE NOW</span>
              </div>
            </a>
            <div className="download-card disabled">
              <svg viewBox="0 0 24 24" fill="currentColor" className="download-icon">
                <path d="M12 0C7.26 0 5.4 3 5.4 3s-.6.9-1.2 2.7c-.9 3-.9 5.4 0 6.6.6.9 1.5.9 1.8 1.5.3.6.9 3.3.9 3.6 0 .3-1.2.6-1.5 1.2s-.3 1.5 0 2.1c.3.6 1.8.6 3.6 1.2 1.8.6 1.5 2.1 3 2.1s1.2-1.5 3-2.1c1.8-.6 3.3-.6 3.6-1.2.3-.6.3-1.5 0-2.1-.3-.6-1.5-.9-1.5-1.2 0-.3.6-3 .9-3.6.3-.6 1.2-.6 1.8-1.5.9-1.2.9-3.6 0-6.6-.6-1.8-1.2-2.7-1.2-2.7S16.74 0 12 0z"/>
              </svg>
              <div className="download-info">
                <span className="download-title">Linux</span>
                <span className="download-subtitle">COMING SOON</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-media">
          <video 
            src="/bitchord-demo.mp4" 
            className="banner" 
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </div>
      </section>

      <div className="features-header">
        <span className="features-badge">THE ENGINE ROOM</span>
        <h2 className="features-main-title">Built for people who can <span className="text-gradient">hear the difference</span></h2>
        <p className="features-sub">Every feature below ships in the current build — not a roadmap. Poke at the cards; they're all live.</p>
      </div>

      <section className="features-grid">
        <div className="feature-card engine-card">
          <div className="engine-layout">
            <div className="engine-text-side">
              <div className="feature-card-header">
                <div className="feature-icon-wrapper">
                  <Radio className="feature-icon-svg" />
                </div>
                <span className="feature-tag">AUTO-UPGRADE PIPELINE</span>
              </div>
              <h3 className="feature-title">Start instantly. Land on lossless.</h3>
              <p className="feature-desc">Playback opens on whichever stream resolves fastest, then a background fetch promotes the track to FLAC/ALAC from your configured source and swaps it in-place. Separate quality ceilings for Wi-Fi and mobile data mean it never fights your data plan.</p>
            </div>
            
            <div className="engine-visual-side">
              <div className="engine-visual-header">
                <div className="engine-controls">
                  <button className="engine-pause-btn" onClick={togglePlay}>
                    {isPlaying ? <Pause size={12} /> : <Play size={12} />} 
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>
                  <span className="engine-time">t = {formatTime(time)}%</span>
                </div>
                <div className="engine-status">
                  <span className="status-dot"></span>
                  <span className="status-kbps">{isFlac ? 'LOSSLESS' : '128 kbps'}</span>
                  <span className="status-codec">{isFlac ? 'FLAC' : 'OPUS'}</span>
                </div>
              </div>

              <div className="engine-player-box conventional">
                <div className="player-box-header">
                  <div>
                    <h4>Conventional player</h4>
                    <p>One stream, one quality. Re-buffers when the pipe narrows.</p>
                  </div>
                  <span className="player-badge">128 KBPS · LOCKED</span>
                </div>
                <div className="player-track">
                  <div className="track-progress conventional-progress" style={{ width: `${convWidth}%` }}></div>
                  {isRebuffering && <div className="track-rebuffer" style={{ left: '50%' }}><span>RE-BUFFER</span></div>}
                </div>
              </div>

              <div className="engine-player-box bitchord">
                <div className="player-box-header">
                  <div>
                    <h4>BitChord</h4>
                    <p>Opens on fast Opus, seamlessly promotes to FLAC in background.</p>
                  </div>
                  <span className={`player-badge ${isFlac ? 'active' : ''}`}>
                    {isFlac ? 'UPGRADED TO FLAC' : 'FETCHING FLAC...'}
                  </span>
                </div>
                <div className="player-track bitchord-track">
                  <div className="track-progress bitchord-opus" style={{ width: `${opusWidth}%` }}></div>
                  <div className="track-progress bitchord-flac" style={{ left: `${opusWidth}%`, width: `${flacWidth}%` }}></div>
                  {isFlac && time < 45 && <div className="track-transition" style={{ left: '40%' }}><span>SEAMLESS SWAP</span></div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-card-header">
              <div className="feature-icon-wrapper">
                {f.icon}
              </div>
              <span className="feature-tag">{f.tag}</span>
            </div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>BitChord is not affiliated with Google or YouTube.</p>
          <div className="footer-actions">
            <details className="license-details">
              <summary>View License (GNU GPLv3)</summary>
              <div className="license-box">
                <pre>{gplLicense}</pre>
              </div>
            </details>
            <button className="album-btn" onClick={() => setIsAlbumOpen(true)}>
              Album
            </button>
          </div>
          <p>Designed and Developed by</p>
          <img src="/developer-logo.png" alt="Loganathanm.in Web Developer" className="developer-logo" />
        </div>
      </footer>
    </div>

    {/* Album Modal */}
    {isAlbumOpen && (
      <div className="album-modal-overlay" onClick={() => setIsAlbumOpen(false)}>
        <div className="album-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-album-btn" onClick={() => setIsAlbumOpen(false)}>✕</button>
          <h2>BitChord Album</h2>
          <div className="album-grid">
            {[
              "WhatsApp Image 2026-10-07 at 6.03.49 PM (1).jpeg",
              "WhatsApp Image 2026-10-07 at 6.03.49 PM.jpeg",
              "WhatsApp Image 2026-10-07 at 6.03.50 PM (1).jpeg",
              "WhatsApp Image 2026-10-07 at 6.03.50 PM (2).jpeg",
              "WhatsApp Image 2026-10-07 at 6.03.50 PM.jpeg",
              "WhatsApp Image 2026-10-07 at 6.03.51 PM.jpeg"
            ].map((imgSrc, idx) => (
              <div key={idx} className="album-image-wrapper" onClick={() => setSelectedImage(imgSrc)}>
                <img src={`/album/${imgSrc}`} alt={`Album ${idx}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* Full Screen Image Lightbox */}
    {selectedImage && (
      <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
        <div className="lightbox-actions" onClick={(e) => e.stopPropagation()}>
          <a href={`/album/${selectedImage}`} download={selectedImage} className="action-lightbox-btn" title="Download Image">
            <Download size={24} />
          </a>
          <button className="action-lightbox-btn" onClick={() => setSelectedImage(null)} title="Close">
            ✕
          </button>
        </div>
        <img src={`/album/${selectedImage}`} alt="Full Screen Album" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
      </div>
    )}
    </>
  );
}

export default App;
