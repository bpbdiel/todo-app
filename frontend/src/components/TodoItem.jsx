import {
  ListItem,
  Checkbox,
  IconButton,
  Typography,
  Box
} from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

function TodoItem({
  item,
  index,
  editarActividad,
  eliminarActividad,
  cambiarEstado
}) {
  return (
    <ListItem
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        marginBottom: 1
      }}
    >
      <Checkbox
        checked={item.completada}
        onChange={() => cambiarEstado(index)}
      />

      <Typography
        sx={{
          flexGrow: 1,
          textDecoration: item.completada
            ? "line-through"
            : "none"
        }}
      >
        {item.titulo}
      </Typography>

      <Box>
        <IconButton
          onClick={() => editarActividad(index)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={() => eliminarActividad(index)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  )
}

export default TodoItem