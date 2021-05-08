import { uglify } from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript'
import { name,  dependencies } from './package.json'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

const externalData = []
for (const key in dependencies) {
  if (dependencies.hasOwnProperty.call(dependencies, key)) {
    externalData.push(key)
  }
}

import commonjs from '@rollup/plugin-commonjs';

const isProduction = process.env.NODE_ENV === 'production'

const Plugins = isProduction ? [uglify()] : []

export default {
  input: './src/index.ts',
  output: {
    file: `./bin/${name}.js`,
    banner: '#!/usr/bin/env node',
    format: 'cjs',
  },
  watch: {
    include: 'src/**'
  },
  external: ['fs', 'path','module', 'events', 'rollup', 'assert', 'os', 'util', ...externalData],
  plugins: [
    json(),
    nodeResolve(),
    typescript(),
    commonjs({
      include: 'node_modules/**'
    }),
    ...Plugins,
  ]
}
