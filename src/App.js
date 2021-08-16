import React from "react";
import { Router, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import ResultsPage from "./ResultsPage";
import TopBar from "./TopBar";
import { createBrowserHistory as createHistory } from "history";
import { JobsStore } from "./stores";
import "./App.css";
const history = createHistory();
const jobsStore = new JobsStore();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route
          path="/"
          exact
          component={props => <HomePage {...props} jobsStore={jobsStore} />}
        />
        <Route path="/results/:id" exact component={ResultsPage} />
      </Router>
    </div>
  );
}
export default App;