export default function Feature({ title, desc, imgPath, imgAltText }) {
  return (
    <section className="feature glass-back">
      <div className="feature_text-content">
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div className="feature_img-wrapper">
        <img src={imgPath} alt={imgAltText} />
      </div>
    </section>
  );
}
