module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend:{
            colors: {
                white: "#FFFFFF",
                black: "#000000",

                "neutral": {
                    200: "#E5E5E5",
                    300: "#D4D4D4",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                },

                "green": {
                    50: "#F7FDFA",
                    100: "#EFFBF6",
                    200: "#DBF6EB",
                    300: "#CAF1E2",
                    400: "#B6ECD6",
                    500: "#9FE6CA",
                    600: "#69D8AC",
                    700: "#51B68D", //Verde utilizado no figma
                },

                "blue": "#445BE6",
            },
            fontFamily: {
                inter: ['Inter_400Regular', 'sans-serif'],
                'inter-bold': ['Inter_700Bold', 'sans-serif'],
                poppins: ['Poppins_400Regular', 'sans-serif'],
                'poppins-semibold': ['Poppins_600SemiBold', 'sans-serif'],
              },
        }
    },
    plugins: [],
};

