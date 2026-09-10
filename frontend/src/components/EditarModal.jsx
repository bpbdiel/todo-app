import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material"

function EditarModal({
  abierto,
  titulo,
  setTitulo,
  guardar,
  cerrar
}) {
  return (
    <Dialog
      open={abierto}
      onClose={cerrar}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Editar actividad
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Actividad"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          sx={{ marginTop: 1 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={cerrar}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={guardar}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditarModal