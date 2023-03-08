# 📦 webpack Boilerplate

Кофигурация webpack 5 с Babel, PostCSS, Sass, React и Vue.

## Установка

Клонировать репозиторий и прописать команду npm install.

```bash
npm i
```

## Использование

### Dev сервер, файлы храняться в памяти

```bash
npm run dev
```

Увидеть сервер можно по адресу `localhost:8080`.

### Dev сервер, файлы хранятся статично

```bash
npm run source
```

Увидеть сервер можно по адресу `localhost:8080`.

### Создает продакшен билд с хешами

```bash
npm run build
```

### Создает продакшен билд без хешей

```bash
npm run prod
```

### Создает продакшен билд без хешей с оптимизированными картинками

```bash
npm run prod-image
```

### Как поменять путь для assets

**Идем в config/paths.js находим ключ buildAssets, и меняем на нужный**

## Возможности

- [webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Sass](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [React](https://reactjs.org/)
- [Vue](https://vuejs.org/)

## Шаблонизатор для HTML

- [`Nunjucks`](https://mozilla.github.io/nunjucks/templating.html) - документация по шаблонизатору Nunjucks
- [`nunjucks-loader`](https://ogonkov.github.io/nunjucks-loader/) - документация по лоадеру для шаблонизатора под webpack

## Зависимости

### webpack

- [`webpack`](https://github.com/webpack/webpack) - Инструмент сборки.
- [`webpack-cli`](https://github.com/webpack/webpack-cli) - Интерфейс командной строки для webpack
- [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) - Локальный сервер разработки для webpack
- [`webpack-merge`](https://github.com/survivejs/webpack-merge) - Утилита для упрощения работы с конфигурациями
- [`cross-env`](https://github.com/kentcdodds/cross-env) - Кроссплатформенная конфигурация

### Babel

- [`@babel/core`](https://www.npmjs.com/package/@babel/core) - Транспилирует ES6+ код в JavaScript понятный для большиства браузеров
- [`@babel/plugin-proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) - Используйте свойства непосредственно в классе
- [`@babel/plugin-syntax-dynamic-import`](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import) - Динамический импорт на промисах
- [`@babel/plugin-syntax-object-rest-spread`](https://babeljs.io/docs/en/babel-plugin-syntax-object-rest-spread) - Преобразование операторов rest и spread
- [`@babel/plugin-transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime) - Преобразование в режиме разработки
- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) - Минимальный пресет плагинов
- [`@babel/preset-react`](https://babeljs.io/docs/en/babel-preset-react) - Добавляет поддержку файлов .jsx и фреймфорка React

### Loaders

- [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) - Транспилирует файлы с помощью Babel и webpack
- [`sass-loader`](https://webpack.js.org/loaders/sass-loader/) - Обрабатывает SCSS и коомпилирует CSS
  - [`sass`](https://www.npmjs.com/package/sass) - Node Sass
- [`postcss-loader`](https://webpack.js.org/loaders/postcss-loader/) - Обработка CSS с помощью PostCSS
  - [`postcss-preset-env`](https://www.npmjs.com/package/postcss-preset-env) - Пресет по умолчанию для PostCSS
- [`css-loader`](https://webpack.js.org/loaders/css-loader/) - Обработка CSS
- [`style-loader`](https://webpack.js.org/loaders/style-loader/) - Вставляет CSS в DOM дерево (только в режиме development)
- [`vue-loader`](https://github.com/vuejs/vue-loader) - Добавляет поддержку файлов .vue и фреймфорка Vue

### Plugins

- [`clean-webpack-plugin`](https://github.com/johnagan/clean-webpack-plugin) - Очиститка папки сборки
- [`browser-sync-webpack-plugin`](https://github.com/Va1/browser-sync-webpack-plugin) - Возможность просматривать страницу в dev режиме в разных браузерах
- [`copy-webpack-plugin`](https://github.com/webpack-contrib/copy-webpack-plugin) - Копирует статические файлы
- [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin) - Создание файлов HTML из шаблона
- [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) - Извлекает CSS в отдельные файлы
- [`css-minimizer-webpack-plugin`](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/) - Оптимизация и минификации CSS файлов

### Linters

- [`eslint`](https://github.com/eslint/eslint) - Применение styleguide ко всему приложению
- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) - Связывает prettier и eslint
  - - [`prettier`](https://github.com/prettier/prettier) - Форматирование кода `prettier-webpack-plugin`
- [`eslint-import-resolver-webpack`](https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers/webpack) - Throw exceptions for import/export in webpack
