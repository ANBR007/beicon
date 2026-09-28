import { Hero } from "@/components/Hero";
import { Dores } from "@/components/Dores";
import { Servicos } from "@/components/Servicos";
import { Metodo } from "@/components/Metodo";
import { Sobre } from "@/components/Sobre";
import { Cases } from "@/components/Cases";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";

// Página inicial ("/") — apenas empilha as seções na ordem em que aparecem no site.
// Para mudar a ordem das seções da home, basta reordenar as linhas aqui.
export default function Home() {
  return (
    <main>
      <Hero />
      <Dores />
      <Servicos />
      <Metodo />
      <Sobre />
      <Cases />
      <Contato />
      <Footer />
    </main>
  );
}
