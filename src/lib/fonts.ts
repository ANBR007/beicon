import localFont from "next/font/local";

// Fonte da marca (Neue Montreal). Carrega os pesos usados no site a partir dos arquivos
// locais em src/assets/fonts. `variable` cria a CSS variable --font-neue-montreal, usada
// em globals.css para aplicar a fonte no body inteiro.
export const neueMontreal = localFont({
  src: [
    { path: "../assets/fonts/NeueMontreal-Light.otf", weight: "300", style: "normal" },
    { path: "../assets/fonts/NeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "../assets/fonts/NeueMontreal-Italic.otf", weight: "400", style: "italic" },
    { path: "../assets/fonts/NeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "../assets/fonts/NeueMontreal-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});
