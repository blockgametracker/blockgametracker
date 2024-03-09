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
                darkFill: "#131316",
                darkOverlay: "#202024",
                mainColor: "#35f03f",
                mainText: "#dadada",
                secondText: "#7e7e7e",
            },
            maxWidth: {
                content: "2200px",
            },
            fontFamily: {
                manrope: ['"Manrope"'],
                "bebas-neue": ['"Bebas Neue"'],
            },
        },
    },
    plugins: [],
}
export default config
