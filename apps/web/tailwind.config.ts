import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                darkBG: "#0b0b0c",
                darkFill: "#0e0e10",
                darkSelected: "#161619",
                darkBorder: "#1c1e23",

                whiteBG: "#f5f7fa",
                whiteFill: "#ffffff",
                whiteSelected: "#e7eaed",
                whiteBorder: "#eaebec",
                whiteMT: "#2b333c",
                whiteST: "#6a6a6b",

                mainColor: "#00e13f",
                mainText: "#fafbff",
                secondText: "#787a7f",
            },
            maxWidth: {
                header: "1100px",
                content: "2600px",
            },
            fontFamily: {
                manrope: ['"Manrope"'],
                "bebas-neue": ['"Bebas Neue"'],
            },
            boxShadow: {
                dropdown: "0 35px 60px -15px rgba(0, 0, 0, 0.6)",
                lightShadow: "0 35px 60px -15px rgba(0, 0, 0, 0.1)",
            },
            screens: {
                phone: "700px",
                tablet: "1300px",
                small: "1600px",
                normal: "1920px",
                big: "2500px",
            },
        },
    },
    plugins: [],
}
export default config
