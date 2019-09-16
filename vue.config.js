module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/global/scss/_colors.scss";
            `
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}