import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: [
    {
      builder: 'mkdist',
      input: './src',

      pattern: ['**/*'],
    },
    {
      builder: 'mkdist',
      input: './src',
      loaders: ['vue'],
      pattern: ['**/*.vue'],
    },
<<<<<<< HEAD
    // {
    //   builder: 'mkdist',
    //   format: 'cjs',
    //   input: './src',
    //   loaders: ['js'],
    //   pattern: ['**/*.ts'],
    // },
=======
>>>>>>> target
    {
      builder: 'mkdist',
      format: 'esm',
      input: './src',
      loaders: ['js'],
      pattern: ['**/*.ts'],
    },
  ],
});
