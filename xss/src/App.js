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

const nav_props = [
    {
        arr: attacks_arr,
        name: 'Attacks', 
    },
    {
        arr: fixes_arr,
        name: 'Fixes',
    },
]

class SubNav extends React.Component{

    render(){
        const {match, arr} = this.props
        const nav_ele = arr.find(({ id }) => id === match.params.id)
        if (nav_ele){
            const TagName = nav_ele.name
            const TagDesc = nav_ele.description
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

}

class Nav extends React.Component{
    render(){
        console.log(this.props)
        const {match, name, arr} = this.props;
        return (
        <div>
          <h2>{name}</h2>
          <ol>
            {
                arr.map(({ name, id, description }) => (
                  <li key={id}>
                    <Link to={`${match.url}/${id}`}>{description}</Link>
                  </li>
                ))
            }
          </ol>

          <Route 
            path={`${match.path}/:id`}
            render={(routeProps) => (
                <SubNav {...routeProps} arr={arr}/> 
            )}
          />

        </div>
        );
    }
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
            <Route
                path="/attacks"
                render={(routeProps) => (
                    <Nav {...routeProps} {...nav_props[0]}/>
                )}
            />
            <Route
                path="/fixes"
                render={(routeProps) => (
                    <Nav {...routeProps} {...nav_props[1]}/>
                )}
            />

        </div>
    </Router>
  );
}

export default App;
