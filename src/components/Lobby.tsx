import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Lobby = () => {
  const [codeProblems, setCodeProblems] = useState([]);
  useEffect(() => {
    fetch("https://onlinecoding-backend-production.up.railway.app")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCodeProblems(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);
  return (
    <>
      <div className="text-3xl border-2">Lobby</div>
      <div className="flex flex-col">
        {codeProblems.map((problem) => {
          return (
            <Link className="border-2" key={problem["id"]} to={`/codePage/${problem["id"]}`} state={{ code: problem }}>
            {/* // <Link className="border-2" key={problem["id"]} to={`/codePage`} state={{ code: problem }}> */}
              <button className="h-full w-full">

              <h4>{problem["title"]}</h4>
              </button>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Lobby;
