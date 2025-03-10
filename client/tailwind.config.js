/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./views/**/*.ejs", // Quét tất cả file EJS trong thư mục views
      "./public/**/*.js",  // Nếu có JS custom trong thư mục public
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
          heading: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        },
      },
    },
    plugins: [],
};
  