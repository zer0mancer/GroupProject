import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route element={<Navigate to="/lobriary/homepage"/>} path="/"/>
        <Route element={<HomePage/>} path="/lobriary/homepage"/>
      </Routes>
    </div>
  );
}

export default App;
