const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
 
const PORT = process.env.PORT;
const AUTH_HEADERS = {
    Authorization: "Token 9b7661d9292aab2c339b95bf251063791c2a62ff",
    "Content-Type": "application/json",
};

app.use(cors());

app.get("/api/PayJoy/users", async (req, res) => {
    try {
        const apiUrl = "https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/PayJoyUsers";

        console.log(`Consultando API: ${apiUrl}`);

        const response = await fetch(apiUrl, { headers: AUTH_HEADERS });
        const rawBody = await response.text();

        if (!response.ok) {
            console.error(`Respuesta no OK (${response.status}) de la API PayJoy users:`, rawBody.slice(0, 500));
            return res.status(502).json({ error: `La API de origen respondio ${response.status}` });
        }

        let data;
        try {
            data = JSON.parse(rawBody);
        } catch (parseErr) {
            console.error("Respuesta no es JSON valido:", rawBody.slice(0, 500));
            return res.status(502).json({ error: "La API de origen no devolvio JSON valido" });
        }

        res.json(data);
    } catch (err) {
        console.error("Error en el proxy PayJoy users:", err);
        res.status(500).json({ error: "Error al obtener datos de PayJoy users" });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
