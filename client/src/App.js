import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing/Landing'
/* import Home from './components/Home/Home.jsx' */

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path= '/' component={LandingPage}/>
          {/* <Route path= '/home' component={Home}/> */}
        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
