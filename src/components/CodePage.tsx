import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useStore } from "../store";
import { CodeEditor } from "./CodeEditor";
import socket from "../socketService";


const CodePage = () => {
  // console.log('socket: ', socket);
  const [isConnected, setIsConnected] = useState(socket.connected);
  // console.log('is connected: ', isConnected);
  let { state } = useLocation();
  // console.log('state: ', state);
  const [codeValue, setCodeValue] = useState(state.code.problem);
  console.log("code value", codeValue)
  const roomId = state.code.id;
  console.log('roomID', roomId);

  useEffect(() => {
    console.log('first use effect runs !')
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

    // socket.on("disconnect", () => {
    //   setIsConnected(false);
    //   console.log("disconnected");
    // });
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
      // console.log('first use effect unmounted !');
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log('second use effect run ! ')

    // socket.emit("CODE_CHANGED", { codeValue, roomId });
    socket.on("CODE_CHANGED", (dataReceived) => {
      if (dataReceived === null) {
        console.log(dataReceived);
        return;
      }
      setCodeValue(dataReceived);
      console.log(dataReceived);
    });
  }, [codeValue]);
  // const changedCode = (e: any) => {
  //   console.log(e.target.value);
  //   setCodeValue(e.target.value);
  //   // socket.emit("CODE_CHANGED", { codeValue: e.target.value, roomId });
  // };

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
            // onChange={changedCode}
            roomId={roomId}
          />
        </div>
      </div>
    </div>
  );
};

export default CodePage;
