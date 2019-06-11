import React from 'react'
import dompurify from 'dompurify'

function CompInnerHtml(props){
    const dangerousText = "<img onerror='alert(\"Hacked!\");' src='invalid-image' />"
    const sanitizer = dompurify.sanitize

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
            <div dangerouslySetInnerHTML={{"__html": sanitizer(dangerousText)}} />
        </>
    )
}

export default CompInnerHtml
