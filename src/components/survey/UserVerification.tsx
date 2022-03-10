import { CommonResponseComponentProps } from 'case-web-ui/build/components/survey/SurveySingleItemView/utils';
import React, { useEffect, useState } from 'react';
import { ResponseItem } from 'survey-engine/data_types';

interface UserVerificationProps extends CommonResponseComponentProps {
}

const questionPool = [
  {
    title: <h5>Hoeveel is drie plus drie?</h5>,
    answers: [
      '6',
      'zes'
    ]
  },
  {
    title: <h5>Hoeveel is acht plus twee?</h5>,
    answers: [
      '10',
      'tien'
    ]
  },
  {
    title: <h5>Hoeveel is tien min zes?</h5>,
    answers: [
      '4',
      'vier'
    ]
  },
  {
    title: <h5>Hoeveel is twee keer vier?</h5>,
    answers: [
      '8',
      'acht'
    ]
  },
  {
    title: <h5>Hoeveel is twaalf gedeeld door vier?</h5>,
    answers: [
      '3',
      'drie'
    ]
  },
  {
    title: <h5>Hoeveel is negen gedeeld door drie?</h5>,
    answers: [
      '3',
      'drie'
    ]
  },
  {
    title: <h5>Hoeveel is twee keer vijf?</h5>,
    answers: [
      '10',
      'tien'
    ]
  },
  {
    title: <h5>Hoeveel is twee min een?</h5>,
    answers: [
      '1',
      'een',
      'eén',
      'éen',
      'één',
    ]
  },
  {
    title: <h5>Hoeveel is acht min een?</h5>,
    answers: [
      '7',
      'zeven',
    ]
  },
  {
    title: <h5>Hoeveel is elf min twee?</h5>,
    answers: [
      '9',
      'negen',
    ]
  },
  {
    title: <h5>Hoeveel is tien gedeeld door twee?</h5>,
    answers: [
      '5',
      'vijf',
    ]
  },
  {
    title: <h5>Hoeveel is drie plus vijf?</h5>,
    answers: [
      '8',
      'acht',
    ]
  },
]

const getRandomQuestion = (except: number) => {
  let index: number = Math.floor(Math.random() * questionPool.length);
  while (except === index) {
    index = Math.floor(Math.random() * questionPool.length);
  }
  return index;
}

const UserVerification: React.FC<UserVerificationProps> = (props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getRandomQuestion(-1));
  const [currentValue, setCurrentValue] = useState('');

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

  const currentQuestion = questionPool[currentQuestionIndex];

  useEffect(() => {
    const value = currentValue.toLowerCase().trim();

    const hasCorrectValue = currentQuestion.answers.indexOf(value) > -1;

    const newResponse = hasCorrectValue ? {
      key: props.compDef.key ? props.compDef.key : 'no key found',
      items: [
        { key: 'ic', value: value },
      ]
    } : undefined;

    setTouched(true);
    setResponse(newResponse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue])

  return (
    <div>
      <div>
        {currentQuestion.title}
        <input className='form-control' type="text"
          value={currentValue}
          onChange={(event) => {
            const v = event.target.value;
            setCurrentValue(v);
          }}
        ></input>
      </div>
      <div className='text-end'>
        <button className='btn btn-sm btn-link'
          onClick={() => {
            setTimeout(() => {
              setCurrentQuestionIndex(getRandomQuestion(currentQuestionIndex))
              setCurrentValue('')
            }, 200)
          }}
        >
          Ik wil een andere vraag
        </button>
      </div>
    </div>
  );
};

export default UserVerification;
