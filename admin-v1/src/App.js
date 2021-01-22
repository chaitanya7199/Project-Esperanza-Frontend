import './App.css';
import Login from './components/loginComponent';
import { Switch, Route, Link ,BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div>
       <BrowserRouter>
          <Switch>
             <Route path="/" component={Login} />       
          </Switch>   
        </BrowserRouter>  
    </div>
  );
}

export default App;
