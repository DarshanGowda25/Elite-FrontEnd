import React from 'react'
import { elitePlusDetails } from '../Utils/info';
import FitnessPage from './FitnessPage';

function ElitePlus() {
  const pageDetails = elitePlusDetails; 
  return (
    <FitnessPage pageDetails={pageDetails}/>
  )
}

export default ElitePlus