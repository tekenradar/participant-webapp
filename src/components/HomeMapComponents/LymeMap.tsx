import { getExternalOrLocalContentURL, MapWithTimeSliderLoader } from 'case-web-ui';
import React from 'react';

interface LymeMapProps {
}

const LymeMap: React.FC<LymeMapProps> = (props) => {
  return (
    <div className='p-2 d-flex justify-content-center w-100'>
      <div className='bg-white w-100' style={{ maxWidth: 550 }}>
        <MapWithTimeSliderLoader
          mapUrl={'/data/maps/gem-map-nl.json'}
          dataUrl={'/data/maps/lyme-map-data.json'}
        />
      </div>
    </div>
  );
};

export default LymeMap;
