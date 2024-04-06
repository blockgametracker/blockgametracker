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
                darkFill: "#0f0f11",
                darkOverlay: "#202024",
                mainColor: "#35f03f",
                secondColor: "#2d7130",
                mainText: "#dadada",
                secondText: "#7e7e7e",
            },
            maxWidth: {
                header: "1100px",
                content: "2600px",
            },
            fontFamily: {
                manrope: ['"Manrope"'],
                "bebas-neue": ['"Bebas Neue"'],
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
