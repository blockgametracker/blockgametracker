import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: "#0b0b0c",
                darkFill: "#0e0e10",
                darkSelected: "#161619",
                darkOverlay: "#1c1e23",
                mainColor: "#00e13f",
                secondColor: "#16a752",
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
