module.exports = {
	lintOnSave: false,
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "@/assets/css/style.scss";`,
			},
		},
	},
};
