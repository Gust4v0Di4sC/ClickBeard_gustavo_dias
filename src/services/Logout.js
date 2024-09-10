import {  useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
function Logout() {
  const navigate = useNavigate('');

  const handleLogout = () => {
    // Remover dados do localStorage (ex: token ou informações do usuário)
    localStorage.removeItem('user');
    
    // Redirecionar para a página de login
    navigate('/');
  };

  return (
    <button className='logout' onClick={handleLogout}>
        <FiArrowLeftCircle color="#fff" size={24}/> Logout
    </button>
  );
}

export default Logout;
