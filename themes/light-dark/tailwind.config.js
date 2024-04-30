/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: 'class',
  content: ["./layouts/**/*.html", "./themes/**/layouts/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"LXGW WenKai Screen"', ...defaultTheme.fontFamily.sans]
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            '> ul > li > input:first-child': {
              marginTop: 0,
            },
            '> ul > li > input:last-child': {
              marginBottom: 0,
            },
            '> ol > li > input:first-child': {
              marginTop: 0,
            },
            '> ol > li > input:last-child': {
              marginBottom: 0,
            },
            '.gist .highlight tbody tr': {
              borderWidth: 0,
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

