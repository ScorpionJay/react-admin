# react sample

## Skill

- react
- redux
- react router
- ant design
- fetch
- sass
- webpack
- docker

## Structure

```
├─.babelrc
├─.gitignore
├─build
├─package.json
├─README.md
├─src
│  ├─actions
│  ├─components
│  ├─constants
│  ├─containers
│  ├─reducers
│  ├─store
│  ├─utils
```

## How to run

```
npm install
npm run dev
npm run build
```

## Docker

```
sudo docker-compose up -d
sudo docker-compose down
```

```
sudo docker build -t react:v1 .
sudo docker run --name react react:v2
```

## Components

- table
- upload

## Others

- [Babel](https://babeljs.io)

* [webpack](https://webpack.js.org)

use terser-webpack-plugin to compress js

    Switch back to uglify-js (uglify-es is abandoned, if you need uglify ES6 code please use terser-webpack-plugin).

use ncu to check js version
