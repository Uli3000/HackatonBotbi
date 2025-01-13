import { useState } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaAddressBook,
  FaSignOutAlt,
  FaHouseUser,
} from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { FaLocationDot, FaPerson } from "react-icons/fa6";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/");

    setTimeout(() => {
      toast.info("Has cerrado sesion");
    }, 10);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <Toaster position="top-right" richColors />
      <button className="toggle-button" onClick={toggleSidebar}>
        {isCollapsed ? ">" : "<"}
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to="/home">
              <FaHome style={{ paddingRight: "5px" }} />
              {!isCollapsed && <span> Inicio</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/clientes">
              <FaPerson style={{ paddingRight: "5px" }} />
              {!isCollapsed && <span> Clientes</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/propiedades">
              <FaHouseUser style={{ paddingRight: "5px" }} />
              {!isCollapsed && <span> Propiedades</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/ubicaciones">
              <FaLocationDot style={{ paddingRight: "5px" }} />
              {!isCollapsed && <span> Ubicaciones</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactos">
              <FaAddressBook style={{ paddingRight: "5px" }} />
              {!isCollapsed && <span> Contactos</span>}
            </NavLink>
          </li>
        </ul>
        <ul className="logout">
          <li>
            <a onClick={handleLogout}>
              <FaSignOutAlt style={{ paddingRight: "5px" }} />
              {!isCollapsed && <span> Cerrar Sesion</span>}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
