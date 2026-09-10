import {
  TextField,
  Button,
  Box
} from "@mui/material"

function TodoForm({
  actividad,
  setActividad,
  agregarActividad,
  indiceEditando
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2
      }}
    >
      <TextField
        fullWidth
        label="Nueva actividad"
        value={actividad}
        onChange={(e) => setActividad(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={agregarActividad}
      >
        {indiceEditando !== null ? "Guardar" : "Agregar"}
      </Button>
    </Box>
  )
}

export default TodoForm