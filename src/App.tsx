import { Route, Routes } from 'react-router-dom'
import Lobby from './components/Lobby'
import CodePage from './components/CodePage'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path={"/"} element={<Lobby/>}/>
        <Route path={"/codePage/:roomId"} element={<CodePage/>}/>
      </Routes>
    </div>
  )
}

export default App
