import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  List,
  Paper
} from "@mui/material"

import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"
import EditarModal from "./components/EditarModal.jsx"

function App() {
  const [actividad, setActividad] = useState("")
  const [actividades, setActividades] = useState([])
  const [actividadEditando, setActividadEditando] = useState(null)
  const [tituloEditando, setTituloEditando] = useState("")

  useEffect(() => {
    obtenerActividades()
  }, [])

  // Obtener actividades desde la API
  async function obtenerActividades() {
    const respuesta = await fetch(
      "http://localhost:3000/api/actividades"
    )

    const datos = await respuesta.json()

    setActividades(datos)
  }

  // Agregar una actividad con POST
  async function agregarActividad() {
    if (actividad.trim() === "") {
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

  // Eliminar una actividad con DELETE
  async function eliminarActividad(index) {
    const id = actividades[index].id

    const respuesta = await fetch(
      `http://localhost:3000/api/actividades/${id}`,
      {
        method: "DELETE"
      }
    )

    if (!respuesta.ok) {
      return
    }

    const nuevasActividades = actividades.filter(
      (item) => item.id !== id
    )

    setActividades(nuevasActividades)

    // Si justo se estaba editando la actividad eliminada,
    // se cierra el modal
    if (
      actividadEditando &&
      actividadEditando.id === id
    ) {
      cerrarModal()
    }
  }

  // Abrir modal de edición
  function editarActividad(index) {
    const item = actividades[index]

    setActividadEditando(item)
    setTituloEditando(item.titulo)
  }

  // Cerrar modal de edición
  function cerrarModal() {
    setActividadEditando(null)
    setTituloEditando("")
  }

  // Guardar edición con PUT
  async function guardarEdicion() {
    if (tituloEditando.trim() === "") {
      return
    }

    const respuesta = await fetch(
      `http://localhost:3000/api/actividades/${actividadEditando.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo: tituloEditando,
          completada: actividadEditando.completada
        })
      }
    )

    if (!respuesta.ok) {
      return
    }

    const actividadActualizada = await respuesta.json()

    const nuevasActividades = actividades.map((item) =>
      item.id === actividadActualizada.id
        ? actividadActualizada
        : item
    )

    setActividades(nuevasActividades)
    cerrarModal()
  }

  // Cambiar estado completada / pendiente con PUT
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

    if (!respuesta.ok) {
      return
    }

    const actividadActualizada = await respuesta.json()

    const nuevasActividades = actividades.map((actividadItem) =>
      actividadItem.id === actividadActualizada.id
        ? actividadActualizada
        : actividadItem
    )

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

        <EditarModal
          abierto={actividadEditando !== null}
          titulo={tituloEditando}
          setTitulo={setTituloEditando}
          guardar={guardarEdicion}
          cerrar={cerrarModal}
        />
      </Paper>
    </Container>
  )
}

export default App