/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:        '#F5F0E8',
        parchment:    '#EDE6D6',
        'warm-white': '#FAF8F4',
        charcoal:     '#2C2825',
        deep:         '#1A1714',
        taupe:        '#B09E8C',
        'rose-dust':  '#C08E9A',
        sage:         '#8A9C8D',
        rust:         '#9B6B52',
        gold:         '#C4A882',
        mid:          '#6B5E54',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"Cormorant Garamond"', 'serif'],
        ui:      ['Epilogue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
