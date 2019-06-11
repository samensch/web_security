import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CompInnerHtml from './components/CompInnerHtml'
import CompInjectedProps from './components/CompInjectedProps'
import CompInjectedAttr from './components/CompInjectedAttr'
import FixInnerHtml from './components/FixInnerHtml'

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
        name: CompInjectedProps,
        id: 'compinjectedprops',
        description: "Injecting Props",
    },
    {
        name: CompInjectedAttr,
        id: 'compinjectedattr',
        description: "Injecting Attributes",
    },
]

const fixes_arr = [
    {
        name: FixInnerHtml,
        id: 'fixinnerhtml',
        description: 'dangerouslySetInnerHtml',
    },
]

function Attack({ match }){

    const attack = attacks_arr.find(({ id }) => id === match.params.id)
    console.log(attack)
    if (attack){
        const TagName = attack.name
        const TagDesc = attack.description
        return (
            <>
            <h2>{TagDesc}</h2>
            <TagName />
            </>
        )
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


function Fix({ match }){

    const fix = fixes_arr.find(({ id }) => id === match.params.id)
    console.log(fix)
    if (fix){
        const TagName = fix.name
        const TagDesc = fix.description
        return (
            <>
            <h2>{TagDesc}</h2>
            <TagName />
            </>
        )
    } else {
        return <div> Invalid request </div>
    }
}

function Fixes({ match }) {
  return (
    <div>
      <h2>Fixes</h2>
      <ol>
        {
            fixes_arr.map(({ name, id, description }) => (
              <li key={id}>
                <Link to={`${match.url}/${id}`}>{description}</Link>
              </li>
            ))
        }
      </ol>


      <Route path={`${match.path}/:id`} component={Fix}/>

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
                <li><Link to="/fixes">Fixes</Link></li>
              </ol>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/attacks" component={Attacks} />
            <Route path="/fixes" component={Fixes} />

        </div>
    </Router>
  );
}

export default App;
