# Introduction

This is a simple template for a PWA that uses only native Web Components, with only Google's Lit library to make working with Web Components easier.

- PWA Installable on desktop, tablet and mobile
- Works offline
- Passes all [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/ "Lighthouse overview - Chrome Developers") tests
- TS and JS can be used simultaneously

# Why Lit?

Lit handles smart reactive rendering in a way similar to React, but without the overhead of a Virtual DOM.

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

The library adds just 5KB to your bundle.&#x20;

💡 Learn Lit:

- <https://lit.dev/>&#x20;
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

# NPM scripts

### Start development server:

```
npm start
```

### Build for production:

```
npm build
```

<br>
