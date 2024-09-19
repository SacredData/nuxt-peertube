import { defineNuxtModule, createResolver, addPlugin, addImportsDir } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "nuxt-peertube",
    configKey: "peertube"
  },
  // Default configuration options of the Nuxt module
  defaults: {
    serverUrl: ""
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || { public: {} };
    nuxt.options.runtimeConfig.public.peertube = options;
    addPlugin(resolver.resolve("./runtime/plugin"));
    addImportsDir(resolver.resolve("./runtime/composables"));
  }
});

export { module as default };
