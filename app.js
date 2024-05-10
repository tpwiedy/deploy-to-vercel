require('dotenv').config();
const express = require('express');
const logger = require('./libs/logger');
const { pinoHttp } = require('pino-http');
const routers = require('./routers');

const app = express();

if (!process.env.NODE_ENV==='test'){
    app.use(pinoHttp())
}

app.use(express.json())
app.use("/api/v1", routers)

//healthcheck handler
//useful to utilized on readiness and liveness probes in container orchestration deployment such as kubernetes
app.get("/healthcheck", (req, res) => setTimeout(() => res.sendStatus(200), 10000))

//not found error handler
app.use((req, res, next) => {
    return next({
        status: 404,
        message: 'No route to ' + req.path
    })
})

//wrap all error http event
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        data: err.data
    })
})

// module.exports = app.listen(port, () => {
//     logger.info(null, "Server run on port %d", port)
// })

module.exports = app