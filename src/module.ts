import {
  defineNuxtModule,
  addPlugin,
  addImportsDir,
  createResolver,
} from "@nuxt/kit";
import defu from "defu";

// Module options TypeScript interface definition
export interface ModuleOptions {
  serverUrl: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-peertube",
    configKey: "peertube",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    serverUrl: "",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || { public: {} };
    nuxt.options.runtimeConfig.public.peertube = options;
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addImportsDir(resolver.resolve("./runtime/composables"));
    //addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
