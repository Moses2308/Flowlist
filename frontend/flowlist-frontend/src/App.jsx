import { useEffect, useState } from "react";
import "../stylesheets/style.css";
import background from "./assets/monica-flores-gZk0fJSlETY-unsplash.jpg";
import taskFeatureImage from "./assets/my-profit-tutor-v30bSAWzp4I-unsplash.jpg";
import habitFeatureImage from "./assets/road-ahead-r1CDF8HXgJY-unsplash.jpg";
import listFeatureImage from "./assets/jakub-zerdzicki-fXlL5I0IvK0-unsplash.jpg";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";

const features = [
  {
    id: 1,
    title: "Habit Tracking",
    desc: "A person is largely defined by what they continue to do.Tracking habits can help reinforce or deter behaviors by showing you what you do, and, therefore, who you are.",
    imgPath: habitFeatureImage,
    imgAltText: "Annual calendar with months and days.",
  },
  {
    id: 2,
    title: "Tasks",
    desc: "A person is largely defined by what they continue to do.Tracking habits can help reinforce or deter behaviors by showing you what you do, and, therefore, who you are.",
    imgPath: taskFeatureImage,
    imgAltText: "Annual calendar with months and days.",
  },
  {
    id: 3,
    title: "Lists",
    desc: "A person is largely defined by what they continue to do.Tracking habits can help reinforce or deter behaviors by showing you what you do, and, therefore, who you are.",
    imgPath: listFeatureImage,
    imgAltText: "Annual calendar with months and days.",
  },
];

function App() {
  const [isAuthenticated, setAuth] = useState(false);

  return (
    <>
      <header>
        <Navbar isAuthenticated={isAuthenticated} />
      </header>
      <main>
        <Hero />
        <section className="features">
          {features.map((feature) => (
            <Feature {...feature} key={feature.id} />
          ))}
        </section>
      </main>
      <footer className="glass-back footer"></footer>
    </>
  );
}

function Feature({ title, desc, imgPath, imgAltText }) {
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

export default App;
