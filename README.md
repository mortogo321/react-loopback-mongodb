## React - Loopback - MongoDB

The demo of React with Loopbac and MongoDB

### installation
##### loopback
~~~
cd server
yarn or npm install
~~~

##### react
~~~
cd web
yarn npm install
~~~

### run
##### loopback
~~~
cd server
yarn start or node .
~~~

to access api explorer, go to http://localhost:3000/__explorer

##### react-admin
~~~
cd web
yarn start or npm start
~~~

and go to http://localhost:4000  
default user credential

~~~
username: admin
password: password
~~~

you can change port number at `/web/.env` file as
~~~
PORT=3001
~~~

### build
~~~
cd web
yarn build or npm build
~~~

run the command above will build `react` into `/server/client`.