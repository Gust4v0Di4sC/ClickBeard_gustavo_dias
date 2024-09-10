import React, { useState, useEffect } from 'react';
import { getAppointments } from '../../services/api';
import Nav from '../../components/Nav';

function ScheduleView() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getAppointments();
      setAppointments(response.data);
    };
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === selectedDate
  );

  return (
    <div>
      <Nav/>
      <div className='container-schedule'>
        <h2>Selecione a data para visualizar seus agendamentos:</h2>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      <ul>
        {filteredAppointments.map((appointment) => (
          <li key={appointment.id}>
            <b>Horário:</b>  {appointment.time} - <b>Cliente:</b>-  {appointment.userName} -   <b>Barbeiro:</b> {appointment.barberName} - <b>Serviço:</b> {appointment.service}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default ScheduleView;