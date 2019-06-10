import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CompInnerHtml from './components/CompInnerHtml'

function Index(){
    return <h2> Home </h2>
}

function App() {
  return (
    <Router>
        <div className="App">

            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/compinnerhtml/">CompInnerHtml</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/compinnerhtml/" component={CompInnerHtml} />

        </div>
    </Router>
  );
}

export default App;
