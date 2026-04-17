JET HOST CLEAN DEPLOY PACKAGE
=============================

This ZIP is ready to upload to your Node.js application root.

CONTENTS
--------
- server.js
- package.json
- public/
- README.txt

JETHOST / CPANEL SETTINGS
-------------------------
Application root: the folder where you extract this ZIP
Startup file:     server.js
Mode:             Production
Node version:     18.x or newer

THEN
----
1. Upload the ZIP
2. Extract it into the application root
3. In Node.js Selector, click Run NPM Install
4. Click Restart

CHECKS
------
- / should show the React app
- /api/health should return JSON
- /api/env should return JSON

IF YOU STILL SEE "IT WORKS!"
-----------------------------
Your Node app is still pointing to an old folder, or server.js was not replaced.
