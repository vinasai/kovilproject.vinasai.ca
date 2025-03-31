import React from 'react'
import img from '../assets/hero.jpg'
import img2 from '../assets/edu.jpg'
import img3 from '../assets/img2.jpg'
const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
            <img
              src={img}
              alt="Temple"
              className="w-full h-150 object-cover rounded-xl"
            />
            <h1 className="text-3xl font-bold text-center mt-6 text-gray-800">
              Sri Varasiththi Vinaayagar Devotees!
            </h1>
            <p className="text-gray-600 text-center mt-2">
              May Lord Ganesh bless you and your family with happiness and prosperity.
            </p>
            <div className="mt-6 space-y-4 text-gray-700">
              <p>
                We appreciate the interest you have shown in our temple activities and thank you
                for your kind donations and contributions. With the support of our community,
                we promote the understanding of ethical, social, and philosophical foundations
                in the practice of Hinduism, providing spiritual assistance to our community.
              </p>
              <img
                src={img2}
                alt="Young Artists"
                className="w-full h-75 object-cover rounded-xl"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mt-6">Encouraging Young Talent</h2>
              <p>
                Through this temple, besides worship, we also recognize many young and talented
                classical artists. In 2005, we established Sri Varasiththi Vinaayagar Hindu
                College to educate and empower our young generation through the values of
                Hindu Religion, culture, and Tamil Language. Today, there are over 220
                students and 10 teachers as part of this school.
              </p>
              <img
                src={img3}
                alt="Hospital Visits"
                className="w-full h-52 object-cover rounded-xl"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mt-6">Community Outreach</h2>
              <p>
                Our temple priests frequently visit hospitals and nursing homes such as
                Scarborough Grace Hospital, Providence Healthcare, and Craiglee Nursing Home to
                perform prayers and console patients, residents, and their families.
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 mt-6">Giving Back to the Community</h2>
              <p>
                The “Giving Back to the Community” fundraising program was initiated to help
                communities in need. We have supported various causes, including Tsunami relief
                in Sri Lanka, Chennai Flood Relief, and fundraising for The Scarborough
                Hospital Grace Campus MRI Equipment.
              </p>
              <p>
                We encourage all devotees and well-wishers to participate and support our
                programs to help our community grow and flourish in Canadian society.
              </p>
              <p className="font-bold text-gray-800 mt-6">God bless you!</p>
              <p className="text-gray-700">Sivasri. Panchadchara Vijayakumara Kurukkal</p>
              <p className="text-gray-600">Chief Priest, Founder, and President-Board of Trustee</p>
              <p className="italic text-gray-500">“Let Love Bind Us All Together”</p>
            </div>
          </div>
        </div>
      );
}

export default About