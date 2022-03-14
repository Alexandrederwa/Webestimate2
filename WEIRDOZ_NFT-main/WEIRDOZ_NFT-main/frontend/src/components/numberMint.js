import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const SimpleSlider = () => {

  const [ value, setValue ] = useState(1); 

  return (
    
        <RangeSlider
            value={value}
            step={1}
            min={1}
            max={5}
            onChange={changeEvent => setValue(changeEvent.target.value)}
        />
        
    
  );

};
export default SimpleSlider