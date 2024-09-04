# Web App 3 Plugin: Rocket.Chat

This plugin allows you to integrate Rocket.Chat with Pexip Infinity. You can
define the Rocket.Chat channel to be used in the conference URL. The plugin will
open the Rocket.Chat channel in a new section inside the conference in the Web
App 3.

To enable the feature you have to define the Rocket.Chat URL in the `rid` query
parameter.

Example:
https://pexipdemo.com/webapp3/m/my-vmr?rid=https://open.rocket.chat/channel/general
https://localhost:5173/local-plugin/m/meet.marcoscereijo?rid=https://open.rocket.chat/channel/general

![Conference](./assets/conference.png)

## Configure Pexip Infinity

To use this plugin, you need to configure Pexip Infinity to allow the Web App 3
to access resources from the Rocket.Chat server. If you don't do this, you will
see an error message in the Web App 3 when you try to use the plugin:

```text
Refused to frame 'https://open.rocket.chat/' because it violates the following Content Security Policy directive: "frame-src 'self' https://telemetryservice.firstpartyapps.oaspapps.com/telemetryservice/telemetryproxy.html https://*.microsoft.com https://*.office.com https://cdn.pexip.com/guff/ http://localhost:5173 https://localhost:5173".
```

To configure Pexip Infinity, you need to add the Rocket.Chat server to the list
of allowed domains in the Content Security Policy (CSP) settings. You can do
this by accessing the the Pexip Infinity Management Node and navigating to
`Platform > Global Settings > Security`. In the `Content Security Policy`
section, add the Rocket.Chat server to the `frame-src` directive. For example,
if your Rocket.Chat server is running at `https://open.rocket.chat/`, you would
add `https://open.rocket.chat/` to the `frame-src` directive.

## Configure Rocket.Chat

We need to configure Rocket.Chat to allow the Web App 3 to access the
Rocket.Chat server. If you don't do this, you will see an error message in the
Web App 3 when you try to use the plugin:

```text
Refused to display 'https://open.rocket.chat/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.
```

Lets suppose that your Rocket.Chat server is running at
`https://open.rocket.chat/`:

- Open the general settings (`https://open.rocket.chat/admin/settings/General`)
  in your browser.

- Edit the `Options to X-Frame-Options` field and suppose that the Web App 3 is
  running at `https://localhost:5173`:

  ```text
  ALLOW-FROM https://localhost:5173
  ```

## Run Rocket.Chat in a Docker container

You can run Rocket.Chat in a Docker container for testing. To do this, you need
Docker and Docker Compose installed on your machine. And run the following
command:

```bash
$ docker-compose up
```

Now the Rocket.Chat app will be available at `http://localhost:3000`.

## Run for development

- Install all the dependencies:

```bash
$ npm i
```

- Run the dev environment:

```bash
$ npm start
```

The plugin will be served from https://localhost:5173, but you should access it
thought the Web App 3 URL. You have more information about how to configure your
environment in the
[Developer Portal: Setup guide for plugin developers](https://developer.pexip.com/docs/plugins/webapp-3/setup-guide-for-plugin-developers).

## Build for production

To create a package, you will need to first install all the dependencies:

```bash
$ npm i
```

And now to create the package itself:

```bash
$ npm run build
```

Congrats! Your package is ready and it will be available in the `dist` folder.
The next step is to create a Web App3 branding and copy `dist` into that
branding.

If you want to know more about how to deploy your plugin in Pexip Infinity,
check our [Developer Portal](https://developer.pexip.com).
