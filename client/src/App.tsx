import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import {HashRouter, Route, Routes} from 'react-router-dom';
import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})
const App = () => {
  return (
    <HashRouter>
    <div className="App">
      <ToastContainer position={"top-center"}/>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/add"} element={<AddEdit/>}/>
        <Route path={"/update/:id"} element={<AddEdit/>}/>
      </Routes>
    </div>
    </HashRouter>
  );
};

export default App;
