import AnimatedSection from "./AnimatedSection";

const serif = {
  fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
  fontStyle: "italic" as const,
  fontWeight: 400,
};

const SpineSection = () => (
  <AnimatedSection
    id="spine"
    className="relative py-20 md:py-32"
    style={{ background: "#1E1E2E" }}
  >
    <div className="mx-auto max-w-content px-6 md:px-20">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <h2
          className="font-heading text-[34px] text-white md:text-[58px]"
          style={{ lineHeight: 1.05 }}
        >
          Other tools measure whether agents{" "}
          <span style={serif} className="text-white/80">see you</span>.
          <br />
          Parleo measures whether they see your{" "}
          <span style={serif} className="text-[#6FA8FF]">real value</span>.
        </h2>
        <p className="self-end text-[16px] leading-[1.65] text-white/65 md:text-[18px]">
          As agents move from recommending to buying, the deciding signal stops being the mention. It becomes the resolved price, after every incentive. That's the layer nobody else computes.
        </p>
      </div>
    </div>
  </AnimatedSection>
);

export default SpineSection;
