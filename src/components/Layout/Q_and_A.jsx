import React from "react";

const Q_and_A = () => {
  return (
    <>
      <div className="container Q_and_A_Section_container my-5">
        <h1 className="text-center text-black "> Q And A</h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne">
                About Us
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample">
              <div className="accordion-body">
                At Dappernest, we are dedicated to promoting and celebrating the
                beauty of Bangladeshi fashion. Our brand is founded on the
                belief that clothing is not just a means of covering oneself but
                a form of self-expression, a reflection of one's unique style
                and personality. With our carefully curated selection of
                clothing, we aim to offer our customers an unparalleled shopping
                experience filled with timeless designs, superior quality, and a
                true essence of Bangladesh.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo">
                Our Mission
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample">
              <div className="accordion-body">
                Our mission is to bring the unparalleled beauty of Bangladeshi
                fashion to the world. We strive to empower local artisans and
                designers, providing them with a platform to showcase their
                talent and creativity. By merging traditional techniques with
                contemporary trends, we create a seamless blend of modernity and
                cultural heritage in our clothing, enabling our customers to
                make a fashion statement that is both stylish and authentic.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree">
                Our Collection
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample">
              <div className="accordion-body">
                At Dappernest, we meticulously handpick each garment to ensure
                that it embodies the finest craftsmanship and attention to
                detail. From intricately embroidered sarees and traditional
                salwar kameez to modern western wear infused with Bangladeshi
                motifs, our collection caters to every style and occasion. We
                collaborate with renowned fashion designers and brands to offer
                a diverse range of options that cater to all tastes,
                preferences, and sizes.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour">
                Quality and Sustainability
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample">
              <div className="accordion-body">
                We are committed to delivering products of the highest quality.
                Our garments are made using premium fabrics sourced from trusted
                suppliers, ensuring durability, comfort, and a luxurious feel.
                Furthermore, we prioritize sustainability by working closely
                with our manufacturers to minimize our environmental impact. We
                believe in responsible fashion, and our efforts are focused on
                promoting ethical practices throughout our supply chain.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive">
                Customer Experience
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample">
              <div className="accordion-body">
                At Dappernest, we prioritize the satisfaction of our customers
                above all else. We offer a seamless online shopping experience,
                complete with secure payment options and prompt delivery. Our
                customer support team is always ready to assist with any queries
                or concerns, ensuring that every interaction with our brand is
                exceptional.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Q_and_A;
