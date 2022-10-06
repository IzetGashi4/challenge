/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/src/assets/clouds.jpg')",
        // "footer-texture": "url('/img/footer-texture.png')",
      }),
    },
  },
  plugins: [],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
};
