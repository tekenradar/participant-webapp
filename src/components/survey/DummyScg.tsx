import { CommonResponseComponentProps } from 'case-web-ui/build/components/survey/SurveySingleItemView/utils';
import React, { useEffect, useState } from 'react';
import { ResponseItem } from 'survey-engine/data_types';

interface DummyScgProps extends CommonResponseComponentProps {
}

const DummyScg: React.FC<DummyScgProps> = (props) => {
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
      key: Math.round(Math.random() * 2 + 1).toFixed(0),
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

      return {
        ...prev,
        items: [
          dummyValue,
        ]
      }
    });
  };

  return (
    <div>
      <h3>Dummy scg Input</h3>
      <button className='btn btn-grey-4'
        onClick={() => setDummyResponse()}
      >Set dummy response</button>
    </div>
  );
};

export default DummyScg;
