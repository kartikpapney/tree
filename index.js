import {ENV, HTTP} from './constant.js';
import express from 'express';
import bodyParser from 'body-parser';
import router from './route/routes.js'
import http from 'http';
import cors from 'cors'
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
  origin: ENV.origin,
  "Access-Control-Allow-Origin": ENV.allowedOrigin,
  methods: ENV.allowedMethod
}));
app.set('port', ENV.port);


app.use('/api/tree', router);

app.use("", (req, res) => {
  res
    .status(HTTP.notFound)
    .json({
      message: 'Route not found'
    });
});

var server = http.createServer(app);
var notifyServer = server.listen(app.get('port'),
  ENV.ip,
  function() {
    console.info('Listening @' + notifyServer.address().address + ':' + notifyServer.address().port)
  })

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', reason.stack || reason)
})

export default app;