const flowbite = require("flowbite-react/tailwind");
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],

  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width:{
        'inherit': 'inherit'
      },
      height:{
        inherit: 'inherit'
      },
      fontSize:{
        "2xs":"10px"
      }
      ,
      colors: {
        lightBg:"#FAFAFC",
        lightgray:"#D0D6E5",
        lightblue: "#F5F8FE",
        lightcyan: "#ECFCFF",
        lightgreen:"#FAFFF8",
        brightcyan: "#3AD0E6",
        maincolor: "#D76E2D",
        CourseTitle: "#1D2733",
        muted:"#999B9F",
        'soft-blue': '#99A7C7',
        'steel-blue': '#485470',
        frost: '#F5F8FE',
        maingreen:"#39741F",
        secondaryGreen:"#83C982",
        secondarygray:"#7D8CAC",
        alert:"#EE4E4E",
        secondaryLightBg:"#f8f9fb",
        maingray:'#F0F0F0',
        mainred:"#FC4646",

        // dark color
        darkcharcoal: "#26282B",
        darkplum: "#63585E",
        "jet-gray":"#24292B",
       "dark-muted":"#C4BCB1",
      "dark-color1": "#070707",
      "dark-color2": "#252729",
      "dark-color3": "#2C313A",
      "dark-color4": "#363a42",
      "dark-color5": "#393a3c",
        },
        dropShadow: {
          'primary': '0 10px 40px rgba(128, 128, 128,0.12)',
          'secondary': '0 10px 20px rgba(128, 128, 128,0.1)',
        },
        boxShadow: {
          'box-shadow-primary': '0 10px 40px rgba(128, 128, 128,0.12)',
        },
        maxWidth:{
          "8xl":"90rem"
        }
    },
  },
};
export default config;
