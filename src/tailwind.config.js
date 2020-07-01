module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./**/*.vue']
  },
  plugins: [
    // function({ addComponents }) {
    //   addComponents({
    //     '.container': {
    //       maxWidth: '100%',
    //       '@screen sm': {
    //         maxWidth: '600px'
    //       },
    //       '@screen md': {
    //         maxWidth: '700px'
    //       },
    //       '@screen lg': {
    //         maxWidth: '900px'
    //       },
    //       '@screen xl': {
    //         maxWidth: '1100px'
    //       }
    //     }
    //   })
    // }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Noto Sans KR"',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Noto Color Emoji"'
        ]
      },
      colors: {
        'badge-topic': '#bcd952',
        'badge-comment': '#d685ff',
        'badge-like': '#ff694f'
      }
    }
  }
}
