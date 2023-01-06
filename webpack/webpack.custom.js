const webpack = require('webpack');
const { hashElement } = require('folder-hash');
const path = require('path');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const { merge } = require('webpack-merge');

const environment = require('./environment');

module.exports = async (config, options, targetOptions) => {
  const languagesHash = await hashElement(path.resolve(__dirname, '../src/main/webapp/assets/i18n'), {
    algo: 'md5',
    encoding: 'hex',
    files: { include: ['*.json'] }
  });

  // TODO - All the below custom variables needs to be tied back to the build scripts
  // see jhipster implementation
  config.plugins.push(
    new webpack.DefinePlugin({
      I18N_HASH: JSON.stringify(languagesHash.hash),
      // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
      __VERSION__: JSON.stringify(environment.__VERSION__),
      __DEBUG_INFO_ENABLED__: environment.__DEBUG_INFO_ENABLED__ || config.mode === 'development',
      // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
      // If this URL is left empty (""), then it will be relative to the current context.
      // If you use an API server, in `prod` mode, you will need to enable CORS
      // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
      SERVER_API_URL: JSON.stringify(environment.SERVER_API_URL)
    }),
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          { pattern: './src/main/webapp/i18n/en/*.json', fileName: './i18n/en.json' }
          // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
        ]
      }
    })
  );

  config = merge(
    config
    // jhipster-needle-add-webpack-config - JHipster will add custom config
  );

  return config;
};
