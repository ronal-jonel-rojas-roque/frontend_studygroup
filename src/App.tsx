import { Routes, Route } from 'react-router-dom';
import Dashboard from './page/dashboard/dashboard.page';
import Login from './page/login/login.page';
import './common/styled-app.css';
import Teacher from './page/teacher/teacher.page';
import Class from './page/class/class.page';
import Contact from './page/contact/contact.page';
import Perfil from './page/perfil/perfil';
import UserDatosPerfil from './components/user-datos-perfil';
import UserCoursePerfil from './components/user-course-perfil';

function App() {
  return (<div>
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="#home" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/class" element={<Class />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  </div>

  );
}

export default App;
