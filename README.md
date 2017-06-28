# node-auth
A user authentication system using Node.js, Express.js, and Passport ([passportjs.org](http://passportjs.org/))

## MongoDB server startup options
Create directories /data/db and /log in MongoDB path root, then run:

`$ mongod --directoryperdb --dbpath {mongodb-path}/data/db/ --logpath {mongodb-path}/log/mongodb.log --logappend --rest`

e.g. OS X MongoDB path might be /usr/local/opt/mongodb if installed with HomeBrew