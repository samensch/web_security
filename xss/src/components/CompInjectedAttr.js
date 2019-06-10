import React from 'react'

class CompInjectedAttr extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: '', 
            submitPressed: false,
        }
    }

    handleChange = (event) => {
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
                Here you can inject any payload that starts with <b>javascript:</b> in the input field
                and then it will create a safe looking link which when pressed will execute the payload.
                Example payload to insert into input field:
                </p>
                <pre><code>
                javascript:alert('hacked') 
                </code></pre>
                <pre><code>
                javascript:alert(document.cookie) 
                </code></pre>
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
