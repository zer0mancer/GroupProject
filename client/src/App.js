import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import OnePlayer from './pages/OnePlayer';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col items-center">
      <NavBar/>
      <Routes>
        <Route element={<Navigate to="/lobriary/homepage"/>} path="/"/>
        <Route element={<HomePage/>} path="/lobriary/homepage"/>
        <Route element={<OnePlayer/>} path="lobriary/user/:id"/>

        {/* Still need the following! Prototype paths */}
        {/* <Route path='/lobriary/user/login' element={LoginForm}></Route>
        <Route path='/lobriary/lobby/add' element={addLobby}></Route>
        <Route path='/lobriary/lobby/:id' element={oneLobby}></Route> */}
        
      </Routes>
    </div>
  );
}

export default App;
