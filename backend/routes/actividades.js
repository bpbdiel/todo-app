const express = require("express")
const pool = require("../db")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const resultado = await pool.query(
            "SELECT * FROM actividades ORDER BY id"
        )

        res.json(resultado.rows)
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener actividades"
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const titulo = req.body.titulo

        if (!titulo) {
            return res.status(400).json({
                mensaje: "El título es obligatorio"
            })
        }

        const resultado = await pool.query(
            "INSERT INTO actividades (titulo) VALUES ($1) RETURNING *",
            [titulo]
        )

        res.status(201).json(resultado.rows[0])
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear actividad"
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const titulo = req.body.titulo
        const completada = req.body.completada

        const resultado = await pool.query(
            `UPDATE actividades
       SET titulo = $1, completada = $2
       WHERE id = $3
       RETURNING *`,
            [titulo, completada, id]
        )

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: "Actividad no encontrada"
            })
        }

        res.json(resultado.rows[0])
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar actividad"
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id

        const resultado = await pool.query(
            "DELETE FROM actividades WHERE id = $1 RETURNING *",
            [id]
        )

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: "Actividad no encontrada"
            })
        }

        res.json({
            mensaje: "Actividad eliminada"
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar actividad"
        })
    }
})

module.exports = router