// .env
require("dotenv").config();


// Express
const express = require("express");
const app = express();
app.use(express.json());

// Configuration Cors
const cors = require("cors");
app.use(cors({ origin: '*' }));

// Routers
const paymentRouter = require( "./router/payment.router" )
app.use( "/", paymentRouter );

const PORT = "4000";

app.listen(PORT, () => {
    console.log(`Server up and running at port ${PORT}`)
});
