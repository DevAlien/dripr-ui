# Redux example

This is a universal (isomorphic) web application example.

## We used

- [React]
- [Redux]
- [React Router]
- [Babel]
- [ESLint]
- [Webpack]

## Usage

**Start the development server**

The server will run on <localhost:4000>. You can assign other port with `-p` argument. It will also start the Webpack dev server which will run on <localhost:4001>.

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
$ npm eslint
```

## Structure

``` bash
.
├── public
│   └── build       # Built files
├── src
│   ├── actions     # Actions
│   ├── components  # Components
│   ├── constants   # Constants
│   ├── server      # Server files
│   ├── stores      # Stores
│   ├── utils       # Utilities
│   ├── client.js   # Entry file for client
│   └── routes.js   # Route map
└── webpack         # Webpack config
    └── utils
```

## License

MIT

[React]: http://facebook.github.io/react/
[Redux]: https://github.com/gaearon/redux
[React Router]: http://rackt.github.io/react-router
[Babel]: https://babeljs.io/
[ESLint]: http://eslint.org/
[Webpack]: http://webpack.github.io/
[BEM]: https://en.bem.info/