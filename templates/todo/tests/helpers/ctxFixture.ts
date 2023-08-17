import { ContextProvider, ContextRoot } from "@lit-labs/context";
import { fixture } from "@open-wc/testing";
import { ReactiveElement, TemplateResult, html } from "lit";
import "./containerElement";

export async function ctxFixture(
  tpl: TemplateResult,
  contexts: ITestCtx<unknown>[]
) {
  new ContextRoot().attach(document.documentElement);

  const container = (await fixture(
    html`<test-container> ${tpl} </test-container>`
  )) as ReactiveElement;

  for (const ctx of contexts) addCtxProvider(container, ctx);

  const elUnderTest = container.children[0] as ReactiveElement;
  await elUnderTest.updateComplete;

  return elUnderTest;
}

function addCtxProvider(container: ReactiveElement, ctx: ITestCtx<unknown>) {
  const ctxProv = new ContextProvider(container, {
    context: ctx.ctx,
  });

  ctxProv.setValue(ctx.value);
}

export interface ITestCtx<T> {
  ctx: {
    __context__: T;
  };
  value: T;
}
