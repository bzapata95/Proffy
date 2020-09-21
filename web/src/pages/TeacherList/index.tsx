import React, { FormEvent, useState } from "react";
import api from "../../services/api";

import { Teacher } from "../../components/TeacherItem";

import Input from "../../components/Input";

import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import TeacherItem from "../../components/TeacherItem";

import "./styles.css";

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  async function searchTeacher(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.get("classes", {
        params: {
          subject,
          week_day: weekDay,
          time,
        },
      });

      setTeachers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estos son los proffys disponibles">
        <form id="search-teachers" onSubmit={searchTeacher}>
          <Select
            name="subject"
            label="Materia"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "Arte", label: "Arte" },
              { value: "Biología", label: "Biología" },
              { value: "Ciencias", label: "Ciencias" },
              { value: "Educación física", label: "Educación física" },
              { value: "Física", label: "Física" },
              { value: "Geografía", label: "Geografía" },
              { value: "Historia", label: "Historia" },
              { value: "Matemática", label: "Matemática" },
              { value: "Ingles", label: "Ingles" },
              { value: "Química", label: "Química" },
            ]}
          />

          <Select
            name="week_day"
            label="Día de la semana"
            value={weekDay}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Lunes" },
              { value: "2", label: "Martes" },
              { value: "3", label: "Miércoles" },
              { value: "4", label: "Jueves" },
              { value: "5", label: "Viernes" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            name="time"
            label="Hora"
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
