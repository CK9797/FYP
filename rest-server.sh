#!/bin/bash

# card
export COMPOSER_CARD=admin@crmblockchain

# namespace
export COMPOSER_NAMESPACES=always

# authentication
export COMPOSER_AUTHENTICATION=true

# strategy
export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "df54d7cae7784732fa59",
    "clientSecret": "e2ead002b570baeb8f5b7e8daf8e2b8be6383307",
    "authPath": "/auth",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "http://localhost:4200/explorer",
    "failureRedirect": "/"
  }
}'

# multiuser
export COMPOSER_MULTIUSER=true

# datasource
export COMPOSER_DATASOURCES='{
  "db" : 
    {
      "name":"db",
      "host":"cluster0.gcuzu.mongodb.net",
     "database":"restauth",
      "protocol":"mongodb+srv",
      "user":"chihkiong",
      "password":"3r4lztB8PHZlnpPh",
      "connector":"mongodb"
    }
}'




# execute the rest server
composer-rest-server
