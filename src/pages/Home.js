import React from 'react';
import Nav from '../components/Nav';
import './styleHome.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const userName = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate('')
  return (
    <>
      <div>
        <Nav />
        {userName.type === "admin" ? (
          <div className='container-adm-page'>
            <h2>Bem-vindo, Administrador! {userName.name}</h2>
            <p>Gerencie seus barbeiros e especialidades <br/> de forma simples e eficiente.</p>
            <button onClick={()=> navigate('/admin/barbers')}>Gerenciar</button>
          </div>
        ) : (
          <div className='container-client-page'>
            <h2>Bem-vindo, Cliente! {userName.name}</h2>
            <p>ESTILO É UM REFLEXO DA SUA ATITUDE E <br/> SUA PERSONALIDADE</p>
            <p className='text'>Horário de funcionamento: 09:00 as 18:00</p>
            <button onClick={()=> navigate('/schedule')}>Agendar</button>
          </div>
          
        )}
      </div>
    </>
  );
};



export default Home;