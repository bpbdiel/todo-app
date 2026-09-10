import { useState, useEffect } from "react"

import {
  Container,
  Typography,
  List,
  Paper
} from "@mui/material"

import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"

function App() {
  const [actividad, setActividad] = useState("")
  const [actividades, setActividades] = useState([])
  const [indiceEditando, setIndiceEditando] = useState(null)

  useEffect(() => {
    obtenerActividades()
  }, [])

  async function obtenerActividades() {
    const respuesta = await fetch(
      "http://localhost:3000/api/actividades"
    )

    const datos = await respuesta.json()

    setActividades(datos)
  }

  //Metodo para agregar y editar actividades con POST y editar PUT
  async function agregarActividad() {
    if (actividad === "") {
      return
    }

    if (indiceEditando !== null) {
      const item = actividades[indiceEditando]

      const respuesta = await fetch(
        `http://localhost:3000/api/actividades/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            titulo: actividad,
            completada: item.completada
          })
        }
      )

      const actividadActualizada = await respuesta.json()

      const nuevasActividades = [...actividades]
      nuevasActividades[indiceEditando] = actividadActualizada

      setActividades(nuevasActividades)
      setActividad("")
      setIndiceEditando(null)

      return
    }

    const respuesta = await fetch(
      "http://localhost:3000/api/actividades",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo: actividad
        })
      }
    )

    const nuevaActividad = await respuesta.json()

    setActividades([...actividades, nuevaActividad])
    setActividad("")
  }

  //Metodo para eliminar una actividad con DELETE
  async function eliminarActividad(index) {
    const id = actividades[index].id

    await fetch(
      `http://localhost:3000/api/actividades/${id}`,
      {
        method: "DELETE"
      }
    )

    const nuevasActividades = actividades.filter(
      (item) => item.id !== id
    )

    setActividades(nuevasActividades)
  }

  function editarActividad(index) {
    setActividad(actividades[index].titulo)
    setIndiceEditando(index)
  }

  async function cambiarEstado(index) {
    const item = actividades[index]

    const respuesta = await fetch(
      `http://localhost:3000/api/actividades/${item.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo: item.titulo,
          completada: !item.completada
        })
      }
    )

    const actividadActualizada = await respuesta.json()

    const nuevasActividades = [...actividades]
    nuevasActividades[index] = actividadActualizada

    setActividades(nuevasActividades)
  }

  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: 6 }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: 3 }}
        >
          Lista de actividades
        </Typography>

        <TodoForm
          actividad={actividad}
          setActividad={setActividad}
          agregarActividad={agregarActividad}
          indiceEditando={indiceEditando}
        />

        <List sx={{ marginTop: 2 }}>
          {actividades.map((item, index) => (
            <TodoItem
              key={item.id}
              item={item}
              index={index}
              editarActividad={editarActividad}
              eliminarActividad={eliminarActividad}
              cambiarEstado={cambiarEstado}
            />
          ))}
        </List>
      </Paper>
    </Container>
  )
}

export default App