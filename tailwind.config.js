module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.js']
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '600px'
          },
          '@screen md': {
            maxWidth: '700px'
          },
          '@screen lg': {
            maxWidth: '900px'
          },
          '@screen xl': {
            maxWidth: '1100px'
          }
        }
      })
    }
  ]
}
