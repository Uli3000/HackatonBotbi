import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Error 404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/home" className="home-link">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
