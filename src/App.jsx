import { Header } from './components/Header/Header.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const headerNavList = ['main', 'react']

  return (
    <>
      <Header navList={headerNavList}/>
      <Footer navList={headerNavList}/>
    </>
  )
}

export default App
