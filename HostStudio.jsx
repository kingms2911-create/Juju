import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Camera, CameraOff, Play, Square, Megaphone, Palette } from "lucide-react";
import { useWebinar } from "./WebinarContext";
import BrandingSettings from "./BrandingSettings";
import LiveChat from "./LiveChat";

export default function HostStudio() {
  const { status, tracks, micOn, camOn, startHost, leave, toggleMic, toggleCam, showCta, setShowCta, error, brand } = useWebinar();
  const videoRef = useRef(null);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    if (tracks.cam && videoRef.current) tracks.cam.play(videoRef.current);
  }, [tracks.cam, status]);

  return (
    <div className="layout">
      <section className="main">
        <div className="video" ref={videoRef}>
          {status !== "hosting" && <div className="placeholder">Camera preview yahan dikhega. "Start Live" dabao.</div>}
          <span className="watermark-free">{brand.name}</span>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="controls">
          {status !== "hosting" ? (
            <button className="btn primary" onClick={startHost}><Play size={14} /> Start Live</button>
          ) : (
            <button className="btn danger" onClick={leave}><Square size={14} /> End Live</button>
          )}
          <button className="btn" onClick={toggleMic} disabled={status !== "hosting"}>{micOn ? <Mic size={14} /> : <MicOff size={14} />} {micOn ? "Mute" : "Unmute"}</button>
          <button className="btn" onClick={toggleCam} disabled={status !== "hosting"}>{camOn ? <Camera size={14} /> : <CameraOff size={14} />} Camera</button>
          <button className={showCta ? "btn accent" : "btn"} onClick={() => setShowCta(!showCta)}><Megaphone size={14} /> {showCta ? "Hide Offer" : "Push Offer"}</button>
          <button className="btn" onClick={() => setShowBrand(true)}><Palette size={14} /> Branding</button>
        </div>
      </section>
      <LiveChat />
      {showBrand && <BrandingSettings onClose={() => setShowBrand(false)} />}
    </div>
  );
}
