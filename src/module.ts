import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  serverUrl: string,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'myModule',
    configKey: 'peertube',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    serverUrl: 'https://gas.tube.sh'
  },
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
