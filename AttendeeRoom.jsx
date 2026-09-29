import { useEffect, useRef } from "react";
import { useWebinar } from "./WebinarContext";
import LiveChat from "./LiveChat";

export default function AttendeeRoom() {
  const { status, remoteUser, joinAsAttendee, leave, showCta, setShowCta, error, brand } = useWebinar();
  const videoRef = useRef(null);

  useEffect(() => {
    if (remoteUser && remoteUser.videoTrack && videoRef.current) remoteUser.videoTrack.play(videoRef.current);
  }, [remoteUser]);

  return (
    <div className="layout">
      <section className="main">
        <div className="video" ref={videoRef}>
          {!remoteUser && (
            <div className="placeholder">
              {status === "watching" ? "Host ka wait kar rahe hain..." : "Webinar dekhne ke liye Join dabao."}
            </div>
          )}
          <span className="watermark-free">{brand.name}</span>
          {showCta && (
            <div className="cta">
              <div><b>Special Offer!</b><br />Aaj join karo aur 50% off pao.</div>
              <button className="btn accent" onClick={() => setShowCta(false)}>Claim Now</button>
            </div>
          )}
        </div>
        {error && <div className="error">{error}</div>}
        <div className="controls">
          {status !== "watching" ? (
            <button className="btn primary" onClick={joinAsAttendee}>Join Webinar</button>
          ) : (
            <button className="btn danger" onClick={leave}>Leave</button>
          )}
        </div>
      </section>
      <LiveChat />
    </div>
  );
}
