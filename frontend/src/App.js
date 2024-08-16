import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./User/Main";
import Page1 from "./User/Page1";
import Page2 from "./User/Page2";
import { useEffect, useState } from "react";
import { myContext } from "./User/Context";
import axios from 'axios';
import Admin from "./User/Admin";



function App() {
  const[user,setUser] = useState([])

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/getdata');
      setUser(response.data);
    } catch (error) {
      console.error('error fetching product:', error);
    }
  };


  const val = {
    user,setUser
  };


  return (
    <div>
    <myContext.Provider value={val}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path='/page1' element={<Page1/>}/>
        <Route path="/page2" element={<Page2/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
      </BrowserRouter>
      </myContext.Provider>
    </div>
  );
}

export default App;
