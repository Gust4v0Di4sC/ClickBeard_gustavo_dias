import React, { useState, useEffect } from 'react';
import { getBarbers, addAppointment , getAppointments} from '../../services/api';
import'./style.css'
import Nav from '../../components/Nav';
import { toast } from 'react-toastify';


function Scheduling() {
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedBarberName, setSelectedBarberName] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      const response = await getBarbers();
      setBarbers(response.data);
    };
    fetchBarbers();
    
  }, []);

  useEffect(() => {
    if (selectedBarber && selectedDate) {
      const fetchAppointments = async () => {
        const response = await getAppointments(selectedBarber, selectedDate); // Pega os agendamentos do barbeiro para a data selecionada
        setAppointments(response.data);
      };
      fetchAppointments();
    }
  }, [selectedBarber, selectedDate]);

 
  const handleBarberChange = (e) => {
    const barberId = e.target.value;
    setSelectedBarber(barberId);
    const barber = barbers.find(b => b.id === barberId);
    setSelectedBarberName(barber ? barber.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifica se já existe um agendamento para o mesmo barbeiro no mesmo horário
    const hasConflict = appointments.some(appointment => appointment.time === selectedTime);
    if (hasConflict) {
      toast.error("Este barbeiro já tem um agendamento neste horário. Por favor, escolha outro horário.")
      return;
    }

    
    try {
      const userName = JSON.parse(localStorage.getItem('user'));

      
      await addAppointment({
        userId: userName.id,
        userName: userName.name,
        barberName: selectedBarberName,
        barberId: selectedBarber,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
      });
      // Redirecionar ou mostrar mensagem de sucesso
      toast.success('Agendamento realizado com sucesso!');
      // Limpar o formulário
      setSelectedBarber('');
      setSelectedBarberName('');
      setSelectedService('');
      setSelectedDate('');
      setSelectedTime('');
      
    } catch (error) {
      console.error('Erro ao agendar', error);
      toast.error('Erro ao realizar o agendamento. Por favor, tente novamente.');
    }
  };

  return (
    <>
    <Nav/>
    <div className=''>
    <form className='container-client-form boxform' onSubmit={handleSubmit}>
      <h2>Agendamento</h2>
        <div className='formgroup'>
        <label>Selecione um barbeiro</label>
        <select value={selectedBarber} onChange={handleBarberChange}>
          <option value="">Selecione um barbeiro</option>
          {barbers.map((barber) => (
            <option key={barber.id} value={barber.id}>{barber.name}</option>
          ))}
        </select>
        </div>
        <div className='formgroup'>
        <label>Selecione um serviço</label>
        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
          <option value="">Selecione um serviço</option>
          <option value="corte">Corte</option>
          <option value="barba">Barba</option>
          <option value="sobrancelha">Sobrancelha</option>
        </select>
        </div>
        <div className='formgroup'>
        <label>Selecione um dia</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
        <div className='formgroup'>
        <label>Selecione um horario</label>
        <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
        </div>
        
        <button type="submit">Agendar</button>
        
      </form>
    </div>
    
    </>
    
  );
}

export default Scheduling;