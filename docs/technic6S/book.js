module.exports = {
  plugins: ["add-js"],
  pluginsConfig: {
    "add-js": {
      js: ["./assets/home-link.js",
	   "./styles/website.js"
          ]
      }
  },
  styles: {
    website: "styles/website.css"
  }
};

