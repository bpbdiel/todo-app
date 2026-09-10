const express = require("express")
const cors = require("cors")

const actividadesRoutes = require("./routes/actividades")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API funcionando")
})

app.use("/api/actividades", actividadesRoutes)

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})