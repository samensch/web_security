import React from 'react'
import dompurify from 'dompurify'

class CompInjectedAttr extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: '', 
            submitPressed: false,
        }
            this.sanitizer = dompurify.sanitize
    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({submitPressed: true})
        this.setState({value: this.sanitizer(this.state.value)})
    }
    
    render(){
        return (
            <>
            <div>
                <p>
                Here you can inject any payload that starts with <b>"javascript:"</b> in the input field
                and then it will create a safe looking link which when pressed will execute the payload.
                Example payload to insert into input field:
                </p>
                <pre><code>
                javascript:alert('hacked') 
                </code></pre>
                <pre><code>
                javascript:alert(document.cookie) 
                </code></pre>
                <h3> NOTE: </h3>
                <p>
                    This code is still vulnerable because here we are using a
                    sanitizer but it doesn't work as intended because in the href
                    attribute of the anchor tag there is nothing to sanitize.  There is
                    a "javascript" url inside it so we have to whitelist it by using
                    CSP.  <br /> To have CSP ignore inline scripts goto
                    /public/index.html and add 'unsafe-inline' to the scripts section.
                </p>
            </div>
            
            <form onSubmit={this.handleSubmit}>
                <label>
                    Input:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                { this.state.submitPressed ? (
                      <>
                      <label>Submit Pressed with value {this.state.value}</label>
                      <a href={this.state.value}>Safe looking link</a>
                      </>
                  ) : (
                      <label></label>
                  )}
            </form>
            </>
        )
    }
}

export default CompInjectedAttr
