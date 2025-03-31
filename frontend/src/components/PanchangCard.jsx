// import { CalendarDays, Volume2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import panchang from "./panchang"; // Correct import

// const PanchangCard = () => {

//     const [panchangData, setPanchangData] = useState({
//     day: "",
//     tithi: "",
//     nakshatra: "",
//     karna: "",
//     yoga: "",
//     raasi: "",
//     ayanamsa: "",
//   });

//     useEffect(() => {
//     const fetchPanchangData = async () => {
//       try {
//         const date = new Date();
//         const data = await panchang.calculate(date);
//         setPanchangData({
//           day: data.Day.name,
//           tithi: data.Tithi.name,
//           nakshatra: data.Nakshatra.name,
//           karna: data.Karna.name,
//           yoga: data.Yoga.name,
//           raasi: data.Raasi.name,
//           ayanamsa: data.Ayanamsa.name,
//         });
//       } catch (error) {
//         console.error("Failed to fetch Panchang data:", error);
//       }
//     };

//     fetchPanchangData();
//   }, []);

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-bold text-gray-800">
//           Today's Panchangam
//         </h2>
//         <CalendarDays className="text-red-500 w-6 h-6" />
//       </div>
//       <p className="text-red-600 font-semibold text-sm">
        
//       </p>

//       {/* Panchang Data */}
//       <div className="mt-4 space-y-2 text-gray-700 text-sm">
//         <p><strong>Month:</strong> Paksham</p>
//         <p><strong>Paksham:</strong> Shuklapaksha</p>

//         <p>
//           <strong>Tithi:</strong> <br />
//           Saptami: Dec 28 08:44 PM - Dec 29 07:17 PM <br />
//           Ashtami: Dec 29 07:17 PM - Dec 30 06:34 PM
//         </p>

//         <p>
//           <strong>Nakshatram:</strong> <br />
//           Purvabhadra: Dec 28 12:46 PM - Dec 29 11:44 AM <br />
//           Uttarabhadra: Dec 29 11:44 AM - Dec 30 11:24 AM
//         </p>

//         <p><strong>Rahukalam:</strong> 1:40 PM - 3:02 PM</p>
//       </div>

//       {/* Button */}
//       <button className="mt-4 w-full bg-red-600 text-white px-2 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition">
//         <CalendarDays className="w-5 h-5" />
//         View detailed panchangam for December 29, 2022
//       </button>
//     </div>
//   );
// };

// export default PanchangCard;





import React, { useEffect, useState } from "react";
import panchang from "./panchang"; // Correct import

const PanchangCalendar = () => {
  const [panchangData, setPanchangData] = useState({
    day: "",
    tithi: "",
    nakshatra: "",
    karna: "",
    yoga: "",
    raasi: "",
    ayanamsa: "",
  });

  useEffect(() => {
    const fetchPanchangData = async () => {
      try {
        const date = new Date();
        const data = await panchang.calculate(date);
        setPanchangData({
          day: data.Day.name,
          tithi: data.Tithi.name,
          nakshatra: data.Nakshatra.name,
          karna: data.Karna.name,
          yoga: data.Yoga.name,
          raasi: data.Raasi.name,
          ayanamsa: data.Ayanamsa.name,
        });
      } catch (error) {
        console.error("Failed to fetch Panchang data:", error);
      }
    };

    fetchPanchangData();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Panchang Calendar</h1>
      <p className="mb-4 text-gray-700">
        This sample code illustrates how to create a Panchang calendar using PanchangJS JavaScript library.
      </p>
      <div className="space-y-2">
        <div className="flex justify-between"><span className="font-bold">Day:</span> <span>{panchangData.day}</span></div>
        <div className="flex justify-between"><span className="font-bold">Tithi:</span> <span>{panchangData.tithi}</span></div>
        <div className="flex justify-between"><span className="font-bold">Nakshatra:</span> <span>{panchangData.nakshatra}</span></div>
        <div className="flex justify-between"><span className="font-bold">Karna:</span> <span>{panchangData.karna}</span></div>
        <div className="flex justify-between"><span className="font-bold">Yoga:</span> <span>{panchangData.yoga}</span></div>
        <div className="flex justify-between"><span className="font-bold">Raasi:</span> <span>{panchangData.raasi}</span></div>
        <div className="flex justify-between"><span className="font-bold">Ayanamsa:</span> <span>{panchangData.ayanamsa}</span></div>
      </div>
    </div>
  );
};

export default PanchangCalendar;
