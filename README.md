# Webpack Modules v.2.3.1

> "webpack": "^5.72.0"

### Content

- **[How to launch](#how-to-launch)**
- **[What is this?](#what-is-this)**
- **[Out of the box](#out-of-the-box)**
- **[Pre-commit](#pre-commit)**
- **[Conventional Changelog](#conventional-changelog)**
- **[Differences between `dev` and `prod`](#differences-between-dev-and-prod)**
- **[How to modify](#how-to-modify)**
- **[Storybook](#storybook)**
- **[Snippets](#snippets)**
- **[Dependencies](#dependencies)**
- **[License](#license)**

## How to launch:

### Cloning

1. `git clone git@github.com:hotepp/webpack-modules.git webpack-modules`: cloning the repo
2. `cd webpack-modules`: going to the cloned copy of the repo
3. `sudo rm -R .git && sudo rm CHANGELOG.md`: removing everything git-related from the cloned repo; be careful with `sudo`, you only want to delete the `.git` folder with everything inside of it and the `CHANGELOG.md` file, but nothing more
4. `git init`: creating our own git system
5. `git remote add origin https://github.com/USERNAME/REPOSITORY.git`: setting our own repository as the remote origin
6. `git add .`: adding everything to our first git commit
7. `git commit -m "feat(init): project start"`: making our first git commit
8. `npm version minor`: start versioning right away and create the CHANGELOG.md file
9. `git branch -M main`: rename the branch
10. `git push -u origin main`: pushing our first git commit to the `main` branch of our repo

P.S. Don't forget to remove the extra info like keywords, repository, packages you won't be using, reset the version etc. in `package.json`.

### Running

1. `npm i` or `npm i --legacy-peer-deps`, if `npm i` throws errors
2. `npm run dev` / `npm start` to run a regular webpack environment; `npm run sb` to run _Storybook_
3. Navigate to http://localhost:3000/ or to http://localhost:4000/, if you run _Storybook_
4. `npm run build` to create `dist` for production; `npm run build:sb` to create a _Storybook_ build

## What is this?

_Webpack Modules_ or _WM_ is an easy and robust webpack config to handle anything you can imagine, using the best practices. Now with optional _Storybook_.

It was created as a clean, versatile, modern and "fresh" frontend environment. You and only you are in control of which techonologies to use here and how, however, _WM_ provides an initial setup, which will be described further.

If you work with JS frameworks like React, Next.js, Vue.js etc., consider using their dedicated environments, provided by their developers.

I extended such environment for Next.js with a few useful things, while using and updating the original dependencies. You can find it here:

- [Next Story](https://github.com/hotepp/next-story)

## Out of the box

Here what's included in the initial _Webpack Modules_ setup:

- **Separated webpack config files**

  - `webpack.common.js` has configuration, used in both `dev` and `prod` config files
  - `webpack.dev.js` is responsible for development environment
  - `webpack.prod.js` is responsible for production environment

  `npm run dev` and `npm start` run the `dev` config.

  `npm run build` runs the `prod` config.

- **Separated JS files (entries) for every page**

  Stored in `src/entries`.

  Responsible for providing content and JS code to webpack. These files represent pages.

  They should have the same name as the templates of the views in `src/views`, e.g., `contact.pug` in `src/views` and `contact.js` in `src/entries`.

  If you want to use the same JS file for different pages, you have to use paired names in `src/views`, e.g., `contact+about.pug` means that "Contact" page will be using `about.js` file, which was originally created for "About" page.

- **TypeScript support**

  If you see a JS file, it can be a TS file. Yes, that simple.

  Make sure to set up a `tsconfig.json` to your liking.

- **Pug template engine**

  Used in `src/components` and `src/views`.

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

- **Storybook**

  The best UI non-framework is here! Integrated and configured, while still being optional and flexible just as you always wanted. All the info you need is located [right here](https://storybook.js.org/). And [here](#storybook) is what you need to know about _Storybook_ in _Webpack Modules_.

  `npm run sb` to run it.

  `npm run build:sb` to build it.

- **Conventional Changelog**

  Automatically generated `CHANGELOG.md` file using `npm version` script, if [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) approach is being used.

## Pre-commit

_Webpack Modules_ has a pre-commit feature, based on [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged). It looks like this:

**lint-staged** in `package.json`:

```
"lint-staged": {
  "src/**/*.{css,pcss,sass,scss}": [
    "pretty-quick --pattern './src/**/*.{css,sass,scss}'",
    "stylelint './src/**/*.{css,sass,scss}' --fix"
  ],
  "src/**/*.{js,ts,jsx,tsx}": [
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

## Conventional Changelog

I recommend using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) approach for committing your work to Git. If you use it, your commits will be very descriptive and themselves could tell the story of your project to anyone.

On top of this [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli) was built. I included the CLI version of it here, in the `version` npm script. It generates a nice `CHANGELOG.md` for your nice commits.

The recommended commit approach for using this would be:

1. Make changes
2. Commit these changes
3. Run the `npm version [patch|minor|major]` command (more about it [here](https://docs.npmjs.com/cli/v6/commands/npm-version))
4. Push

The `npm version` script will automatically bump the project's version in `package.json` and commit it, together with our newly generated `CHANGELOG.md`.

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

## Storybook

_WM_ has two almost absolutely separated environments being the webpack one with our custom configs and the _Storybook_ one with its configs (hidden in its packages, but available through its config files in the `.storybook` folder). The reason we need two of them is that _Storybook_ never was about **building** websites, it is about **showing** them, while _Webpack Modules_ being able to **show** websites is everything about **building** them.

In order to deliver the best experience possible to our clients and to our non-frontend colleagues we have to make an effort to help them feel welcomed and _Storybook_ does exactly that.

To make it work with _WM_ we made use of the [storypug](https://storybook.js.org/addons/storypug) addon. While being quite simple, it is powerful and is the base of this integration, so make sure to check out how to work with it.

To find out how to work with _WM_ and _Storybook_ together you can and should browse the example components, which are the part of the initial _WM_ setup. You can run _WM_ and _Storybook_ instances simultaneously to test the things out.

Have in mind, that the way the example components are made with _Storybook_ and _WM_ is only an **example**. It is something you can use as a starting point, but there is plenty space to make it better and more suitable for your or your project's needs. Different projects have different requirements and that's where _WM_ flexibility will come in handy.

You can use either _WM_ or _Storybook_ and even delete one of them, if you want, at all, if you don't need it. Just make sure you know what you are doing and it is exactly what you need 😉

As a final note I want to remind, that it is quite important, nice and useful to have a UI for display purposes, but it is much more important to have a working environment, which gets things done. And it is exactly the purpose of this integration, so while working on the website, don't forget to deliver some stories with it and while working on the stories, don't forget, that the website won't build itself.

## Snippets

Make use of snippets in your text editor/IDE.

Here is the info on [how to create custom snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets).

### Element creation

```
"Create a div with a class attribute (WM)": {
  "scope": "jade,pug",
  "prefix": "div",
  "body": ["${2:div}(class=styles.$1)$0"],
  "description": "Create a div with a class attribute (WM)"
}
```

How to use:

1. Type `div`, then press `Tab`
2. Type the needed class, then press `Tab`
3. Switch the `div` tag for any other tag you need, if you need it, then press `Tab`
4. Continue by adding needed attributes, if you need them, or the content for the created element

## Dependencies

```
"devDependencies": {
  "@babel/core": "^7.17.10",
  "@prettier/plugin-pug": "^2.0.0",
  "@storybook/addon-actions": "^6.4.22",
  "@storybook/addon-essentials": "^6.4.22",
  "@storybook/addon-interactions": "^6.4.22",
  "@storybook/addon-links": "^6.4.22",
  "@storybook/builder-webpack5": "^6.4.22",
  "@storybook/html": "^6.4.22",
  "@storybook/manager-webpack5": "^6.4.22",
  "@storybook/testing-library": "^0.0.11",
  "autoprefixer": "^10.4.7",
  "babel-loader": "^8.2.5",
  "conventional-changelog-cli": "^2.2.2",
  "css-loader": "^6.7.1",
  "eslint": "^8.14.0",
  "eslint-config-airbnb-base": "^15.0.0",
  "eslint-config-prettier": "^8.5.0",
  "eslint-plugin-import": "^2.26.0",
  "eslint-plugin-prettier": "^4.0.0",
  "eslint-plugin-storybook": "^0.5.11",
  "eslint-webpack-plugin": "^3.1.1",
  "fs": "^0.0.1-security",
  "html-webpack-plugin": "^5.5.0",
  "husky": "^7.0.4",
  "image-minimizer-webpack-plugin": "^3.2.3",
  "imagemin": "^8.0.1",
  "imagemin-gifsicle": "^7.0.0",
  "imagemin-mozjpeg": "^10.0.0",
  "imagemin-pngquant": "^9.0.2",
  "imagemin-svgo": "^10.0.1",
  "imagemin-webp": "^7.0.0",
  "lint-staged": "^12.4.1",
  "mini-css-extract-plugin": "^2.6.0",
  "postcss": "^8.4.13",
  "postcss-loader": "^6.2.1",
  "postcss-modules": "^4.3.1",
  "prettier": "^2.6.2",
  "pretty-quick": "^3.1.3",
  "pug": "^3.0.2",
  "pug-runtime": "^3.0.1",
  "pug3-loader": "^2.4.3",
  "sass": "^1.51.0",
  "sass-loader": "^12.6.0",
  "storypug": "^1.0.0-rc.8",
  "style-loader": "^3.3.1",
  "stylelint": "^14.8.2",
  "stylelint-config-standard-scss": "^3.0.0",
  "stylelint-order": "^5.0.0",
  "stylelint-webpack-plugin": "^3.2.0",
  "svgo": "^2.8.0",
  "svgstore-cli": "^2.0.1",
  "trash-cli": "^5.0.0",
  "ts-loader": "^9.3.0",
  "typescript": "^4.6.4",
  "webpack": "^5.72.0",
  "webpack-cli": "^4.9.2",
  "webpack-dev-server": "^4.9.0",
  "webpack-merge": "^5.8.0",
  "workbox-webpack-plugin": "^6.5.3"
},
"dependencies": {
  "bulma": "^0.9.3",
  "lazysizes": "^5.3.2",
  "normalize.css": "^8.0.1",
  "swiper": "^8.1.4"
}
```

## License

Copyright © Vlad Gerasimovich <hotepp@pm.me> (Webpack Modules)

Copyright © JS Foundation and other contributors (Webpack)

Copyright © Kadira, Inc. <hello@kadira.io> (Storybook)

Licensed under the ISC license.
