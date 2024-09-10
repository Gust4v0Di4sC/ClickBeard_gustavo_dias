import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleGlobal.css';
import image from '../assets/logo1.png'
import BackgroundEffect from './BackgroundEffect';
import { login, register } from '../services/api';
import { toast } from 'react-toastify';

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre login e registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate('');
  

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Lógica de Registro
       await register(name,email,password)
       toast.success("Registro realizado com sucesso!");
      setIsRegistering(false); // Alterna para login após registro
    } else {
      // Lógica de Login
          const  response = await login(email,password)
          const data = response.data;
          if (data.length > 0) {
            const user = data[0];
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/home")
          } else {
            toast.error("Falha no login. Verifique suas credenciais!");
          }
    }
  };

  return (
    <div className='login-container'>
    <BackgroundEffect />
       <div className='logo'>
       <img src={image} alt="Logo Barbearia"/> 
       <h2 >{isRegistering ? 'Registrar' : ''}</h2>
       </div>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Digite o seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Registrar' : 'Login'}</button>
        <button id='link' onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Registre-se'}
      </button>
      </form>
      
    </div>
  );
};

export default Auth;
