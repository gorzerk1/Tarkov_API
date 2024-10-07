import './App.css';
import {Route, Routes} from "react-router-dom"
import FullSite from "./container/FullSite"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FullSite/>}/>
      </Routes>
    </div>
  );
}

export default App;
