import io from "socket.io-client";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useStore } from "../store";
import { CodeEditor } from "./CodeEditor";
// import socket from "../socketService";
const socket = io("https://onlinecoding-backend.onrender.com", {
  transports: ["websocket"],
});

const CodePage = () => {
  let { state } = useLocation();
  // console.log(state);
  // console.log(socket.connected);
  const roomId = state.code.id;
  const [codeValue, setCodeValue] = useState(state.code.problem);

  // const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    console.log("runnning ?!?")
    function onConnect() {
      console.log("connected");
      // setIsConnected(true);
      socket.emit("CONNECTED_TO_ROOM", { roomId });
    }

    function onDisconnect() {
      // setIsConnected(false);
      console.log("disconnected");
    }
    // if (!isConnected) {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // }

    // socket.on("CODE_CHANGED", (dataReceived) => {
    //   if (dataReceived === null) {
    //     console.log(dataReceived);
    //     return;
    //   }
    //   setCodeValue(dataReceived);
    //   console.log(dataReceived);
    // });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  useEffect(() => {
    socket.emit("CODE_CHANGED", { codeValue, roomId });
    socket.on("CODE_CHANGED", (dataReceived) => {
      if (dataReceived === null) {
        console.log(dataReceived);
        return;
      }
      setCodeValue(dataReceived);
      console.log(dataReceived);
    });
    // console.log(codeValue);
  }, [codeValue]);
  const changedCode = (e: any) => {
    console.log(e.target.value);
    setCodeValue(e.target.value);
    // socket.emit("CODE_CHANGED", { codeValue: e.target.value, roomId });
  };

  return (
    <div className="h-full w-full">
      <div>
        {/* <Link to={"/lobby"}>home</Link> */}
        <Link to={"/"}>home</Link>
      </div>
      <div className="w-full p-4">
        <h3>{state.code.desc}</h3>
        <div>
          <CodeEditor
            value={codeValue}
            // onChange={(e: any) => setCodeValue(e.target.value)}
            onChange={changedCode}
          />
        </div>
      </div>
    </div>
  );
};

export default CodePage;
