import { useState } from "react";
import { X } from "lucide-react";
import { useWebinar } from "./WebinarContext";

export default function BrandingSettings({ onClose }) {
  const { brand, setBrand, resetBrand } = useWebinar();
  const [name, setName] = useState(brand.name);
  const [logo, setLogo] = useState(brand.logo);

  const save = () => {
    setBrand({ name: name.trim() || "India Ayega Online", logo: logo.trim() });
    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="row-between">
          <h3>Brand Settings (White-Label)</h3>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <label>Business Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client business name" />
        <label>Logo Image URL</label>
        <input value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="https://.../logo.png" />
        <div className="preview">
          {logo ? <img src={logo} alt="preview" className="logo" onError={(e) => (e.currentTarget.style.display = "none")} /> : <div className="logo logo-ph">{(name || "I").charAt(0)}</div>}
          <b>{name || "India Ayega Online"}</b>
        </div>
        <div className="row-gap">
          <button className="btn primary" onClick={save}>Save</button>
          <button className="btn" onClick={() => { resetBrand(); onClose(); }}>Reset</button>
        </div>
      </div>
    </div>
  );
}
