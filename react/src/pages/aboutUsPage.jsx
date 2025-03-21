import React from "react";
import './aboutUsPage.css';

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="about-us-content">
        <div className="about-us-box">
          <h2>Our Mission</h2>
          <p>
            Our mission is to help you manage your finances effectively and save
            money with ease. We aim to provide tools that empower you to take
            control of your spending and achieve your financial goals.
          </p>
        </div>
        <div className="about-us-box">
          <h2>Our Team</h2>
          <p>
            We are a passionate team of developers, designers, and financial
            experts dedicated to creating a seamless and intuitive experience
            for our users.
          </p>
        </div>
        <div className="about-us-box">
          <h2>Contact Us</h2>
          <p>
            Have questions or feedback? Reach out to us at{" "}
            <a href="mailto:support@hromozomite.com">support@hromozomite.com</a>.
            We'd love to hear from you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

