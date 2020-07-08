const solid =
  process.env.NODE_ENV === 'development'
    ? true
    : [
        'faSignInAlt',
        'faUserPlus',
        'faHome',
        'faUser',
        'faCommentDots',
        'faQuestionCircle'
      ]

module.exports = solid
