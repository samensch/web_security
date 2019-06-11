Security in React
=================

Here we look at different vulnerabilities in React that aren't exactly inherent
in the Framework itself but results due to poor Programming Patterns which can
be just as easily corrected.

Currently there is only security details related to XSS.  You can view them by
going to :code:`xss` folder and running :code:`npm start`.

Documentation
-------------

You can either visit https://web-security-react.readthedocs.io/en/latest/ and
see the latest docs.

OR manually generate them by going to :code:`docs` folder
and running :code:`make html` and viewing the docs by opening
:code:`_build/html/index.html`

Contributing
------------

This is the Sample structure in :code:`xss` folder.  

.. code::
    
    ➜ tree -I node_modules
    .
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    └── src
        ├── App.js
        ├── README.rst
        ├── components
        │   └── ComponentName.js
        └── index.js

To contribute create a new :code:`ComponentName.js` file and import it in the
:code:`App.js` file and create an entry for the component in the array
:code:`attacks_arr`.
