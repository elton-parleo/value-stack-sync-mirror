import { Helmet } from "react-helmet-async";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/site/Hero";
import Shift from "@/site/home/Shift";
import Finds from "@/site/home/Finds";
import Gap from "@/site/home/Gap";
import Doors from "@/site/home/Doors";
import Platform from "@/site/home/Platform";
import Ladder from "@/site/home/Ladder";
import Close from "@/site/home/Close";
import { useReveal } from "@/site/kit";
import "@/site/site.css";
import "@/site/v3.css";
import "@/site/v4.css";
import "@/site/v6.css";
import "@/site/v7.css";
import "@/site/v8.css";

export default function Home() {
  useReveal();
  return (
    <>
      <Helmet>
        <title>Parleo, the agentic commerce platform for brands and retailers</title>
        <meta name="description" content="Parleo makes sure every AI answer gets your products, prices and promotions right, and shows you what that's worth. Get your free Agentic Value Report." />
        <link rel="canonical" href="https://parleo.io/" />
      </Helmet>
      <Nav heroDark />
      <main>
        <Hero />
        <Shift />
        <Finds />
        <Gap />
        <Ladder />
        <Doors />
        <Platform />
        <Close />
      </main>
      <Footer />
    </>
  );
}
