import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import OnePlayer from './pages/OnePlayer';
import CreateNewLobby from "./pages/CreateNewLobby";
import UpdateLobby from "./pages/UpdateLobby";
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  
  return (
    <div className="h-screen bg-gray-50 flex flex-col items-center">
      <NavBar/>
      <Routes>
        <Route element={<Navigate to="/lobriary/homepage"/>} path="/"/>
        <Route element={<HomePage/>} path="/lobriary/homepage"/>
        <Route element={<OnePlayer/>} path="lobriary/user/:id"/>
        <Route element={<CreateNewLobby/>} path="/lobriary/lobby/create" />
        <Route element={<UpdateLobby/>} path="/lobriary/lobby/update/:id" />

        {/* Still need the following! Prototype paths 
        <Route path='/lobriary/lobby/:id' element={oneLobby}></Route> */}
        
      </Routes>
    </div>
  );
}

export default App;
