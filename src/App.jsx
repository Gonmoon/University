import { Header } from './components/Header/Header.jsx'
import { Article } from './components/Article/Article.jsx'
import { Button } from './components/Button/Button.jsx'
import { Reviews } from './components/Reviews/Reviews.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const NavList = ['Одна кнопка', 'Другая кнопака', '3 кнопка']
  const articleInfo = {
    title: "Контурные кнопки",
    about: "Контурные кнопки - это кнопки со средним акцентом. Они содержат действия, которые важны, но не являются основными в приложении."
  }

  return (
    <>
      <Header navList={NavList}/>
      <Article articleInfo={articleInfo}/>
      <Button onClick={() => console.log('Clicked!')}>
        Нажми меня!
      </Button>
      <Reviews />
      <Footer navList={NavList}/>
    </>
  )
}

export default App
