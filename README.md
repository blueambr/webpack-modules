# Webpack Modules v.0.9.1

> "webpack": "^5.26.2"

### Content

**[How to launch](#how-to-launch)**
**[What is this?](#what-is-this)**
**[Out of the box](#out-of-the-box)**
**[How to modify](#how-to-modify)**
**[Dependencies](#dependencies)**
**[License](#license)**

## How to launch:

1. `git clone`
2. `git remote set-url origin https://github.com/USERNAME/REPOSITORY.git` to update the origin remote with your own repository / `git remote rm origin` to remove the origin remote
3. `npm i`
4. `npm start` / `npm run dev`
5. Navigate to http://localhost:3000/
6. `npm run build` to create `dist` for production

P.S. Don't forget to remove extra info like keywords, repository etc. from `package.json`.

## What is this?

_Webpack Modules_ (WM) is an easy and robust webpack config to handle anything you can imagine, using the best practices.

It was created as a clean, versatile, modern and "fresh" frontend environment for any purpose use. You and only you are in control of which techonologies to use here and how, though, WM provides an initial setup, which will be described further.

If you work with JS frameworks like React, Next.js, Vue.js etc., consider using their dedicated environments, provided by their developers.

I extended these environments for React and Next.js with a few useful things, while using and updating the original dependencies. You can find them here:

- [create-react-app-extended](https://github.com/vgerasimovich/create-react-app-extended)
- [create-next-app-extended](https://github.com/vgerasimovich/create-next-app-extended)

## Out of the box

Here what's included in the initial _Webpack Modules_ setup:

- **Separated webpack config files**

  - `webpack.common.js` has configuration, used in both `dev` and `prod` config files
  - `webpack.dev.js` is responsible for development environment
  - `webpack.prod.js` is responsible for production environment

  `npm start` and `npm run dev` run the `dev` config.

  `npm run build` runs the `prod` config.

- **Separated JS files (entries) for every page**

  Stored in `src/entries`.

  Responsible for providing content to webpack and for JS code for particular page.

  They should have the same name as the pages templates in `src/pages`, e.g., `contact.pug` in `src/pages` and `contact.js` in `src/entries`.

  If you want to use the same JS file for different pages, you have to use paired names in `src/pages`, e.g., `contact+about.pug` means that contact page will be using `about.js` file, which was originally created for about page.

- **Pug template engine**

  Used in `src/components` and `src/pages`.

  Responsible for rendering HTML content and creating pages.

  It can require JSON files to use their data inside of its templates. It is the main usage concept in _Webpack Modules_. We use `data/index.json` inside of a component to provide content and automatically generated Sass/SCSS modules inside `styles/index.json` to render the right CSS classnames.

  [Here](https://pugjs.org/language/attributes.html) you may find out more about Pug.

- **Sass/SCSS and PostCSS**

  Used in `src/components` and `src/styles`. PostCSS has a dedicated config file in the root: `postcss.config.js`.

  Responsible for adding needed, optimized and processed styles to a page.

  Features used: Autoprefixer, Sass/SCSS modules.

  Features work automatically. Autoprefixer uses the `.browserslistrc` file in the root. For Sass/SCSS modules dedicated `index.json` files are created inside of the components' `styles` folders, which you then need to use inside of the components' Pug templates. If you want some of the classnames to stay global, you can use `:global` flag in a stylesheet, e.g., `:global .container { display: flex; }` or you can put a stylesheet inside the `src/styles/global` folder and/or import it inside `src/styles/global/index.scss`. You can control, which Sass/SCSS files webpack is using inside the `src/entries` JS files.

  - [More about Sass/SCSS](https://sass-lang.com/)
  - [More about PostCSS](https://postcss.org/)

- **Bulma and base/global styles**

  Used in `src/styles`.

  Responsible for resetting browser styles, providing functions, variables, mixins and other helpers for flexible, yet generic, layout creation.

  Bulma modules used: Container, Columns, Section.

  You can go through all the files inside the `src/styles` to have an idea of what they are and what they for. You can control, which Sass/SCSS files webpack is using inside the `src/entries` JS files.

  - [More about Bulma](https://bulma.io/)

Work in progress.

## How to modify

Work in progress.

## Dependencies

```
"devDependencies": {
  "@prettier/plugin-pug": "^1.13.5",
  "autoprefixer": "^10.2.5",
  "css-loader": "^5.1.3",
  "del": "^6.0.0",
  "eslint": "^7.22.0",
  "eslint-config-airbnb-base": "^14.2.1",
  "eslint-config-prettier": "^8.1.0",
  "eslint-plugin-import": "^2.22.1",
  "eslint-plugin-prettier": "^3.3.1",
  "eslint-webpack-plugin": "^2.5.2",
  "fs": "^0.0.1-security",
  "html-webpack-plugin": "^5.3.1",
  "image-minimizer-webpack-plugin": "^2.2.0",
  "imagemin-gifsicle": "^7.0.0",
  "imagemin-mozjpeg": "^9.0.0",
  "imagemin-pngquant": "^9.0.2",
  "imagemin-svgo": "^9.0.0",
  "mini-css-extract-plugin": "^1.3.9",
  "postcss": "^8.2.8",
  "postcss-loader": "^5.2.0",
  "postcss-modules": "^4.0.0",
  "prettier": "^2.2.1",
  "pug3-loader": "^2.4.3",
  "sass": "^1.32.8",
  "sass-loader": "^11.0.1",
  "stylelint": "^13.12.0",
  "stylelint-config-standard": "^21.0.0",
  "stylelint-order": "^4.1.0",
  "stylelint-webpack-plugin": "^2.1.1",
  "svgo": "^2.2.2",
  "svgstore-cli": "^2.0.0",
  "trash-cli": "^4.0.0",
  "webpack": "^5.26.2",
  "webpack-cli": "^4.5.0",
  "webpack-dev-server": "^3.11.2",
  "webpack-merge": "^5.7.3",
  "workbox-webpack-plugin": "^6.1.2"
},
"dependencies": {
  "bulma": "^0.9.2",
  "normalize.css": "^8.0.1"
}
```

## License

Copyright © 2021 Vlad Gerasimovich <vlad.gerasimovich.micro@outlook.com>

Licensed under the ISC license.
