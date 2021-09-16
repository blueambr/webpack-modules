# Webpack Modules v.2.0.0

> "webpack": "^5.52.1"

### Content

- **[How to launch](#how-to-launch)**
- **[What is this?](#what-is-this)**
- **[Out of the box](#out-of-the-box)**
- **[Pre-commit](#pre-commit)**
- **[Differences between `dev` and `prod`](#differences-between-dev-and-prod)**
- **[How to modify](#how-to-modify)**
- **[Storybook, huh?](#storybook-huh)**
- **[Dependencies](#dependencies)**
- **[License](#license)**

## How to launch:

1. `git clone`
2. `git remote set-url origin https://github.com/USERNAME/REPOSITORY.git` to update the origin remote with your own repository / `git remote rm origin` to remove the origin remote
3. `npm i`
4. `npm start` / `npm run dev` to run a regular webpack environment; `npm run sb` to run _Storybook_
5. Navigate to http://localhost:3000/ or to http://localhost:4000/, if you run _Storybook_
6. `npm run build` to create `dist` for production; `npm run build:sb` to create a _Storybook_ build

P.S. Don't forget to remove extra info like keywords, repository, packages you won't be using etc. from `package.json`.

## What is this?

_Webpack Modules_ or _WM_ is an easy and robust webpack config to handle anything you can imagine, using the best practices. Now with optional _Storybook_.

It was created as a clean, versatile, modern and "fresh" frontend environment. You and only you are in control of which techonologies to use here and how, however, _WM_ provides an initial setup, which will be described further.

If you work with JS frameworks like React, Next.js, Vue.js etc., consider using their dedicated environments, provided by their developers.

I extended such environment for Next.js with a few useful things, while using and updating the original dependencies. You can find it here:

- [create-next-app-extended](https://github.com/hotepp/create-next-app-extended)

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

  Responsible for providing content and JS code to webpack. These files represent pages.

  They should have the same name as the templates of the pages in `src/pages`, e.g., `contact.pug` in `src/pages` and `contact.js` in `src/entries`.

  If you want to use the same JS file for different pages, you have to use paired names in `src/pages`, e.g., `contact+about.pug` means that "Contact" page will be using `about.js` file, which was originally created for "About" page.

- **TypeScript support**

  If you see a JS file, it can be a TS file. Yes, that simple.

  Make sure to set up a `tsconfig.json` to your liking.

- **Pug template engine**

  Used in `src/components` and `src/pages`.

  Responsible for rendering HTML content and creating pages.

  It can require JSON files to use their data inside of its templates. It is the main usage concept in _Webpack Modules_. We use `data/index.json` inside of a component to provide content and automatically generated Sass/SCSS modules inside `styles/index.json` to render the right CSS classnames.

  [Here](https://pugjs.org/language/attributes.html) you may find out more about Pug.

- **Sass/SCSS and PostCSS**

  Used in `src/components` and `src/styles`. PostCSS has a dedicated config file: `postcss.config.js`.

  Responsible for adding included (in `src/entries` JS files), optimized and processed styles to a page.

  Features used: Autoprefixer, Sass/SCSS modules.

  Features work automatically. Autoprefixer uses `.browserslistrc`. For Sass/SCSS modules dedicated `index.json` files are created inside of the components' `styles` folders, which you then need to use inside of the components' Pug templates. If you want some of the classnames to stay global, you can use `:global` flag in a stylesheet, e.g., `:global .container { display: flex; }` or you can put a stylesheet inside the `src/styles/global` folder and/or import it inside `src/styles/global/index.scss`. You can control, which Sass/SCSS files webpack is using inside `src/entries` JS files.

  - [More about Sass/SCSS](https://sass-lang.com/)
  - [More about PostCSS](https://postcss.org/)

- **Bulma and base/global styles**

  Used in `src/styles`.

  Responsible for resetting browser styles, providing functions, variables, mixins and other helpers for flexible, yet generic, layout creation.

  Bulma modules used: Container, Columns, Section.

  You can go through all files inside `src/styles` to have an idea of what they are and what they for. You can control, which Sass/SCSS files webpack is using inside `src/entries` JS files.

  - [More about Bulma](https://bulma.io/)

- **Separated CSS files for every page**

  Every JS file in `src/entries` represents a different page. Include needed styles in each one of these files and webpack will create different CSS stylesheets for every page automatically.

- **Assets**

  Used in `src/components` and `src/assets`.

  You should have your assets scoped inside a module, however, there are some cases, where it is not possible. In these cases you should make use of `src/assets` folder.

  Use `require()` in Pug to import scoped assets and where it is not possible — use a regular string, while having needed assets inside `src/assets` directory.

  Sass/SCSS has no problems with either scoped or global assets.

- **WebP**

  PNG and JPG/JPEG images are automatically converted into WebP format on `npm run build`.

  File extension does not change, so you will see regular `.png`, `.jpg`, `.jpeg` in `dist` folder, which, in fact, will be `.webp`.

  It can be disabled and switched to a regular image minification in `webpack.prod.js`.

- **SVG sprites**

  Automatically generated from the files in `src/assets/icons` and stored in `src/assets/images`.

  A CLI tool is responsible for it, which is configured in `package.json` `sprite` script. It can be run manually with `npm run sprite` command or automatically, every time you run any other script.

- **Storybook (🆕 in 2.0.0)**

  The best UI non-framework is here! Integrated and configured, while still being optional and flexible just as you always wanted. All the info you need is located [right here](https://storybook.js.org/). And [here](#storybook-huh) is what you need to know about _Storybook_ in Webpack Modules.

  `npm run sb` to run it.

  `npm run build:sb` to build it.

## Pre-commit

_Webpack Modules_ has a pre-commit feature, based on [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged). It looks like this:

**lint-staged** in `package.json`:

```
"lint-staged": {
  "src/**/*.{css,sass,scss}": [
    "pretty-quick --pattern './src/**/*.{css,sass,scss}'",
    "stylelint './src/**/*.{css,sass,scss}' --fix"
  ],
  "src/**/*.{js,jsx}": [
    "pretty-quick --pattern './src/**/*.{js,jsx}'",
    "eslint './src/**/*.{js,jsx}' --fix"
  ],
  "src/**/*.pug": [
    "pretty-quick --pattern './src/**/*.pug'"
  ]
}
```

**pre-commit** in `.husky/pre-commit`:

```
npm run lint
```

And it can be configured in any preferrable way. Enjoy!

## Differences between `dev` and `prod`

### `dev`

- Automatically cleans `dist` folder. Does not move it to the trash
- Uses `webpack-dev-server` = Hosts a server and watches for changes
- Webpack optimization features disabled
- Runs ESLint and Stylelint webpack plugins
- JS source maps are inlined. No source maps for CSS
- Does not minimize or optimize JS and CSS
- Does not minimize or optimize images, including SVG sprites or any other SVG

### `prod`

- Automatically cleans `dist` folder. Moves it to the trash
- Does not use any server = Runs one time and stops
- Webpack optimization features enabled
- Does not run ESLint and Stylelint webpack plugins
- JS and CSS source maps have separated files
- Minimizes and optimizes JS and CSS
- Minimizes and optimizes all images, including SVG sprites or any other SVG. By default converts all PNG and JPG/JPEG images into WebP format without changing their extensions. Can be disabled and switched to a regular image minification in `webpack.prod.js`
- Splits JS into functional, optimized and cached pieces, using `cacheGroups`
- Creates a Service Worker

## How to modify

In order to be able to understand and modify webpack config files, you have to be acquainted with webpack principles. You can do it by accessing ["Guides"](https://webpack.js.org/guides/) or ["Configuration"](https://webpack.js.org/configuration/) sections of webpack documentation.

To change loaders, plugins or their options you have to search for their analogues or documentation on the internet. _Webpack Modules_ does not use any custom logic (only a few helper functions) in webpack config, so you should be able to easily change it to your needs, having option to completely override the whole functionality and concept.

## Storybook, huh?

Yes, _Storybook_! In order to make it work I had to rack my brain a bit, but the result was definitely worth it. What we have is two almost absolutely separated environments being Webpack Modules with its webpack configs and _Storybook_ with its webpack configs (hidden in its packages, but available through its config files in the `.storybook` folder). The reason we need two of them is that _Storybook_ never was about **building** websites, it is about **showing** them, while Webpack Modules being able to **show** websites is everything about **building** them.

In order to deliver the best experience possible to our clients and to our non-frontend colleagues we have to make an effort to help them feel welcomed and _Storybook_ does exactly that.

To make it work with _WM_ I made use of the [storypug](https://storybook.js.org/addons/storypug) addon. While being quite simple, it is powerful and is the base of this integration, so make sure to check out how to work with it.

For the presentation purposes I've extended the basic page/components example. Now we also have the `04-pages` folder in `components`. This folder exists exclusively for _Storybook_. This way we have a place to display components inside pages. To check out how to work with _WM_ and _Storybook_ together you can and should browse the example components I've created. You can run _WM_ instance and _Storybook_ instance simultaneously to test the things out. I have also added [Swiper](https://swiperjs.com/) with the `slider` component to show a way to work with packages and dependencies.

Have in mind, that the way I work with _Storybook_ and _WM_ in the example is only an example. It is something you can use as a starting point, but I'm sure there is plenty space to make it better and that's what I will be doing in the future. Different projects have different requirements and that's where _WM_ flexibility will come in handy.

You can use either _WM_ or _Storybook_ and even delete one of them, if you want, at all, if you don't need it. Just make sure you know what you are doing and it is exactly what you need 😉

As a final note I want to remind, that it is quite important, nice and useful to have a UI for display purposes, but it is much more important to have a working environment, which gets things done. And it is exactly the purpose of this integration, so while working on the website, don't forget to deliver some stories with it and while working on stories, don't forget, that the website won't build itself.

## Dependencies

```
"devDependencies": {
  "@babel/core": "^7.15.5",
  "@prettier/plugin-pug": "^1.16.6",
  "@storybook/addon-actions": "^6.4.0-alpha.34",
  "@storybook/addon-essentials": "^6.4.0-alpha.34",
  "@storybook/addon-links": "^6.4.0-alpha.34",
  "@storybook/builder-webpack5": "^6.4.0-alpha.34",
  "@storybook/html": "^6.4.0-alpha.34",
  "@storybook/manager-webpack5": "^6.4.0-alpha.34",
  "autoprefixer": "^10.3.4",
  "babel-loader": "^8.2.2",
  "css-loader": "^6.2.0",
  "eslint": "^7.32.0",
  "eslint-config-airbnb-base": "^14.2.1",
  "eslint-config-prettier": "^8.3.0",
  "eslint-plugin-import": "^2.24.2",
  "eslint-plugin-prettier": "^4.0.0",
  "eslint-webpack-plugin": "^3.0.1",
  "fs": "^0.0.1-security",
  "html-webpack-plugin": "^5.3.2",
  "husky": "^7.0.2",
  "image-minimizer-webpack-plugin": "^2.2.0",
  "imagemin-gifsicle": "^7.0.0",
  "imagemin-mozjpeg": "^9.0.0",
  "imagemin-pngquant": "^9.0.2",
  "imagemin-svgo": "^9.0.0",
  "imagemin-webp": "^6.0.0",
  "lint-staged": "^11.1.2",
  "mini-css-extract-plugin": "^2.3.0",
  "postcss": "^8.3.6",
  "postcss-loader": "^6.1.1",
  "postcss-modules": "^4.2.2",
  "prettier": "^2.4.0",
  "pretty-quick": "^3.1.1",
  "pug": "^3.0.2",
  "pug-runtime": "^3.0.1",
  "pug3-loader": "^2.4.3",
  "sass": "^1.40.1",
  "sass-loader": "^12.1.0",
  "storypug": "^1.0.0-rc.8",
  "style-loader": "^3.2.1",
  "stylelint": "^13.13.1",
  "stylelint-config-standard": "^22.0.0",
  "stylelint-order": "^4.1.0",
  "stylelint-webpack-plugin": "^3.0.1",
  "svgo": "^2.6.0",
  "svgstore-cli": "^2.0.0",
  "trash-cli": "^4.0.0",
  "ts-loader": "^9.2.5",
  "typescript": "^4.4.3",
  "webpack": "^5.52.1",
  "webpack-cli": "^4.8.0",
  "webpack-dev-server": "^4.2.1",
  "webpack-merge": "^5.8.0",
  "workbox-webpack-plugin": "^6.3.0"
},
"dependencies": {
  "bulma": "^0.9.3",
  "normalize.css": "^8.0.1",
  "swiper": "^7.0.5"
},
```

## License

Copyright © 2021 Vlad Gerasimovich <hotepp@pm.me>

Licensed under the ISC license.
