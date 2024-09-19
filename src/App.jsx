import { useState } from 'react';
import HeroSection from './components/HeroSection/HeroSection'

import './App.css'
import NannyList from './components/NannyList/NannyList';



function App() {
  
	
	
  const [isOpen, setIsOpen] = useState(false);

   const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NannyList/>
    
<button onClick={handleToggle}>{isOpen ? "Hide" : "Show"}</button>
      {isOpen && <p>Now you can see me!</p>}

      <HeroSection />
      
    </>
  )
}

export default App
