import './App.css';
import {  BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import VideogameCreate from './components/VideogameCreate/VideogameCreate';
import NotFound from './components/NotFound/NotFound';
/* import Home from './components/Home/Home.jsx' */

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path= '/home' component={Home}/>
          <Route path='/videogame' component={VideogameCreate}/>
          <Route path='/home/:id' component={Detail}/>
          <Route path='/*' component={NotFound}/>
        </Switch>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
