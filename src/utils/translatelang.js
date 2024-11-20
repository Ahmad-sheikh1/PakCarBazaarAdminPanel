import { useEffect, useState } from "react";
import { GrLanguage } from "react-icons/gr";

const languages = [
//   { label: 'Select Language', value: '' },
  { label: 'English', value: 'en' },
  { label: 'Arabic', value: 'ar' },
//   { label: 'Pashto', value: 'ps' },
  { label: 'Urdu', value: 'ur' }
];

const includedLanguages = languages.map(lang => lang.value).join(",");

function googleTranslateElementInit() {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "ur",
      includedLanguages
    },
    "languageselector"
  );
}




export function GoogleTranslate({ prefLangCookie }) {
  const [langCookie, setLangCookie] = useState(decodeURIComponent(prefLangCookie || "ur"));
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
  
    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [langCookie]);

  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const onChange = (value) => {
    const lang = "/" + value;
    if (value !== "") {
      setLangCookie(lang);
      const element = document.querySelector(".goog-te-combo");
      if (element) {
        element.value = value;
        element.dispatchEvent(new Event("change"));
        window.location.reload()
        // document.body.style.textAlign = value === 'en' ? 'left' : 'right';
      }
    }
  };

  return (
    <div>
      {/* <div id="google_translate_element" style={{ visibility: "hidden", width:"1px" , height:"1px" }}></div> */}
      <LanguageSelector onChange={onChange} value={langCookie} />
    </div>
  );
}

function LanguageSelector({ onChange, value }) {
  const langCookie = value.split("/")[2];
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelection = (value) => {
    onChange(value);
    setIsOpen(false);
  };
  return (
       
    <div
    className=" "
    
  >
    <div
      className=" relative  px-2 py-2 rounded text-black font-bold"
      onClick={toggleDropdown}
      style={{ cursor: "pointer" }}
    >
        
      <GrLanguage  />
      {/* <span className="ml-2 test">{languages.find((lang) => lang.value === langCookie)?.label}</span> */}
    </div>

    {isOpen && (
      <div
        className="absolute  top-14 right-3 z-50 bg-white shadow-lg mt-1 rounded "
        
      >
        {languages.map((it) => (
          <div
            key={it.value}
            onClick={() => handleSelection(it.value)}
            className="px-4 py-2 text-black  cursor-pointer hover:bg-gray-100"
          >
            {it.label}
          </div>
        ))}
      </div>
    )}
  </div>
    // <div className="language-selector form position-fixed overflow-hidden" style={{ top: "100px" }}>
    //   <label htmlFor="langPicker" className="visually-hidden">Select Language:</label>
    //   <select
    //     id="langPicker"
    //     onChange={(e) => onChange(e.target.value)}
    //     value={langCookie}
    //     className="form-select form-control px-2 py-2 rounded text-blue-700 font-bold"
    //     style={{ width: '120px' }}
    //   >
    //     {languages.map((it) => (
    //       <option key={it.value} value={it.value} className="font-bold rounded text-blue-700 notranslate">
    //         {it.label}
    //       </option>
    //     ))}
    //   </select>
    // </div>
  );
}

// import { useEffect, useState } from "react";
// import { GrLanguage } from "react-icons/gr";

// const languages = [
//   { label: 'Select Language', value: '' },
//   { label: 'English', value: 'en' },
//   { label: 'Arabic', value: 'ar' },
//   { label: 'Pashto', value: 'ps' },
//   { label: 'Urdu', value: 'ur' }
// ];

// const includedLanguages = languages.map(lang => lang.value).join(",");

// function googleTranslateElementInit() {
//   new window.google.translate.TranslateElement(
//     {
//       pageLanguage: "ur",
//       includedLanguages
//     },
//     "google_translate_element"
//   );
// }

// export function GoogleTranslate({ prefLangCookie }) {
//   const [langCookie, setLangCookie] = useState(decodeURIComponent(prefLangCookie || "ur"));

//   useEffect(() => {
//     window.googleTranslateElementInit = googleTranslateElementInit;
//   }, []);

//   const onChange = (value) => {
//     const lang = "/" + value;
//     if (value !== "") {
//       setLangCookie(lang);
//       const element = document.querySelector(".goog-te-combo");
//       if (element) {
//         element.value = value;
//         element.dispatchEvent(new Event("change"));
//         document.body.style.textAlign = value === 'en' ? 'left' : 'right';
//       }
//     }
//   };

//   return (
//     <div>
//       <div id="google_translate_element" style={{ visibility: "hidden", width: "1px", height: "1px" }}></div>
//       <LanguageSelector onChange={onChange} value={langCookie} />
//     </div>
//   );
// }

// function LanguageSelector({ onChange, value }) {
//   const langCookie = value.split("/")[2];

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleSelection = (value) => {
//     onChange(value);
//     setIsOpen(false);
//   };
//   return (
    
//     <div
//     className="language-selector "
    
//   >
//     <div
//       className="d-flex relative align-items-center form-control px-2 py-2 rounded text-blue-700 font-bold"
//       onClick={toggleDropdown}
//       style={{ cursor: "pointer" }}
//     >
//       <GrLanguage />
//       <span className="ml-2">{languages.find((lang) => lang.value === langCookie)?.label}</span>
//     </div>

//     {isOpen && (
//       <div
//         className="absolute  top-14 right-3 z-50 bg-white shadow-lg mt-1 rounded "
        
//       >
//         {languages.map((it) => (
//           <div
//             key={it.value}
//             onClick={() => handleSelection(it.value)}
//             className="px-4 py-2 text-black  cursor-pointer hover:bg-gray-100"
//           >
//             {it.label}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
//   );
// }
