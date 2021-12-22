import { CommonResponseComponentProps } from 'case-web-ui/build/components/survey/SurveySingleItemView/utils';
import React, { useEffect, useState } from 'react';
import { ResponseItem } from 'survey-engine/data_types';

interface TickMapResponseProps extends CommonResponseComponentProps {
}

const TickMapResponse: React.FC<TickMapResponseProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);


  useEffect(() => {
    if (touched) {
      const timer = setTimeout(() => {
        props.responseChanged(response);
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const setDummyResponse = () => {
    const dummyValue = {
      key: Math.round(Math.random() * 1000).toFixed(0),
      items: [
        { key: 'lat', value: '34.3434' },
        { key: 'lng', value: '4.3434' },
        { key: 'zoom', value: '12' },
      ]
    }
    setTouched(true);
    setResponse(prev => {
      if (!prev) {
        return {
          key: props.compDef.key ? props.compDef.key : 'no key found',
          items: [
            dummyValue
          ]
        }
      }

      const prevItems = prev.items ? [...prev.items] : []
      return {
        ...prev,
        items: [
          ...prevItems,
          dummyValue,
        ]
      }
    });
  };

  return (
    <div>
      <h3>Map Input</h3>
      <button className='btn btn-grey-4'
        onClick={() => setDummyResponse()}
      >Set dummy response</button>
      <p>{JSON.stringify(response)}</p>
    </div>
  );
};

export default TickMapResponse;
