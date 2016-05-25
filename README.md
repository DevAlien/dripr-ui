# Dripr UI
https://dripr.io
Dripr is a screenshot/file sharing platform, similar to cloudapp.
This is a universal (isomorphic) web application usign some cool features.

## What's under the hood?
Basically a React app which connects to some APIs (node.js). When a file is uploaded it gets stored in Amazon AWS s3, then there's some Amazon AWS Lambda running to do some tasks, like resizing an image for example. In front of s3 there is cloudfront (cdn).

There's also a desktop app where you can see your uploaded files and take screenshots which will be directly uploaded.

## Features
- Upload Images
- Upload Videos
- Upload Code (Paste)
- Upload a Link, a redirect will be made, so you can keep track of the visits
- Upload text, text will be displayed in a nice way
- Login (via facebook) to store everything you upload

## We used

- [React]
- [Redux]
- [React Router]
- [Babel]
- [Webpack]

## Usage

** Copy configuration files **

Copy /config/default.json to /config/development.json. Change it with the desired values

**Start the development server**

The server will run on [localhost:4000](http://localhost:4000).

``` bash
$ npm run dev
```

**Build source files**

Compiles JavaScript files with JavaScript and extracts CSS files from JavaScript.

``` bash
$ npm run build
```

**Start the production server**

``` bash
$ npm start
```

**Run ESLint**

``` bash
$ npm run eslint
```

**Run JSCS**

``` bash
$ npm run jscs
```

## License

MIT

[React]: http://facebook.github.io/react/
[Redux]: https://github.com/gaearon/redux
[React Router]: http://rackt.github.io/react-router
[Babel]: https://babeljs.io/
[Webpack]: http://webpack.github.io/
