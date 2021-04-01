const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.sass$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};
