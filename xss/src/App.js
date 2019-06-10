import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CompInnerHtml from './components/CompInnerHtml'
import CompInjectedAttr from './components/CompInjectedAttr'

function Index(){
    return <h2> Home </h2>
}

const attacks_arr = [
    {
        name: CompInnerHtml,
        id: 'compinnerhtml',
        description: "dangerouslySetInnerHTML",
    },
    {
        name: CompInjectedAttr,
        id: 'compinjectedattr',
        description: "Injecting Props",
    },
]

function Attack({ match }){

    if (match.params.id){
        const attack = attacks_arr.find(({ id }) => id === match.params.id)
        const TagName = attack.name
        return <TagName />
    } else {
        return <div> Invalid request </div>
    }
}

function Attacks({ match }) {
  return (
    <div>
      <h2>Attacks</h2>
      <ol>
        {
            attacks_arr.map(({ name, id, description }) => (
              <li key={id}>
                <Link to={`${match.url}/${id}`}>{description}</Link>
              </li>
            ))
        }
      </ol>


      <Route path={`${match.path}/:id`} component={Attack}/>

    </div>
  );
}

function App() {
  return (
    <Router>
        <div className="App" style={{width: 1000, margin: '0 auto'}}>

            <nav>
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/attacks">Attacks</Link></li>
              </ol>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/attacks" component={Attacks} />

        </div>
    </Router>
  );
}

export default App;
