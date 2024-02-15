/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            sm: "600px",
            md: "728px",
            lg: "984px",
            xl: "1240px",
        },
        container: {
            center: true,
            padding: "1rem",
            sm: "600px",
            md: "728px",
            lg: "984px",
            xl: "1240px",
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            margin: {
                fullwidth: "calc(-50vw + 50%) !important",
            },
            fontFamily: {
                poppins: ["var(--font-poppins)"],
            },
        },
    },
    plugins: [require("daisyui"), require("@tailwindcss/typography")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#570df8",

                    secondary: "#f000b8",

                    accent: "#1dcdbc",

                    neutral: "#2b3440",

                    "base-100": "#f4f4f5",

                    info: "#3abff8",

                    success: "#36d399",

                    warning: "#fbbd23",

                    error: "#f87272",
                },
            },
        ],
    },
}
