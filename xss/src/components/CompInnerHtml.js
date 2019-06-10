import React from 'react'

function CompInnerHtml(props){
    const dangerousText = "<img onerror='alert(\"Hacked!\");' src='invalid-image' />"

    return (
        <>
            <h2> CompInnerHtml </h2>
            <p>
                Here we set <b>dangerouslySetInnerHtml</b> property on a div tag through which
                we are going to inject the following text <br /> 
                <pre><code>
                {dangerousText}
                </code></pre>
            </p>
            <div dangerouslySetInnerHTML={{"__html": dangerousText}} />
        </>
    )
}

export default CompInnerHtml
