import React, { useState } from 'react';
import clsx from 'clsx';

interface RibbonProps {
}

const Ribbon: React.FC<RibbonProps> = (props) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className={clsx(
      // "position-sticky",
      {
        "d-none": hidden,
      }
    )}
      style={{
        boxShadow: "0 0 3px rgba(0, 0, 0, .3)",
        zIndex: 1000,
        width: "200px",
        background: "#e43",
        position: "absolute",
        textAlign: "center",
        lineHeight: "30px",
        letterSpacing: "1px",
        color: "#f0f0f0",
        top: "25px",
        transform: "translateX(-50px) rotate(-45deg) ",
      }}
      onClick={() => {
        setHidden(true)
        setTimeout(() => setHidden(false), 5000)
      }}
    >{props.children}</div>
  );
};

export default Ribbon;
