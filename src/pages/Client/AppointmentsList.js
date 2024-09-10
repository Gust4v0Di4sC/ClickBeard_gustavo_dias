
import React, { useState, useEffect } from 'react';
import { getAppointments } from '../../services/api';
import Nav from '../../components/Nav';

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const userName = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointments();
        // Filtra apenas os agendamentos do usuário atual
        const userAppointments = response.data.filter(appointment => appointment.userId === userName.id);
        setAppointments(userAppointments);
      } catch (error) {
        console.error('Erro ao buscar agendamentos', error);
      }
    };

    fetchAppointments();
  }, [userName.id]);

  return (
    <div>
      <Nav/>
      <div className='container-schedule'>
      <h2>Meus Agendamentos</h2>
      {appointments.length === 0 ? (
        <p>Você não tem agendamentos.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <b>Data:</b> {appointment.date} -<b>Hora:</b>  {appointment.time} -<b>Barbeiro:</b>  {appointment.barberName} -  <b>Serviço: </b>{appointment.service}
            </li>
          ))}
        </ul>
      )} 
      </div>
    </div>
  );
}

export default AppointmentsList;