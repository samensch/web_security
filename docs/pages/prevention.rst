XSS Prevention
==============

In an HTML page there are these slots where a developer can put data from an
untrusted user. We create a Whitelist model within which we specify slots in
which the developer should put untrusted data. Putting data anywhere else is
not recommended. Within these slots any data put should be escaped/encoded.

Now one might think that just HTML Encoding the untrusted data should suffice,
and it's okay to think that but doing so would handle only a small percentage of
XSS attacks that your application might come under. This is because HTML Entity
Encoding is okay for untrusted data that might go inside the body of a HTML
Entity like a div tag, and it might also work with data that goes into
attributes if you put quotes around them. But HTML Entity encoding doesn't work
if you are putting untrusted data inside a script tag, or an event handler, or
inside CSS, or in URLs. The reason for this is that the browser uses different
parsers for different contexts.

Given the way browsers may parse different parts of HTML, each of the different
type of slots must be handled differently. When untrusted data is put into these
slots you need to make sure that the data does not break out of that slot into a
context that allows script execution.

As an Example of this parsing difference consider these two lines of code.

.. code:: html
    
    <div><script title="</div>">

.. code:: html
    
    <script><div title="</script>">

Take a moment to think how the DOM renders when these are encountered. As an hint,
even my rst parser doesn't recognize the second one as html.

This is what :code:`<div><script title="</div>">` outputs

.. code:: html
    
    <div>
        <script title="</div>">
        </script>
    </div>

This is what :code:`<script><div title="</script>">` outputs

.. code:: html

    <body>"></body>

Hopefully it should be apparent by now that you MUST use the escape syntax for the
part of the HTML document you're putting untrusted data into since depending on the
context different parsers could be used.

Here we only look at how to prevent Reflected and Stored XSS attacks. For DOM
XSS you can look at the link provided at the end.

XSS prevention rules
--------------------

Rule 0
******

Don't put **any** untrusted data into your HTML document, unless it is withing one of the
slots defined in rules 1 to 5, because there might be some strange contexts for which
encoding rules are tricky based on how different browsers handle them.

These strange contexts include nested contexts like a URL inside javascript. Also don't
put any untrusted data directly inside a script tag, or inside an HTML comment, or in an
attribute or tag name, or directly in CSS.

Rule 1
******

HTML Escape before inserting Untrusted data into HTML Element Content. One can
use HTML entity encoding but using hex codes is recommended in the spec to
prevent switching into any execution context such as a script, style, or event
handlers.

Rule 2
******

Attribute Escape before putting untrusted data inside HTML common attributes
like :code:`width`, :code:`name`, :code:`value` etc.  This rule should not be
used for complex attributes like :code:`src`, :code:`href`, etc.

Stress on the word common here as relating to attributes whose contents are not
executed.

.. code:: html

    <div attr="...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...">content


Except for alphanumeric characters encode all other characters with
:code:`&#xHH;` format. The reason for this being so broad is that developers often
forget to put attribute values in quotes, and quoted characters can only be
escaped with a quoting character whereas for unquoted attributes there are many
ways to escape.

Rule 3
******

Javascript Escape before inserting untrusted data into Javascript data values.
This concerns both scripts and event-handler attributes. The **only** safe
place to put this data is inside a quoted data value since escaping in any
other javascript context is very easy.

.. code:: xml
    
    <script>alert('...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...')</script>     

    <script>x='...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...'</script>

    <div onmouseover="x='...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...'"</div>  

Except for alphanumeric characters escape all others with :code:`\xHH` format.
**DO NOT** just escape quote characters like :code:`\"` because the attacker
sends :code:`\"` and the vulnerable code turns that into :code:`\\"` which
enables the quote.

Rule 4
******

CSS is surprisingly powerful, and can be used for numerous attacks. Therefore,
it's important that you only use untrusted data in a property **value** and not
into other places in style data.

CSS Escape and validate before inserting untrusted data into CSS selector values.

.. code:: html

    <span style="property : ...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...">text</span>

Except for alphanumeric characters, escape all characters with ASCII values
less than 256 with the :code:`\HH` format. DO NOT use any escaping shortcuts
like :code:`\"`.

Even if you Escape all untrusted data, validation has to be done to ensure that
the URLs only start with :code:`http` and not :code:`javascript`. 

.. code:: html

    { background-url : "javascript:alert(1)"; }  // and all other URLs

Rule 5
******

URL Escape before putting untrusted data into HTML URL parameter values. Like
when you put data from user in to GET parameters. Except for alphanumeric
characters, escape all characters with ASCII values less than 256 with the :code:`%HH`
escaping format. 

.. code:: html

    <a href="http://www.somesite.com?test=...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...">link</a >

Do not encode complete or relative URL's with URL encoding! If untrusted input
is meant to be placed into href, src or other URL-based attributes, it should
be validated to make sure it does not point to an unexpected protocol,
especially javascript links. 

URL's should then be encoded based on the context of display like any other
piece of data. For example, user driven URL's in HREF links should be attribute
encoded.

Rule 6
******

If the data from the user is supposed to contain markup then it is very
difficult to validate and encoding is also very difficult as it would break all
the tags. There is then a need for a sanitizer library that can parse and clean
HTML formatted text. You can look at :code:`DOMPurify`, its link is provided at
the end.

Rule 7
******

Implement Content Security Policy. It's a browser side mechanism that allows you to create
source whitelist for client side resources like javascript, images, etc. CSP via special
HTTP headers instruct the browser to only execute or render resources from these source.

.. code::

    Content-Security-Policy: default-src: 'self'; script-src: 'self' static.domain.tld

This header tells the browser to only load resources from the source page and additionally 
javascript files from :code:`static.domain.tld`


Useful Links
------------

XSS cheatsheets
***************

https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.md

https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.md

https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet

Content Security Policy
***********************

https://content-security-policy.com/

Browser Side sanitizer
**********************

https://github.com/cure53/DOMPurify

Puzzles and Challenges
**********************

https://github.com/cure53/XSSChallengeWiki/wiki
