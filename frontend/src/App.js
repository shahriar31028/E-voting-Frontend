//import logo from './logo.svg';
import "./App.css";
//import Route from 'react-router-dom/Route'
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import CountDown from "./containers/Countdown";
import Candidates from "./containers/Candidates";
import Results from "./containers/Results";
import Elections from "./containers/Elections";
import Over from "./containers/Over";
//import Testlogin from "./containers/Testlogin"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          {/*<SignUp />*/}
          {/*<CountDown />
      <Candidate />
      <CountDown />*/}
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Login" component={Login} />
          <Route path="/Elections" component={Elections} />
          <Route path="/CountDown/:electionID" component={CountDown} />
          <Route path="/Candidates/:electionID" component={Candidates} />
          <Route path="/Results/:electionID" component={Results} />
          <Route path="/Over" component={Over} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
