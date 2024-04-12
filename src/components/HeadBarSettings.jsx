import { useEffect, useRef } from "react";
import AuthService from "../services/AuthService";

const HeadBarSettings = ({ setActive, btnRef }) => {
  const menuRef = useRef();
  const handleOff = (event) => {
    if (!menuRef.current.contains(event.target) && !btnRef.current.contains(event.target)) {
      setActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOff);
    return () => {
      document.removeEventListener("click", handleOff);
    };
  }, []);

  return (
    <div ref={menuRef} className="headbar_context_menu">
      <button className="headbar_logout" onClick={AuthService.logout}>
        Выйти
      </button>
    </div>
  );
};

export default HeadBarSettings;
