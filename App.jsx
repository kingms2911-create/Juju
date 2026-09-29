import { useState } from "react";
import { WebinarProvider, useWebinar } from "./WebinarContext";
import Navbar from "./Navbar";
import HostStudio from "./HostStudio";
import AttendeeRoom from "./AttendeeRoom";

function Shell() {
  const [tab, setTab] = useState("host");
  const { status, leave } = useWebinar();
  const switchTab = async (t) => {
    if (t !== tab && status !== "offline") await leave();
    setTab(t);
  };
  return (
    <div className="app">
      <Navbar tab={tab} setTab={switchTab} />
      {tab === "host" ? <HostStudio /> : <AttendeeRoom />}
    </div>
  );
}

export default function App() {
  return (
    <WebinarProvider>
      <Shell />
    </WebinarProvider>
  );
}
