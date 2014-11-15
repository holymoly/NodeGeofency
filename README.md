NodeGeofency
============

Node based backend for putting Geofency Data on Couchdb

Install (on raspberry pi)
-------

Install Nodejs

```
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
```

Install Git and clone the repository

```
sudo apt-get install git
git clone https://github.com/holymoly/NodeGeofency/tree/master
cd NodeGeofency
npm install
```

Install Couchdb
```
http://bell-dev.blogspot.de/2012/12/installing-couchdb-on-raspberry-pi.html
```

Create Geofency Database

In your Browser open 
```
http://pi_IP:5984/_utils.
```
Create a Database called geofency. You should also add a user and password for your Account.

In your local Git repo open config.js and change the config.couchUrl to the IP/Domain of your couchdb Server (IP of raspberry pi) and set the user and password.

You can start the application with 
```
node server.js
```

In your IOS geofency app goto Webhooks set POST Format to Default, enter your Username and Password and set the Urls to 
```
http://pi_IP:8765/time
```
If you test the Webhooks you should see
```
{ device: '1234-1234-1234-1234-1234',
  radius: 500,
  longitude: 42.23,
  id: '4321-4321-4321-4321-4321',
  date: '2014-11-09T17:32:34Z',
  latitude: 23.42,
  entry: '0',
  name: 'Hollywood' }
```
