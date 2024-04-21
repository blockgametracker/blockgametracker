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
                bg: "#d3d3d3",
                bgfill: "#e0e0e0",
                dark: "#0b0b0c",
                darkFill: "#0f0f11",
                darkOverlay: "#1f1f21",
                mainColor: "#00d653",
                secondColor: "#16a752",
                mainText: "#dadada",
                secondText: "#737373",
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
