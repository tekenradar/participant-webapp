import { CommonResponseComponentProps } from 'case-web-ui/build/components/survey/SurveySingleItemView/utils';
import React, { useState } from 'react';

interface UserVerificationProps extends CommonResponseComponentProps {
}

const questionPool = [
  {
    title: <h5>Question 1</h5>,
  },
  {
    title: <h5>Question 2</h5>,
  },
  {
    title: <h5>Question 3</h5>,
  },
  {
    title: <h5>Question 4</h5>,
  },
  {
    title: <h5>Question 5</h5>,
  },
  {
    title: <h5>Question 6</h5>,
  },
  {
    title: <h5>Question 7</h5>,
  },
  {
    title: <h5>Question 8</h5>,
  }
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

  const currentQuestion = questionPool[currentQuestionIndex];

  return (
    <div>
      <div>
        {currentQuestion.title}
        <input className='form-control'></input>
      </div>
      <div className='text-end'>
        <button className='btn btn-sm btn-link'
          onClick={() => setCurrentQuestionIndex(getRandomQuestion(currentQuestionIndex))}
        >
          I want another question
        </button>
      </div>
    </div>
  );
};

export default UserVerification;
