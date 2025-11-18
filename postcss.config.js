const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssCombineMediaQuery = require('postcss-combine-media-query');

const config = {
  plugins: [
    autoprefixer(),
    // postcssCombineMediaQuery({
    //   sort: true // 미디어 쿼리 정렬
    // }),
    cssnano({
      preset: ['default', {
        mergeRules: true, // 규칙 병합
        normalizeWhitespace: false, // 공백 최소화 비활성화
        discardComments: false
      }]
    })
  ]
}

module.exports = config;