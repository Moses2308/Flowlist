import Hero from "../components/Hero.jsx";
import Feature from "../components/Feature.jsx";

import taskFeatureImage from "../assets/my-profit-tutor-v30bSAWzp4I-unsplash.jpg";
import habitFeatureImage from "../assets/road-ahead-r1CDF8HXgJY-unsplash.jpg";
import listFeatureImage from "../assets/jakub-zerdzicki-fXlL5I0IvK0-unsplash.jpg";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="features">
        {features.map((feature) => (
          <Feature {...feature} key={feature.id} />
        ))}
      </section>
    </>
  );
}

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
