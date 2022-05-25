import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login/Login';
import TopWords from './pages/TopWords/TopWords';
import WordFrequency from './pages/WordFrequency/WordFrequency';
import WordSentences from './pages/WordSentences/WordSentences';

// Context API
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route path='/user/wordfrequency' element={<WordFrequency/>}/>
            <Route path='/user/wordsentences' element={<WordSentences/>}/>
            <Route path='/user/topwords' element={<TopWords/>}/>
          </Routes>
    </AuthProvider>
  );
}

export default App;
