XSS Prevention
==============

XSS prevention rules
--------------------

Rule 0
******

Don't put **any** untrusted data into your HTML document, unless it is withing one of the
slots defined in rules 1 to 5.

Rule 1
******

HTML Escape before inserting Untrusted data into HTML Element Content. One can
use HTML entity encoding but using hex codes is recommended in the spec to
prevent switching into any execution context such as a script, style, or event
handlers.

Rule 2
******

Attribute Escape before putting untrusted data inside HTML common attributes
like :code:`width`, :code:`name`, :code:`value` etc.  This rule should not be used for attributes
like :code:`src`, :code:`href`, etc.

.. code:: html

    <div attr="...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...">content


Except for alphanumeric characters encode all other characters with
:code:`&#xHH;`. The reason for this being so broad is that developers often
forget to put attribute values in quotes, and quoted characters can only be
escaped with a quoting character whereas for unquoted attributes there are many
ways to escape.

Rule 3
******

Javascript Escape before inserting untrusted data into Javascript data values.
This concerns both scripts and event-handler attributes. The only safe place to 
put this data is inside a quoted data value.

.. code:: html
    
    <script>alert('...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...')</script>     

    <script>x='...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...'</script>

    <div onmouseover="x='...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...'"</div>  

Except for alphanumeric characters escape all others with :code:`\xHH`. **DO NOT** just
escape quote characters like :code:`\"` because the quote characters can be matched by
the HTML parser that runs first.

Rule 4
******

CSS Escape and validate before inserting untrusted data into CSS selector values.

.. code:: html

    <span style="property : ...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...">text</span>

Except for alphanumeric characters, escape all characters with ASCII values
less than 256 with the :code:`\HH` escaping format. DO NOT use any escaping shortcuts
like :code:`\"`.

Even if you Escape all untrusted data, validation has to be done to ensure that the
URLs only start with :code:`http` and not :code:`javascript`. 

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
especially javascript links. URL's should then be encoded based on the context
of display like any other piece of data. For example, user driven URL's in HREF
links should be attribute encoded.

Rule 6
******

If the data from the user is supposed to contain markup then it is very
difficult to validate and encoding is also very difficult as it would break all
the tags. There is then a need for a sanitizer library that can parse and clean
HTML formatted text.

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

https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet

https://content-security-policy.com/


