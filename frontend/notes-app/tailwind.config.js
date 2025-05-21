/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Ensure correct paths
    theme: {
      extend: {
        // Colors used in this project
        colors: {
          primary: "#2b85FF",
          secondary: "#EF863E"
        }
      },
    },
    plugins: [],
  };

  // this is not a file created by the setup I created it so that the intellisense can 
  // work I'll delete it after the project completion