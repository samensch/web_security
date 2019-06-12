import React from 'react'
import Cookies from 'universal-cookie'

class CompInputAttr extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: '',
            submitPressed: false,
        }
        this.cookies = new Cookies();
        this.cookies.set('jedi', 'Anakin', { path: '/' })
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({value: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({submitPressed: true})
    }
    
    render(){

        return (
            <>
            <div>
                <p>
                A payload can be injected inside the input tag if user data is
                not sanitized.  I have also created a cookie
                `jedi:{this.cookies.get('jedi')}`  on this page which you can
                access.  Try the following.
                </p>
                <pre><code>
                " onfocus="alert(1)" autofocus="
                </code></pre>
                <pre><code>
                " onfocus="alert(document.cookie)" autofocus="
                </code></pre>
            </div>
            
            <form onSubmit={this.handleSubmit}>
                <label>
                    Input:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
                { 
                  this.state.submitPressed ? (
                      <label>Submit Pressed with value {this.state.value}</label>
                  ) : (
                      <label></label>
                  )
                }
            </form>
            </>
        )
    }
}

export default CompInputAttr
