import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        scrub: {
          mist: "#f2f2f2",
          taupe: "#c8b9b9",
          graphite: "#858585",
          ink: "#272727",
          panel: "#ffffff"
        }
      },
      boxShadow: {
        premium: "0 18px 60px rgba(39, 39, 39, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;

