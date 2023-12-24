module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-recommended-scss'],
    },
  ],
};
