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
  defaults: {},
  async setup(options, nuxt) {
    console.log(options, "options!!!!");
    const resolver = createResolver(import.meta.url);
    console.log("NUXTOPTIONS", nuxt.options.peertube);
    const runtimeConfig = defu(nuxt.options.runtimeConfig.peertube, options, {
      serverUrl: false,
    });

    nuxt.options.publicRuntimeConfig = defu(nuxt.options.publicRuntimeConfig, {
      serverUrl: nuxt.options.peertube.serverUrl,
    });
    console.log("AGAIN", nuxt.options);
    // Default runtimeConfig
    /*nuxt.options.publicRuntimeConfig.peertube = defu(nuxt.options.publicRuntimeConfig.peertube, {
      serverUrl: options.serverUrl,
    })*/

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
    addImportsDir(resolver.resolve("./runtime/composables"));
  },
});
