# ⚽Flexing My Goals⚽

[![.github/workflows/ci.yml](https://github.com/manuelarte/flexingmygoals/actions/workflows/ci.yml/badge.svg)](https://github.com/manuelarte/flexingmygoals/actions/workflows/ci.yml)
[![PR checks](https://github.com/manuelarte/flexingmygoals/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/manuelarte/flexingmygoals/actions/workflows/pr-checks.yml)

Welcome to **Flexing My Goals**, a web application to recreate your goals using a board like a football field.
The technologies used to build this web app are:

- [VueJS][vuejs]
- [Vuetify][vuetify]

## ⬇️ Starting the Development Server

The app is built using [pnpm](https://pnpm.io/).
Before let's see the environment variables needed to run locally:

```environment
VITE_APP_TITLE="Flexing My App"
VITE_BACKEND_BASE_URL=""
VITE_BACKEND_MOCK_API=true
```

Run the following commands to start the application:

```bash
pnpm install
pnpm dev
```

After completing the commands, the application is running at [localhost:3000](http://localhost:3000).

For the development of the app, we are using [husky][husky] pre-commit hooks. Remember to install them by:

```bash
pnpm exec husky init
```

```text
> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.
```

### Building for Production

To build your project for production, use:

```bash
pnpm build
```

Once the build process is completed, your application will be ready for deployment in a production environment.

## 🚀 Features

Here is a list of all the available features:

- Replay action in board.

[husky]: https://typicode.github.io/husky/
[vuejs]: https://vuejs.org
[vuetify]: https://vuetifyjs.com
