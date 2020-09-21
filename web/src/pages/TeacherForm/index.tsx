import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";

import TextArea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";
import api from "../../services/api";

const TeacherForm: React.FC = () => {
  const { push } = useHistory();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: "",
      to: "",
    },
  ]);

  function addNewScheduleItem() {
    setScheduleItems((state) => [
      ...state,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const newArray = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: value,
        };
      }

      return { ...scheduleItem };
    });

    setScheduleItems(newArray);
  }

  async function handleCreateClass(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      });

      alert("Registro realizado con éxito!");
      push("/");
    } catch (error) {
      alert("Ocurrió un error!");
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que increible que usted quiera dar clases"
        description="El primer paso es llenar este formulario de inscripción"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Sus datos</legend>

            <Input
              type="text"
              name="name"
              label="Nombre completo"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Input
              type="text"
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAvatar(e.target.value)
              }
            />
            <Input
              type="text"
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWhatsapp(e.target.value)
              }
            />
            <TextArea
              name="bio"
              label="Biografía"
              value={bio}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setBio(e.target.value)
              }
            />
          </fieldset>

          <fieldset>
            <legend>Sobre la aula</legend>

            <Select
              name="subject"
              label="Materia"
              value={subject}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSubject(e.target.value)
              }
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
            <Input
              type="text"
              name="cost"
              value={cost}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCost(e.target.value)
              }
              label="Costo de su aula por hora "
            />
          </fieldset>

          <fieldset>
            <legend>
              Horarios disponibles{" "}
              <button type="button" onClick={addNewScheduleItem}>
                + Nuevo horario
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Día de la semana"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
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
                    name="from"
                    label="De"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="A"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Rellene todos los datos
            </p>

            <button type="submit">Guardar registro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
