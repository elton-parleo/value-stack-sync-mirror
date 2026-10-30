import { Link } from "react-router-dom";
import { Btn, Wordmark } from "./primitives";
import { openStart } from "./start";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Wordmark size={15} />
            <p>The agentic commerce platform for brands and retailers. Parleo makes sure every AI answer gets your products, prices and promotions right, and shows you what that's worth.</p>
            <div className="footer__ctas">
              <Btn to="/agentic-value-report" variant="blue" size="sm">
                Get your report
              </Btn>
              <Btn onClick={() => openStart()} variant="outline" size="sm">
                Start with your top SKUs
              </Btn>
            </div>
          </div>
          <Col title="Product">
            <Link to="/product#measure">Measure</Link>
            <Link to="/product#truesync">TrueSync</Link>
            <Link to="/product#value">Value</Link>
            <Link to="/product#fix">Fix</Link>
            <Link to="/product#brand">Brand content</Link>
            <Link to="/product#prove">Prove</Link>
            <Link to="/product#works-with">Works with</Link>
          </Col>
          <Col title="Solutions">
            <Link to="/agentic-value-report">Get your report</Link>
            <Link to="/agentic-value-report#samples">Sample reports</Link>
            <Link to="/agentic-value-report#score">Share of Algorithm</Link>
            <Link to="/#brands">For brands</Link>
            <Link to="/#retailers">For retailers</Link>
          </Col>
          <Col title="Insights">
            <Link to="/insights">All insights</Link>
            <Link to="/what-is-agentic-commerce">What is agentic commerce?</Link>
            <Link to="/insights/share-of-algorithm">Share of Algorithm</Link>
            <Link to="/insights/how-ai-shopping-agents-decide">How agents decide</Link>
          </Col>
          <Col title="Company">
            <Link to="/about">About</Link>
            <Link to="/about#team">Team</Link>
            <Link to="/about#careers">Careers</Link>
            <a href="https://www.linkedin.com/company/parleo-sf/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <button type="button" className="footer__btn" onClick={() => openStart()}>
              Contact
            </button>
          </Col>
        </div>
        <div className="footer__base">
          <span>© 2026 Parleo, Inc. San Francisco.</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="footer__col">
      <span className="footer__title">{title}</span>
      <div className="footer__links">{children}</div>
    </div>
  );
}
