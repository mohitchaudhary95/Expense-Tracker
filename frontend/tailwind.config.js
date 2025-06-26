export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    animations: {
      'fade-in-down': {
        from: { opacity: 0, transform: 'translateY(-20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
    },
  },
  plugins: [],
}

