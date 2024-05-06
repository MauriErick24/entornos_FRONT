import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const dataText = [
  {
    id: 1,
    author: "María García",
    title: "Introducción a la Filosofía",
    text: "La filosofía es el estudio del conocimiento, la existencia y los valores morales. Aristóteles fue uno de los filósofos más influyentes.",
  },
  {
    id: 2,
    author: "Carlos Fernández",
    title: "Cálculo Diferencial",
    text: "El cálculo diferencial es una rama de las matemáticas que se centra en el estudio de las tasas de cambio y las derivadas de funciones.",
  },
  {
    id: 3,
    author: "Lucía Martínez",
    title: "Historia del Renacimiento",
    text: "El Renacimiento fue un movimiento cultural que surgió en Italia en el siglo XIV y se extendió por Europa, promoviendo el arte y el conocimiento clásico.",
  },
  {
    id: 4,
    author: "Javier Sánchez",
    title: "Química Orgánica",
    text: "La química orgánica se ocupa del estudio de los compuestos de carbono y sus reacciones. Es fundamental en la industria farmacéutica y petroquímica.",
  },
  {
    id: 5,
    author: "Ana Rodríguez",
    title: "Psicología del Comportamiento",
    text: "La psicología del comportamiento estudia cómo los estímulos externos afectan la conducta de los individuos, y cómo se pueden modificar las respuestas.",
  },
  {
    id: 6,
    author: "Pedro Jiménez",
    title: "Geometría Euclidiana",
    text: "La geometría euclidiana se basa en los principios de Euclides y trata las figuras y las propiedades espaciales, como líneas, ángulos y polígonos.",
  },
  {
    id: 7,
    author: "Isabel Torres",
    title: "Literatura Española del Siglo de Oro",
    text: "El Siglo de Oro fue una época de gran esplendor para la literatura española, destacando autores como Cervantes, Lope de Vega y Quevedo.",
  },
  {
    id: 8,
    author: "Sergio Morales",
    title: "Biología Celular",
    text: "La biología celular estudia la estructura y función de las células, incluyendo su metabolismo, comunicación y división celular.",
  },
  {
    id: 9,
    author: "Elena Castillo",
    title: "Estadística Aplicada",
    text: "La estadística aplicada utiliza métodos matemáticos para analizar datos y obtener información relevante, fundamental en campos como la economía y la investigación científica.",
  },
  {
    id: 10,
    author: "Raúl Gómez",
    title: "Sociología de la Cultura",
    text: "La sociología de la cultura examina cómo las prácticas culturales influyen en la sociedad y cómo los valores y creencias se transmiten a través de las generaciones.",
  },
];

interface Apunte {
  id: number;
  author: string;
  title: string;
  text: string;
}

interface Props {}

const MisApuntesPage = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [edit, setEdit] = useState(false);
  let data: Apunte = {
    id: 0,
    author: "Desconocido",
    title: "Desconocido",
    text: "Desconocido",
  };

  if (id != undefined) {
    const idNumber = parseInt(id);
    data = dataText[idNumber - 1];
  }

  return (
    <div className="container-main">
      {/* //! aqui el header */}
      <div className="apunte-header">
        <div className="action-buttons">
          <button onClick={() => setEdit(!edit)}>
            <EditIcon sx={{ color: "#E2E2E2" }} />
          </button>
          <button>
            <DeleteIcon sx={{ color: "#E2E2E2" }} />
          </button>
        </div>
      </div>
      {/* //!desde aqui el main */}
      <div className="apunte-body">
        {!edit ? (
          <>
            <h2 className="title-apunte">{data.title}</h2>
          </>
        ) : (
          <h2 className="title-apunte">
            <>
              {/* <label>titulo: </label> */}
              <input value={data.title} />
            </>
          </h2>
        )}

        {!edit ? (
          <p className="text-apunte">{data.text}</p>
        ) : (
          <textarea className="text-apunte">{data.text}</textarea>
        )}
      </div>
    </div>
  );
};

export default MisApuntesPage;
