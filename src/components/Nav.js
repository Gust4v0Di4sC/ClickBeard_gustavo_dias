import { FiBook, FiBookmark, FiHome,FiUser} from "react-icons/fi";
import { Link } from "react-router-dom";
import Logout from "../services/Logout";
import './styleGlobal.css';
import image from '../assets/logo2.png'

export default function Nav(){
    const userName = JSON.parse(localStorage.getItem('user'));
     
    return (
      <div>
        {userName.type === "admin" ? (
          <nav className="navbar">
            <Link className="logo" to="/home">
              <img src={image} alt="logo barbearia" />
            </Link>
            <ul className="links">
              <li>
                <Link to="/admin/schedule">
                  <FiHome color="#fff" size={24} /> Agendamentos
                </Link>
              </li>
              <li>
              <Link to="/admin/barbers">
                <FiUser color="#fff" size={24} /> Barbeiros
              </Link>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="navbar">
            <Link className="logo" to="/home">
              <img src={image} alt="logo barbearia" />
            </Link>
            <ul className="links">
                <li>
                <Link to="/appointments">
              <FiBook color="#fff" size={24} /> Visualizar Agendamentos
            </Link>
                </li>
                <li>
                <Link to="/schedule">
              <FiBookmark color="#fff" size={24} />
              Agendar
            </Link>
                </li>
                <li>
                <Logout />
                </li>
            </ul>
          </nav>
        )}
      </div>
    );
}