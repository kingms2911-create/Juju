import { useEffect, useRef, useState } from "react";
import { Send, Users } from "lucide-react";
import { useWebinar } from "./WebinarContext";

export default function LiveChat() {
  const { messages, sendMessage, viewers, status } = useWebinar();
  const [text, setText] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current && endRef.current.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const submit = () => { sendMessage(text); setText(""); };
  return (
    <aside className="chat">
      <div className="chat-head">
        <b>Live Chat</b>
        <span className="muted"><Users size={13} /> {status === "offline" ? 0 : viewers} online</span>
      </div>
      <div className="chat-body">
        {messages.map((m) => (
          <div key={m.id} className="msg"><b>{m.user}:</b> {m.text}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="chat-input">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="Type a message..." />
        <button className="btn primary" onClick={submit}><Send size={14} /></button>
      </div>
    </aside>
  );
}
