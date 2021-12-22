import { App, DirectiveBinding } from "vue";

export interface ICustomCSS {
  install(app: App): void;
}

export const customCSS: ICustomCSS = {
  install: (app) => {
    app.directive(
      "custom-css",
      (el: HTMLElement, binding: DirectiveBinding<Record<string, string>>) => {
        for (let [k, v] of Object.entries(binding.value)) {
          el.style.setProperty(`--${k}`, v);
        }
      }
    );
  },
};
