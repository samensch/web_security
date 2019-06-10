import React from 'react'

const sampleJSON = {
    "dangerouslySetInnerHTML" : {
        "__html": "<img src=x onerror=alert('hacked!') />"
    }
}

function CompInjectedAttr(props){
    //say dangerousText came from props then we would
    //have to parse it before giving it away. By
    //default for some reason chrome parses JSON when
    //placed in javascript.
    //const dangerousText = JSON.parse(sampleJSON)

    const dangerousText = sampleJSON
    return (
        <>
        <h2>CompInjectedAttr</h2>
        <p>
            Here we parse some JSON and give it as a prop to a tag element.
            We should use some sanitization methods to escape html code.<br/>

            Injected payload is 
            <pre><code>
            "{JSON.stringify(sampleJSON)}"
            </code></pre>
        </p>

        <span {...dangerousText} />
        {
        //alternate: without using JSX
        //React.createElement('span', dangerousText)
        }
        </>
    )
}

export default CompInjectedAttr
