# React Go

Simple React boilerplate to start you up.
Includes redux, redux-thunk, react-router, simple express server to serve project and build config for dev and prod.

## Installation

```sh
npm install
```

## Scripts

To run project in dev env with webpack-dev-server and source maps, run:
```sh
npm run dev
```

To run project in prod env with express server and minification of resources, run:
```sh
npm start
```

## Redux ajax adapter
Simple function that wraps axios API calls and takes action creators to dispatch on call request, success or error.
This can be extended with custom auth stuff, like headers, so you don't have to specify them with every API call you make.


