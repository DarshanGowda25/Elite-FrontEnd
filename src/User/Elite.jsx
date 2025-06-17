import React from 'react'
import { SiTicktick } from "react-icons/si";
import { IoWalletOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MdArrowBackIos, MdDescription } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { Footer } from './Home';
import { eliteDetails } from '../Utils/info';
import Fitness from './Fitness';
import FitnessPage from './FitnessPage';


function Elite() {

  const pageDetails = eliteDetails; 
  return (
    <FitnessPage pageDetails={pageDetails}/>
  )
}

export default Elite






