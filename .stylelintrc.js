module.exports = {
  extends: ['stylelint-config-recess-order'],
  overrides: [
    {
      files: ['.js', '.jsx', '.ts'].flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: 'postcss-styled-syntax',
    },
    {
      files: ['.vue', '.htm', '.html'].flatMap((ext) => [
        `*${ext}`,
        `**/*${ext}`,
      ]),
      customSyntax: 'postcss-html',
    },
    {
      files: ['.md', '.markdown'].flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: 'postcss-markdown',
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
}
