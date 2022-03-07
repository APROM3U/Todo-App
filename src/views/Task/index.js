import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import * as S from './styles';
import api from '../../services/api';

//NOSSOS COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeIcons';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

function Task({ id = "6181d1eb3fb82d0016a52f65" }) {
  const [type, setType] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState("teste");
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();

  async function LoadTaskDetails() {

    //end point
    try {
      await api.get(`/task`);      
    } catch (error) { }

  }

  useEffect(() => {

    LoadTaskDetails();
  }, [])

  return (
    <S.Container>

      <Header />

      <S.Form>
        <h3>{type} {done} {title} {description} {date} {hour} </h3>

        <S.TypeIcons>
          {
            TypeIcons.map((icon, index) => (
              index > 0 &&
              <button key={index} type="button">
                <img src={icon} alt="Tipo da Tarefa"
                  className={type && type !== index && 'inative'} />
              </button>
            ))
          }
        </S.TypeIcons>

        <S.Input>
          <span>Título</span>
          <input type="text" placeholder="Título da terefa..."
            value={title} />
        </S.Input>

        <S.TextArea>
          <span>Descrição</span>
          <textarea rows={5} placeholder="Detalhes da tarefa..."
            value={description} />
        </S.TextArea>

        <S.Input>
          <span>Data</span>
          <input type="date" placeholder="Título da terefa..."
            value={date} />
          <img src={iconCalendar} alt="Calendário" />
        </S.Input>

        <S.Input>
          <span>Hora</span>
          <input type="time" placeholder="Título da terefa..."
            value={hour} />
          <img src={iconClock} alt="Relógio" />
        </S.Input>

        <S.Options>
          <div>
            <input type="checkbox" checked={done} />
            <span>CONCLUÍDO</span>
          </div>
          {id && <button type="button">EXCLUIR</button>}
        </S.Options>

        <S.Save>
          <button type="button">SALVAR</button>
        </S.Save>

      </S.Form>
      <Footer />
    </S.Container>
  )
}

export default Task;
