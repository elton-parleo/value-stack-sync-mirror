import { Helmet } from "react-helmet-async";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Btn, SectionHeading } from "@/components/primitives";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | Parleo</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Nav />
      <main className="section" style={{ paddingTop: 180, minHeight: "70vh" }}>
        <div className="wrap">
          <SectionHeading>That page isn't in the record.</SectionHeading>
          <p className="lede" style={{ marginTop: 20 }}>
            The link may have moved when the site did. The product, the Agentic Value Report and the insights are all one click away.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn to="/" variant="blue" arrow>
              Back to the start
            </Btn>
            <Btn to="/insights" variant="outline">
              Insights
            </Btn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
