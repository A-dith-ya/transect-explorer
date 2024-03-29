import { useNavigate } from "react-router-dom";
import "./index.css";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="div_notfound">
      <i className="fas fa-sad-tear fa-10x"></i>
      <div className="div_notfound">
        <h1>404 Page Not Found</h1>
        <p>Sorry, the page you are looking for is not looking for you!</p>
        <a onClick={() => navigate("/map")}>
          <i className="fas fa-home"></i> Take me home... the place were I belong...
        </a>
      </div>
    </div>
  );
}

export default NotFound;
