# ⚽Flexing My Goals⚽

[![.github/workflows/ci.yml](https://github.com/manuelarte/flexingmygoals/actions/workflows/ci.yml/badge.svg)](https://github.com/manuelarte/flexingmygoals/actions/workflows/ci.yml)

Welcome to **Flexing My Goals**, a web application to recreate your goals using a board like a football field.

## 💿 Install

The app is built using [pnpm](https://pnpm.io/).
Run the following commands to start the application:

```bash
pnpm install
pnpm dev
```

After completing the commands, the application is running at [localhost:3000](http://localhost:3000).

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
pnpm dev
```

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.

### Building for Production

To build your project for production, use:

```bash
pnpm build
```

Once the build process is completed, your application will be ready for deployment in a production environment.
