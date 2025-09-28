import React, { useState } from 'react';

import Header from '@widgets/Header';
import Footer from '@widgets/Footer';
import HomePage from '@pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage';
import ToDo from '@pages/ToDo';

import { INavItem } from '@types/types';
import logo from '@assets/Logo.png';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let navItems: INavItem[] = [
    { id: "1", label: "Home", href: "/"},
    { id: "2", label: "ToDo", href: "/todo"}
  ]

  return (
    <BrowserRouter>
      <Header logo={logo} navItems={navItems}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer text="©Made In China"/>
    </BrowserRouter>
  );
}

export default App;


// import Modal from '@shared/components/Modal';

// <div>
//         {/*<button onClick={() => setIsModalOpen(true)}>
//           Открыть модальное окно
//         </button>*/}

//         <Modal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           title="Пример модального окна"
//           children={
//             <>
//               <p>Содержимое модального окна!</p>
//               <button onClick={() => setIsModalOpen(false)}>
//                 Закрыть
//               </button>
//             </>
//           }
//         />
//       </div>