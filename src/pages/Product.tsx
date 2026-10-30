import { Helmet } from "react-helmet-async";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PHero from "@/site/product/PHero";
import PNav from "@/site/product/PNav";
import PMeasure from "@/site/product/PMeasure";
import PTrueSync from "@/site/product/PTrueSync";
import PValue from "@/site/product/PValue";
import PFix from "@/site/product/PFix";
import PProve from "@/site/product/PProve";
import PBrand from "@/site/product/PBrand";
import PWorks from "@/site/product/PWorks";
import Close from "@/site/home/Close";
import { useReveal } from "@/site/kit";
import "@/site/site.css";
import "@/site/v3.css";
import "@/site/product.css";
import "@/site/product3.css";
import "@/site/v4.css";
import "@/site/product4.css";
import "@/site/v6.css";
import "@/site/v7.css";
import "@/site/v8.css";

/* Product v3. One product in five chapters (Measure, TrueSync, Value, Fix, Prove), each a working
   piece of the console on the Petco demo workspace, then brand content, coverage and the audit request.
   Copy from the locked deck (Oct 25, 2026). */
export default function Product() {
  useReveal();
  return (
    <>
      <Helmet>
        <title>The platform for winning AI recommendations | Parleo</title>
        <meta name="description" content="See how AI agents describe you, fix what they get wrong, and put your best offers in every answer. Share of Algorithm, TrueSync, the value layer, funded offers and a weekly readout in dollars." />
        <link rel="canonical" href="https://parleo.io/product" />
      </Helmet>
      <Nav />
      <main>
        <PHero />
        <PNav />
        <PMeasure />
        <PTrueSync />
        <PValue />
        <PFix />
        <PBrand />
        <PProve />
        <PWorks />
        <Close source="product-close" />
      </main>
      <Footer />
    </>
  );
}
