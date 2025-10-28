import clsx from 'clsx';
import React, { useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  id?: string;
  step?: number;
  value: number;
  onChange: (value?: number) => void;
}

const Slider: React.FC<SliderProps> = (props) => {
  const [touched, setTouched] = useState(false);


  return (
    <div className="relative">
      <input
        type="range"
        role='slider'
        className={clsx(
          "appearance-none relative block w-full z-0 accent-gray-600 rounded my-[10px] h-[10px] cursor-pointer",
          'bg-gradient-to-r from-gray-50 to-gray-300 ring-1 ring-black/30',
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[30px] [&::-webkit-slider-thumb]:w-[30px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 hover:[&::-webkit-slider-thumb]:bg-primary-800",
          "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-[30px] [&::-moz-range-thumb]:w-[30px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-600 hover:[&::-moz-range-thumb]:bg-primary-800",
          "[&::-ms-thumb]:appearance-none [&::-ms-thumb]:h-[30px] [&::-ms-thumb]:w-[30px] [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-primary-600 hover:[&::-ms-thumb]:bg-primary-800",
          "focus:outline-none focus:ring-2 focus:ring-primary-600/50",
        )}
        min={props.min}
        max={props.max}
        step={props.step}
        id={props.id}
        value={props.value}
        onChange={(event) => {
          const value = parseFloat(event.target.value);
          props.onChange(value)
          setTouched(true);
        }}
        onClick={(event) => {
          if (touched) { return; }
          // console.log('clicked')
          const value = parseFloat((event.target as HTMLInputElement)?.value);
          props.onChange(value)
          setTouched(true);
        }}

      />

    </div>
  );
};

export default Slider;
