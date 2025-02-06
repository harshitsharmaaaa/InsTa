import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          accent: "var(--accent)",
          neutral: "var(--neutral)",
          "base-content": "var(--base-content)",
          info: "var(--info)",
          success: "var(--success)",
          warning: "var(--warning)",
          error: "var(--error)",
        },
      },
    ],
  },
} satisfies Config;
