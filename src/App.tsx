import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />

        <Route path="users">
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>

  )
}

export default App
