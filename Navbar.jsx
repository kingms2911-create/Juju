import { Radio, Video, Users } from "lucide-react";
import { useWebinar } from "./WebinarContext";

export default function Navbar({ tab, setTab }) {
  const { brand, status } = useWebinar();
  const live = status !== "offline";
  return (
    <header className="nav">
      <div className="brand">
        {brand.logo ? <img src={brand.logo} alt="logo" className="logo" onError={(e) => (e.currentTarget.style.display = "none")} /> : <div className="logo logo-ph">{brand.name.charAt(0)}</div>}
        <div>
          <div className="brand-name">{brand.name}</div>
          <div className="brand-sub">Webinar Studio</div>
        </div>
      </div>
      <div className="nav-right">
        <span className={"pill " + (live ? "pill-live" : "pill-off")}><Radio size={12} /> {live ? "LIVE" : "OFFLINE"}</span>
        <div className="tabs">
          <button className={tab === "host" ? "tab on" : "tab"} onClick={() => setTab("host")}><Video size={14} /> Host</button>
          <button className={tab === "attendee" ? "tab on" : "tab"} onClick={() => setTab("attendee")}><Users size={14} /> Attendee</button>
        </div>
      </div>
    </header>
  );
}
