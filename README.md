
# Badges

[![Build Status](https://travis-ci.org/Veraclins/New-Maintenance-Tracker.svg?branch=develop)](https://travis-ci.org/Veraclins/New-Maintenance-Tracker) [![Coverage Status](https://coveralls.io/repos/github/Veraclins/New-Maintenance-Tracker/badge.svg?branch=develop)](https://coveralls.io/github/Veraclins/New-Maintenance-Tracker?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/3185baf2767d48b4f0b3/maintainability)](https://codeclimate.com/github/Veraclins/New-Maintenance-Tracker/maintainability)

# Introduction

Maintenance tracker is an app that makes managing of repair/maintenance operations very easy and seamless.

With a very intuitive frontend and a robust nodejs API, all that is required, is for the users to register an account [here](https://veraclins-frontend.herokuapp.com/) and create requests as well as manage their requests.

## API

The API is also available [here](https://veraclins-m-tracker.herokuapp.com/api/v1)

To run the app locally, clone the repository, cd into New-Maintenance-Tracker and install the packages with:
`npm install`.

You can run the API server with `npm run dev` (runs the API with hot reloading on file changes) or `npm run start` (no reloading). The API runs on PORT 3000 by default but you can run it on any port you want by creating a .env file at the root of the APi and adding the preferred port number. For example, putting PORT=5000 will make the API run on port 5000.

## API Docs

The API docs is available [here](https://veraclins-m-tracker.herokuapp.com/api-docs)

## Frontend

The frontend uses a minimal express server to serve the frontend pages. To keep it simple it is available only on the frontend branch of the repository. To run it locally, first checkout into that branch `git checkout frontend`