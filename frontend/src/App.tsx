import './App.css'
import PokemonCard from './components/pokeminCard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokemonSearchRedirect from './components/search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonSearchRedirect />} />
        <Route path="/pokemon" element={<PokemonCard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
