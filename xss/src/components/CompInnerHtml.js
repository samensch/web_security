import React from 'react'

function CompInnerHtml(props){
    const dangerousText = "<img onerror='alert(\"Hacked!\");' src='invalid-image' />"

    return (
        <>
            <div>
                <p>
                Here we set <b>dangerouslySetInnerHtml</b> property on a div tag through which
                we are going to inject the following text:
                </p>
                <pre><code>
                {dangerousText}
                </code></pre>
            </div>
            <div dangerouslySetInnerHTML={{"__html": dangerousText}} />
        </>
    )
}

export default CompInnerHtml
