import React, { useState } from 'react';
import { INavItem, IArticle } from '@types/types'
import Modal from '@shared/components/Modal';

import Info from '@shared/blocks/Info';
import About from '@shared/blocks/About';
import ShortContact from '@shared/blocks/ShortContact';

import Header from '@widgets/Header';
import Footer from '@widgets/Footer';
import logo from '@assets/Logo.png';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let navItems: INavItem[] = [
    { id: "1", label: "Home", href: "#"},
    { id: "2", label: "About", href: "#"},
    { id: "3", label: "Contact", href: "#"},
  ]

  let articles: IArticle[] = [
    { id: "123", href: "article1.png", title: "TEXT", info: "sdfgasdag bfdgjsifdgi osfdjgiuosfjgiuoert jgutrihjguithgntu injvgt uiovnutwirgb nrwtu oibnrwtiuwoibntr" },
    { id: "1534", href: "article2.png", title: "TEXT", info: "sdfgasdag bfdgjsifdgi osfdjgiuosfjgiuoert jgutrihjguithgntu injvgt uiovnutwirgb nrwtu oibnrwtiuwoibntr" },
    { id: "7653", href: "article3.png", title: "TEXT", info: "sdfgasdag bfdgjsifdgi osfdjgiuosfjgiuoert jgutrihjguithgntu injvgt uiovnutwirgb nrwtu oibnrwtiuwoibntr" },
  ]

  const titleInfo = "НАЗВАНИЕ";
  const textInfo = "Потом придумаю текст, честно)";

  const infoShortContact = "Ваша реклама";

  return (
    <>
      <Header logo={logo} navItems={navItems}/>
      <Info title={titleInfo} text={textInfo} logo={logo}/>
      <About articles={articles} />
      <ShortContact info={infoShortContact} href="#" text="Клик!" />
      <Footer text="©Made In China"/>
      <div>
        {/*<button onClick={() => setIsModalOpen(true)}>
          Открыть модальное окно
        </button>*/}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Пример модального окна"
          children={
            <>
              <p>Содержимое модального окна!</p>
              <button onClick={() => setIsModalOpen(false)}>
                Закрыть
              </button>
            </>
          }
        />
      </div>
    </>
  );
}

export default App;