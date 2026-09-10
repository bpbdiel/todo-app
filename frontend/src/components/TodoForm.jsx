import {
  TextField,
  Button,
  Box
} from "@mui/material"

function TodoForm({
  actividad,
  setActividad,
  agregarActividad
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            agregarActividad()
          }
        }}
      />

      <Button
        variant="contained"
        onClick={agregarActividad}
      >
        Agregar
      </Button>
    </Box>
  )
}

export default TodoForm