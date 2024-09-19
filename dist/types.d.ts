
import type { ModuleOptions } from './module'


declare module '@nuxt/schema' {
  interface NuxtConfig { ['peertube']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['peertube']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['peertube']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['peertube']?: ModuleOptions }
}


export type { ModuleOptions, default } from './module'
