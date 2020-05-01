## Install typescript

    npm install -g typescript ts-node

## Boilerplate setup

    mkdir fetchjson
    cd fetchjson
    npm init -y
    npm install axios

## Procedure

    - Compile: tsc index.ts
      It generates javascript file (index.js)
    - Run: node index.js
      OR
    - ts-node index.ts (does both compile and run)

## Parcel Bundler

    It is a tool to help us run Typescript in browser. It looks for a
    'script' tag in indexe.html file that points to a .ts file.
    Parcel Bundler then converts it into a .js file and renders it to the browser.
    mkdir maps (inside typescript dir)
    cd maps
    Install: npm install -g parcel-bundler
    Run: parcel index.html

## Faker

    Faker library is used to generate fake names, locations etc.
    npm install faker
    npm install @types/faker

## Google Maps support

    - Generate a Google Dev Project at
      http://console.developers.google.com/
    - Enable Google Maps support inside project
      API & Services -> Library -> Maps Javascript API
    - Generate an API key
      API & Services -> Credentials -> API key
      Add the key to a script tag in index.html
      [ https://maps.googleapis.com/maps/api/js?key={key} ]
    - Integration with Typescript
      npm install @types/googlemaps

## Run app

    parcel index.html
