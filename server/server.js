const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
let socket = require("socket.io-client")("http://localhost:3000");

const app = express();
const appServer = http.createServer(app);
const channel = socketIo(appServer);
app.use(cors());

channel.on("connection", (socket) => {
  console.log(
    `${Date(Date.now()).toLocaleString()}: yeni bir istemci bağlandı`
  );

  socket.on("input road", (data) => {
    console.log(
      `${Date(Date.now()).toLocaleString()}:Gelen veriler\n\tHız:${
        data.speed
      }\n\tDevir:${data.rpm}\n\tMotor sıcaklığı:${data.heat}`
    );

    socket.broadcast.emit("output road", { engineData: data });
  });

  socket.on("disconnect", () => {
    console.log(
      `${Date(Date.now()).toLocaleString()}istemci bağlantıyı kapattı`
    );
  });
});

appServer.listen(3000, () => {
  console.log(
    `${Date(
      Date.now()
    ).toLocaleString()}: Sunucu 3000 nolu port üzerinden aktif konumda.`
  );
});

let engineData = {
  speed: 0,
  rpm: 0,
  heat: 0,
};

setInterval(function () {
  engineData.speed = getRandomValue(70, 180);
  engineData.rpm = getRandomValue(1000, 10000);
  engineData.heat = getRandomValue(100, 500);

  console.log(
    `Üretilen veri\nHız:${engineData.speed}\nDevir:${engineData.rpm}\nMotor sıcaklığı:${engineData.heat}`
  );

  socket.emit("input road", engineData);
}, 5000);

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
