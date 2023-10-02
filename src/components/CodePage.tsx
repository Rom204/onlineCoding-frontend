import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import socket from "../socketService";


const CodePage = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  let { state } = useLocation();
  // const [codeValue, setCodeValue] = useState(state.code.problem);
  const codeValue = state.code.problem;
  const roomId = state.code.id;

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
      console.log(`
      connected status: ${isConnected} !
      now connecting to room ${roomId}
      `)
      socket.emit("CONNECTED_TO_ROOM", { roomId });
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log(`
      connected status: ${isConnected} !`);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);
  // useEffect(() => {
  //   socket.on("CODE_CHANGED", (dataReceived) => {
  //     if (dataReceived === null) {
  //       console.log(dataReceived);
  //       return;
  //     }
  //     setTimeout(() => {
  //       setCodeValue(dataReceived);
  //       console.log(dataReceived);
  //     }, 1000);
  //   });
  //   return () => {
  //     socket.off('CODE_CHANGED');
  //   }
  // }, []);

  return (
    <div className="h-full w-full">
      <div>
        <Link to={"/"}>home</Link>
      </div>
      <div className="w-full p-4">
        <h3>{state.code.desc}</h3>
        <div>
          <CodeEditor
            value={codeValue}
            roomId={roomId}
          />
        </div>
      </div>
    </div>
  );
};

export default CodePage;
