// import React from "react";
// import "../../styles/our-member.css";
// import { Col } from "reactstrap";
// import { Link } from "react-router-dom";
// import ava01 from "../../assets/all-images/ava-01.jpg";
// import ava02 from "../../assets/all-images/ava-2.jpg";
// import ava03 from "../../assets/all-images/ava-3.jpg";
// import ava04 from "../../assets/all-images/ava-4.jpg";

// const OUR__MEMBERS = [
//   {
//     name: "Pratik Sawant",
//     // experience: "1 years of experience",
//     fbUrl: "#",
//     instUrl: "#",
//     twitUrl: "#",
//     linkedinUrl: "#",
//     imgUrl: ava01,
//   },

//   {
//     name: "Chaitanya Shinde",
//     // experience: "1 years of experience",
//     fbUrl: "#",
//     instUrl: "#",
//     twitUrl: "#",
//     linkedinUrl: "#",
//     imgUrl: ava02,
//   },

//   {
//     name: "Gajendra Kasturkar",
//     // experience: "1 years of experience",
//     fbUrl: "#",
//     instUrl: "#",
//     twitUrl: "#",
//     linkedinUrl: "#",
//     imgUrl: ava03,
//   },

//   {
//     name: "Vishal Pukale",
//     // experience: "1 years of experience",
//     fbUrl: "#",
//     instUrl: "#",
//     twitUrl: "#",
//     linkedinUrl: "#",
//     imgUrl: ava04,
//   },

// ];

// const OurMembers = () => {
//   return (
//     <>
//       {OUR__MEMBERS.map((item, index) => (
//         <Col lg="3" md="3" sm="4" xs="6" key={index} className="mb-4">
//           <div className="single__member">
//             <div className="single__member-img">
//               <img src={item.imgUrl} alt="" className="w-100" />

//               <div className="single__member-social">
//                 <Link to={item.fbUrl}>
//                   <i class="ri-facebook-line"></i>
//                 </Link>
//                 <Link to={item.twitUrl}>
//                   <i class="ri-twitter-line"></i>
//                 </Link>

//                 <Link to={item.linkedinUrl}>
//                   <i class="ri-linkedin-line"></i>
//                 </Link>

//                 <Link to={item.instUrl}>
//                   <i class="ri-instagram-line"></i>
//                 </Link>
//               </div>
//             </div>

//             <h6 className="text-center mb-0 mt-3">{item.name}</h6>
//             <p className="section__description text-center">
//               {item.experience}
//             </p>
//           </div>
//         </Col>
//       ))}
//     </>
//   );
// };

// export default OurMembers;

import React from 'react';
import '../../styles/about.css';
import CreatorCard from './CreatorCard';
import Img01 from '../../assets/all-images/ava-01.jpg'
import Img03 from '../../assets/all-images/ava-03.jpg'
const creatorsData = [
  {
    id: 1,
    name: 'Pratik Sawant',
    role: 'Web Developer',
    description: 'PG-DAC, Sunbeam Pune',
    photo: Img01, 
  },
  {
    id: 2,
    name: 'Gajendra Kasturkar',
    role: 'Web Developer',
    description: 'PG-DAC, Sunbeam Pune',
    photo: Img03, 
  },
  {
    id: 3,
    name: 'Chaitanya Shinde',
    role: 'Web Developer',
    description: 'PG-DAC, Sunbeam Pune',
    photo: 'image3.jpeg', 
  },
  {
    id: 4,
    name: 'Vishal Pukale',
    role: 'Web Developer',
    description: 'PG-DAC, Sunbeam Pune',
    photo: 'image4.jpeg', 
  }
  
];

const OurMembers = () => {
  return (
    // <div className="about-us-container">
      <div className="creators-grid">
        {creatorsData.map((creator) => (
          <CreatorCard key={creator.id} {...creator} />
        ))}
      </div>
    // </div>
  );
};
export default OurMembers;