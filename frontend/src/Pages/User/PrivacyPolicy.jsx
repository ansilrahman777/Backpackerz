import React from "react";
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="p-3  text-gray-900 font-sans">
        <div className="max-w-6xl mx-auto bg-white p-8  rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            Privacy policy is required by the law and this policy only applies
            to Backpackerzz and not to the websites of other companies, individuals,
            or organisations to whom we provide links to our websites.
          </p>

          <h2 className="text-2xl font-semibold mb-2">
            Use of Your Information
          </h2>
          <p className="mb-4">
            We collect your information for the safety of our guests, and to
            understand who we are accommodating at our properties, for the
            safety of our staff. In addition, website user and guest data is
            collected for statistical purposes. We also collect our guests’
            nationality, date of birth, gender, for statistical analysis
            purposes. When you visit our websites, we may automatically log your
            IP address (the unique address which identifies your computer on the
            internet). We use IP addresses to help us manage our websites and to
            collect broad demographic information for analytical use. For
            reservations, we send guests confirmation emails and will therefore
            require your email address. Exceptions may occur in the case of us
            needing to contact previous guests in relation to post or lost
            property.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Reservation Data</h2>
          <p className="mb-4">
            In order for us to confirm a reservation for you, we do require some
            information. This will usually consist of:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Your name</li>
            <li>Telephone or mobile number – in case of an emergency</li>
            <li>Gender</li>
            <li>Nationality</li>
            <li>Date of Birth</li>
            <li>
              Credit card details, including the three-digit code that appears
              on the back of your credit card
            </li>
            <li>Date of arrival and departure</li>
            <li>Email address</li>
          </ul>
          <p className="mb-4">
            Upon arrival, we will require the same information from your fellow
            travellers, please ensure they are all aware of this to ensure a
            quick and efficient check-in.
          </p>

          <h2 className="text-2xl font-semibold mb-2">
            Keeping Guests' Information Updated
          </h2>
          <p className="mb-4">
            As an accommodation and leisure provider, we have guests returning
            to our properties on a regular basis. It is your duty to inform us
            if any of your personal information, which we hold about you, needs
            to be updated. We may contact you at any time, if you have booked
            accommodation with us and we suspect we hold false information about
            you.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Website Security</h2>
          <p className="mb-4">
            The Internet is not a secure medium. However, we have put in place
            various security procedures, including firewalls that are used to
            block unauthorized traffic to our website.
          </p>

          <h2 className="text-2xl font-semibold mb-2">
            Disclosing Guests' Personal Information to Third Parties
          </h2>
          <p className="mb-4">
            Other than that for the purposes referred to in this policy, we will
            not disclose any personal information without your permission unless
            we are legally obliged to do so (for example, if required to do so
            by court order or for the purposes of prevention of fraud).
          </p>

          <h2 className="text-2xl font-semibold mb-2">
            Changes to Our Privacy Policy
          </h2>
          <p className="mb-4">
            We may change our Privacy Policy at any time. Continued use of our
            website signifies that you agree to any such changes.
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PrivacyPolicy;
