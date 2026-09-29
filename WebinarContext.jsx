import { createContext, useContext, useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { AGORA_APP_ID as CONFIG_APP_ID, AGORA_CHANNEL as CONFIG_CHANNEL, AGORA_TOKEN as CONFIG_TOKEN } from "./agoraConfig";

const AGORA_APP_ID = CONFIG_APP_ID || "6bcd6067bc3e4f79b398496b8536eca0";
const AGORA_CHANNEL = CONFIG_CHANNEL || "main-webinar";
const AGORA_TOKEN = CONFIG_TOKEN || null;

const Ctx = createContext(null);
export const useWebinar = () => useContext(Ctx);

const DEFAULT_BRAND = { name: "India Ayega Online", logo: "" };

export function WebinarProvider({ children }) {
  const clientRef = useRef(null);
  const [tracks, setTracks] = useState({ mic: null, cam: null });
  const [remoteUser, setRemoteUser] = useState(null);
  const [status, setStatus] = useState("offline"); // offline | hosting | watching
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [viewers, setViewers] = useState(0);
  const [showCta, setShowCta] = useState(false);
  const [error, setError] = useState("");
  const [brand, setBrand] = useState(DEFAULT_BRAND);
  const [messages, setMessages] = useState([
    { id: 1, user: "Rahul", text: "Namaste sir, audio clear hai!" },
    { id: 2, user: "Priya", text: "Very useful session 👍" },
    { id: 3, user: "Amit", text: "Recording milegi kya?" },
  ]);

  const getClient = () => {
    if (!clientRef.current) {
      const c = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      c.on("user-published", async (user, type) => {
        await c.subscribe(user, type);
        if (type === "video") setRemoteUser(user);
        if (type === "audio") user.audioTrack && user.audioTrack.play();
      });
      c.on("user-unpublished", (user, type) => {
        if (type === "video") setRemoteUser(null);
      });
      clientRef.current = c;
    }
    return clientRef.current;
  };

  const leave = async () => {
    try {
      tracks.mic && (tracks.mic.stop(), tracks.mic.close());
      tracks.cam && (tracks.cam.stop(), tracks.cam.close());
      setTracks({ mic: null, cam: null });
      setRemoteUser(null);
      if (clientRef.current) await clientRef.current.leave();
    } catch (e) { /* ignore */ }
    setStatus("offline");
    setViewers(0);
  };

  const startHost = async () => {
    try {
      setError("");
      await leave();
      const c = getClient();
      await c.setClientRole("host");
      await c.join(AGORA_APP_ID, AGORA_CHANNEL, AGORA_TOKEN, null);
      const [mic, cam] = await AgoraRTC.createMicrophoneAndCameraTracks();
      await c.publish([mic, cam]);
      setTracks({ mic, cam });
      setMicOn(true);
      setCamOn(true);
      setStatus("hosting");
    } catch (e) {
      setError(e.message || "Could not start the stream");
      await leave();
    }
  };

  const joinAsAttendee = async () => {
    try {
      setError("");
      await leave();
      const c = getClient();
      await c.setClientRole("audience");
      await c.join(AGORA_APP_ID, AGORA_CHANNEL, AGORA_TOKEN, null);
      setStatus("watching");
    } catch (e) {
      setError(e.message || "Could not join the webinar");
      await leave();
    }
  };

  const toggleMic = async () => {
    if (!tracks.mic) return;
    await tracks.mic.setEnabled(!micOn);
    setMicOn(!micOn);
  };

  const toggleCam = async () => {
    if (!tracks.cam) return;
    await tracks.cam.setEnabled(!camOn);
    setCamOn(!camOn);
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), user: status === "hosting" ? "Host" : "You", text }]);
  };

  useEffect(() => {
    if (status === "offline") return;
    const t = setInterval(() => {
      try {
        const s = clientRef.current && clientRef.current.getRTCStats();
        if (s) setViewers(s.UserCount || 0);
      } catch (e) { /* ignore */ }
    }, 4000);
    return () => clearInterval(t);
  }, [status]);

  const value = {
    status, tracks, remoteUser, micOn, camOn, viewers, messages, showCta, error, brand,
    startHost, joinAsAttendee, leave, toggleMic, toggleCam, sendMessage,
    setShowCta, setBrand, resetBrand: () => setBrand(DEFAULT_BRAND),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
