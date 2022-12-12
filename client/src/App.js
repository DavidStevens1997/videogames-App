import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './components/Landing/Landing.jsx'
import Home from './components/Home/Home.jsx'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <h1>SOYHENRY</h1> */}
      <Switch>
        <Route exact path= '/' component={Landing}/>
        <Route path= '/home' component={Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
