Cross-Site Scripting
====================

.. toctree::
   :maxdepth: 2
   :caption: Contents:


XSS is a vulnerability where a user of an application can send malicious code
in the form of a browser side script to some other user of the same
application. Flaws that allows these attacks to occur happens whenever a web
application uses data taken from users in any way without first validating or
encoding it.

It can be broken down into 3 categories.

Reflected XSS
-------------

Reflected XSS is an attack in which injected script is reflected off the web
server in the form of a response to the target user. The XSS exploit is
provided through a url parameter. Example:

.. code:: html

    https://site.com?data=<script>...</script>

If the app is vulnerable it might insert the script in the dom. The script
needs to be constructed differently on the basis of where it gets injected.

One of the deficiencies of Reflected XSS is that it is easily detected by the
browser and that the user needs to access the vulnerable page from an
attacker controlled resource since for the attack to occur data parameter
needs to be supplied.

Stored XSS
----------

In Stored XSS the injected script is stored permanently on the servers of the
applications, the exploit is then provided through the website itself.

It can happen if a malicious user is able to inject the exploit into the database
of the website which is then served to other users. This is not easily detected by the
browser.

A classical example of this is using a img tag as a XSS vector. Say a message
board exists to which users of a website can post messages to, now if the
website doesn't sanitize the content either on client side or server side
then we can inject an exploit in such a manner:

.. code:: html

    <img src=x onerror="__malicious_code__">


DOM XSS
-------

While the server may prevent XSS from its side, it's possible that the client
side JS scripts may *accidentally* take a payload and insert it into the DOM
and cause the payload to trigger.

That is, the response from the server doesn't change but the client side code
executes differently due to some malicious modifications that may have been
made to the DOM environment.
