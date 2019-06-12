import React from 'react'
import serialize from 'serialize-javascript'

const sampleJSON = {
    "dangerouslySetInnerHTML" : {
        "__html": "<img src=x onerror=alert('hacked!') />"
    }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function CompInjectedProps(props){
    //say dangerousText came from props then we would
    //have to parse it before giving it away. By
    //default for some reason chrome parses JSON when
    //placed in javascript.
    //const dangerousText = JSON.parse(sampleJSON)

    const dangerousText = serialize(sampleJSON)
    return (
        <>
        <div>
            <p>
            Here we parse some JSON and give it as a prop to a tag element.
            We should use some sanitization methods to escape html code.<br/>
            Injected payload is 
            </p>
            <pre><code>
            "{dangerousText}"
            </code></pre>
        </div>

        <ErrorBoundary>
            <span {...dangerousText} />
        </ErrorBoundary>
        {
        //alternate: without using JSX
        //React.createElement('span', dangerousText)
        }
        </>
    )
}

export default CompInjectedProps
