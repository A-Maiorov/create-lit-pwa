# Introduction

This is a simple template for a PWA that uses only native Web Components, with only Google's Lit library to make working with Web Components easier.

- PWA Installable on desktop, tablet and mobile
- Works offline
- Passes all [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/ "Lighthouse overview - Chrome Developers") tests
- TS and JS can be used simultaneously

# Why Lit?

Lit handles smart reactive rendering in a way similar to React, but without the overhead of a Virtual DOM.\
It uses native ES String Literals and variables. Hence the name 'lit'.

```typescript
import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  name = 'Somebody';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
```

The library adds just 5KB to your bundle.\
💡 Learn Lit:

- <https://lit.dev/>
- [Lit for react developers](https://codelabs.developers.google.com/codelabs/lit-2-for-react-devs "Lit for React Developers | Google Codelabs")

# Dev Tools

- Uses **TypeScript** and **ESLint** for static analysis
- Uses **ESBuild** for:
  - TypeScript compilation
  - Bundling
  - Development web server

# VS Code Extensions

It is highly recommended to install following extensions:

- esbenp.prettier-vscode
- runem.lit-plugin
- dbaeumer.vscode-eslint

# Service worker

Lit PWA uses a service worker to implement the following features:

- Installability
- Work offline
- Runtime caching
- Serving index.html in case the server is not available or does not implement "spa behavior"

For day-to-day development, Lit PWA uses a 'Dev' service worker, which is "transparent" in the sense that it doesn't have any caching. Using this worker helps achieve a better development experience.

# NPM scripts

We included 2 options for starting a development server, based on different development scenarios:

### 1: Common frontend development

- 'Hot' browser reloading at every code change
- 'Transparent' development service worker

```shell
npm start
```

### 2: Developing offline features, testing caching, running Lighthouse tests

- Rebuild on change
- No Live reloading
- **Fully functional service worker**

```shell
npm run serve
```

### Build for production:

```shell
npm run build
```

### Run tests:

```shell
npm test
```

### Debug tests: 
```shell
npm run test:debug
```

## Testing

Lit PWA uses `@web/test-runner` for testing. You can read more about it here:

https://open-wc.org/blog/testing-workflow-for-web-components/
https://modern-web.dev/guides/test-runner/getting-started
https://modern-web.dev/guides/test-runner/watch-and-debug/






