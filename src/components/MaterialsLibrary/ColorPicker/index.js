import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TwitterPicker } from 'react-color';

import './style.css';
 

const pickerStyle = {
  backgroundColor: 'grey !important',
  position: 'absolute !important',
  width: '250px',
  marginTop: '10px'
}

const ColorPicker = ({ onChange, currentColor, pickerProps, controlProps }) => {
  const [coloPickerIsOpen, toggleColorPicker] = useState(false);
  const pickerRef = useRef();

  const clickOutsideHandler = useCallback(
    (event) => {
      if (pickerRef?.current && !pickerRef.current.contains(event.target) && coloPickerIsOpen) {
        toggleColorPicker(false);
      }
    },
    [coloPickerIsOpen],
  );

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => document.removeEventListener('mousedown', clickOutsideHandler);
  }, [coloPickerIsOpen, clickOutsideHandler]);

  return (
    <div className="color-picker-wrapper" ref={pickerRef}>
      <div className="color-picker-control" onClick={() => toggleColorPicker((state) => !state)} style={{ backgroundColor: currentColor }} {...controlProps} />
      {coloPickerIsOpen && (
        <TwitterPicker
          style={pickerStyle}
          {...pickerProps}
          onChange={(value) => {
            onChange(value);
            toggleColorPicker(false);
          }}
        />
      )}
    </div>
  );
};

export default ColorPicker;
