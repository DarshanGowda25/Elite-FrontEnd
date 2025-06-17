import React from 'react'
import { eliteProDetails } from '../Utils/info';
import FitnessPage from './FitnessPage';

function ElitePro() {
  const pageDetails = eliteProDetails; 

  return (
    <FitnessPage pageDetails={pageDetails}/>
  )
}

export default ElitePro