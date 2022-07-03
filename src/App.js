
import './App.css';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from "./Components/Login"
import Header from "./Components/Header";
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
<Routes>
<Route path="/" element={<Login/>} />
<Route path="/home" element={<Home/>} />

</Routes>
</Router>
    </div> 
  );
}

export default App;
