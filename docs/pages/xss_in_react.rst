XSS in React
============

Since React is a library for creating component based interfaces, most of the
attacks surfaces in issues related to rendering elements in the DOM.

JSX Prevents Injection attacks
------------------------------

By default, React DOM escapes any values embedded in JSX before rendering them.
Thus it ensures that you can never inject anything that’s not explicitly
written in your application. Everything is converted to a string before being
rendered. This helps prevent XSS (cross-site-scripting) attacks.

.. code:: html

    const title = response.potentiallyMaliciousInput;
    const element = <h1>{title}</h1>;

According to documentation, Babel compiles JSX down to
:code:`React.createElement()` calls.

.. code-block:: javascript

    React.createElement(
      type,
      [props],
      [...children]
    )

:code:`createElement` creates and returns a new React element of the given
type, where :code:`props` contains a list of attributes passed to the new
element and :code:`children` contains the child node(s) of the new element
(which, in turn, are more React components).

So above code may compile to 

.. code:: javascript

    const element = React.createElement(
      'h1',
      {},
      '_escaped_title_'
    );

Escaping code in React DOM works great when passing a string in
:code:`[...children]` as we did with *_escaped_title_*, but the other two
arguments, :code:`type` and :code:`props` are passed unescaped.

This could potentially lead to XSS attacks if bad programming practices are
used.

Bad Programming Patterns
------------------------

- Creating React components from user-supplied objects, i.e. setting the
  :code:`type` attribute with data supplied by user.
- Explicitly setting the :code:`dangerouslySetInnerHTML` prop of an element;
- Rendering links with user-supplied :code:`href` attributes, or other HTML tags with
  injectable attributes (`link` tag, HMTL5 imports);
- Passing user-supplied strings to :code:`eval()`.

Controlling Element Type
************************

While creating a dynamic element with type provided by the user isn't on its
own harmful since it would only result in a plain attribute-less HTML Element,
setting the properties of the newly created element would have dangerous
effects.

Injecting Props
***************

Say you have set up the system such that you parse user supplied JSON and then
parse it to use the resulting object as props.

.. code:: javascript

    attacker_props = JSON.parse(stored_value)
    React.createElement("span", attacker_props};

Here, if the attacker wishes they can use the following payload to set the
:code:`dangerouslySetInnerHTML` property. This property is React’s
replacement for using innerHTML in the browser DOM.

.. code:: json

    {
        "dangerouslySetInnerHTML" : { 
            "__html": "<img src=x/onerror=’alert(localStorage.access_token)’>"
        }
    }

dangerouslySetInnerHTML
***********************

Avoid this property as much as you can. If need be thoroughly test your app and
use preventive measures such as sanitizing both at server side and user side,
and use whitelist methods.

.. code:: javascript

    const aboutUserText = "<img onerror='alert(\"Hacked!\");' src='invalid-image' />";

    class AboutUserComponent extends React.Component {
      render() {
        return (
          <div dangerouslySetInnerHTML={{"__html": aboutUserText}} />
        );
      }
    }

    ReactDOM.render(<AboutUserComponent />, document.querySelector("#app"))

Injectable Attributes
*********************

If the user controls the :code:`href` attribute of a dynamically generated :code:`a` tag
then there is nothing to prevent the attacker from injecting a :code:`javascript:` url.

.. code:: html

    <a href={userinput}>Link</a>
    <button form="name" formaction={userinput}>

Eval-based Injection
********************

If the attacker can provide an input that is then dynamically evaluated then there is nothing
to stop them from injecting harmful code.

.. code:: javascript

    function antiPattern() {
      eval(this.state.attacker_supplied);
    }

    // Or even crazier
    fn = new Function("..." + attacker_supplied + "...");
    fn()

Resources & Interesting Reads
-----------------------------

https://medium.com/dailyjs/exploiting-script-injection-flaws-in-reactjs-883fb1fe36c1

https://medium.com/javascript-security/avoiding-xss-via-markdown-in-react-91665479900


