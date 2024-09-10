import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import './style.css';
import  { addBarber, editBarber, getBarber, getSpecialties } from '../../services/api';
import { toast } from 'react-toastify';

const BarberForm = () => {
  const [name, setNome] = useState('');
  const [age, setIdade] = useState('');
  const [hireDate, setDataContratacao] = useState('');
  const [specialties, setEspecialidades] = useState([]);
  const [todasEspecialidades, setTodasEspecialidades] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchTodasEspecialidades = async () => {
      try {
        const response = await getSpecialties();
        setTodasEspecialidades(response.data);
      } catch (error) {
        console.error('Erro ao buscar especialidades:', error);
      }
    };
    if (isEdit) {
      const fetchBarbeiro = async () => {
        try {
          const response = await getBarber(id);
          const { name,age,hireDate,specialties } = response.data;
          setNome(name);
          setIdade(age);
          setDataContratacao(hireDate);
          setEspecialidades(specialties);
        } catch (error) {
          console.error('Erro ao buscar barbeiro:', error);
        }
      };
    fetchBarbeiro();
    }
    fetchTodasEspecialidades();
  }, [id, isEdit]);

  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const barbeiroData = {
      name,
      age: Number(age),
      hireDate,
      specialties
    };

    try {
      if (isEdit) {
        await editBarber(id,barbeiroData);
        toast.info('Barbeiro editado com sucesso')
      } else {
        await addBarber(barbeiroData);
        toast.success('Barbeiro adicionado com sucesso')
      }
      navigate('/admin/barbers');
    } catch (error) {
      console.error('Erro ao salvar barbeiro:', error);
    }
  };

  const handleEspecialidadeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setEspecialidades([...specialties, value]);
    } else {
      setEspecialidades(specialties.filter(especialidade => especialidade !== value));
    }
  };

  return (
    <div >
      <Nav />
      <div  className='container-admin-form boxform'>
<h2>{isEdit ? 'Editar Barbeiro' : 'Adicionar Barbeiro'}</h2>
      <form onSubmit={handleSubmit} >
        <div className='formgroup'>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className='formgroup'>
          <label>Idade:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>
        <div className='formgroup'>
          <label>Data de Contratação:</label>
          <input
            type="date"
            value={hireDate}
            onChange={(e) => setDataContratacao(e.target.value)}
            required
          />
        </div>
        <div className='formgroup'>
          <label>Especialidades:</label>
          <div className='checkboxgroup'>
            {todasEspecialidades.map(especialidade => (
              <label key={especialidade.id} className='checkboxlabel'>
                <input
                  type="checkbox"
                  value={especialidade.name}
                  checked={specialties.includes(especialidade.name)}
                  onChange={handleEspecialidadeChange}
                  className='checkboxinput'
                />
                {especialidade.name}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" >
          {isEdit ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
      </div>
    </div>
  );
};



export default BarberForm;
