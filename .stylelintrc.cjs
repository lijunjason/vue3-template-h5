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
  rules: {
    'selector-class-pattern': null,
    'no-duplicate-selectors': null,
    'no-duplicate-selectors': null,
    'no-duplicate-selectors': null,
    'scss/dollar-variable-pattern': null,
    'media-feature-name-no-unknown': null,
  },
};
