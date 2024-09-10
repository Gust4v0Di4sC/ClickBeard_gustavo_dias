import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./style.css"
import Nav from '../../components/Nav';
import { getBarbers,deleteBarber } from '../../services/api';
import { toast } from 'react-toastify';

const BarberList = () => {
  const [barbeiros, setBarbeiros] = useState([]);
  const navigate = useNavigate('');
  useEffect(() => {
    fetchBarbeiros();
  }, []);

  const fetchBarbeiros = async () => {
    try {
      const response = await getBarbers();
      setBarbeiros(response.data);
    } catch (error) {
      console.error('Erro ao buscar barbeiros:', error);
    }
  };

  const deleteBarbeiro = async (id) => {
    try {
      await deleteBarber(id);
      toast.warn("Barbeiro deletado!!");
      fetchBarbeiros();
    } catch (error) {
      console.error('Erro ao deletar barbeiro:', error);
    }
  };

  return (
    <div >
      <Nav />
      <div className='container-admin'>
      <h2>Barbeiros Cadastrados</h2>
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Data de Contratação</th>
            <th>Especialidades</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {barbeiros.map(barbeiro => (
            <tr key={barbeiro.id}>
              <td>{barbeiro.name}</td>
              <td>{barbeiro.age}</td>
              <td>{new Date(barbeiro.hireDate).toLocaleDateString("pt-BR")}</td>
              <td>{barbeiro.specialties.join(" ,")}</td>
              <td>
                <button className='edit' onClick={()=> navigate(`/admin/edit/${barbeiro.id}`)}>Editar</button>
                <button className='delete' onClick={() => deleteBarbeiro(barbeiro.id)} >Deletar</button>
              </td>
            </tr>
          ))}
        </tbody> 
      </table>
      <Link to="/admin/form" className='button-add'>Adicionar Barbeiro</Link>  
    </div>
      
    </div>
  );
};



export default BarberList;
