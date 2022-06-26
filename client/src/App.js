import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';

// pages
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Chat } from './pages/Chat/Chat';
import { SetAvatar } from './pages/SetAvatar/SetAvatar';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Chat />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>      
    </>
  );
}

export default App;
