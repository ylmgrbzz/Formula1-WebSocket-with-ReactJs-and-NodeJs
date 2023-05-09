import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ReactSpeedometer from "react-d3-speedometer";

const App = () => {
  const [speed, setSpeed] = useState(0);
  const [rpm, setRPM] = useState(0);
  const [heat, setHeat] = useState(0);
  const endpoint = "http://localhost:3000";

  useEffect(() => {
    const socket = socketIOClient(endpoint, {
      transports: ["websocket"],
    });
    socket.on("output road", (data) => {
      setSpeed(data.engineData.speed);
      setHeat(data.engineData.heat);
      setRPM(data.engineData.rpm);
    });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Hız</h2>
      <ReactSpeedometer
        maxValue={200}
        minValue={70}
        value={speed}
        needleColor="gray"
        startColor="orange"
        segments={10}
        endColor="red"
        needleTransition={"easeElastic"}
        ringWidth={20}
        textColor={"black"}
      />

      <h2>RPM</h2>
      <ReactSpeedometer
        maxValue={10000}
        minValue={1000}
        value={rpm}
        needleColor="gray"
        startColor="orange"
        segments={100}
        maxSegmentLabels={10}
        endColor="red"
        needleTransition={"easeElastic"}
        ringWidth={20}
        textColor={"black"}
      />

      <h2>Motor Isısı</h2>
      <ReactSpeedometer
        maxValue={500}
        minValue={100}
        value={heat}
        needleColor="gray"
        startColor="orange"
        segments={5}
        endColor="red"
        needleTransition={"easeElastic"}
        ringWidth={20}
        textColor={"black"}
      />
    </div>
  );
};

export default App;
