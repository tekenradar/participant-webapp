import React, { useEffect, useState } from 'react';
import { CommonResponseComponentProps, getLocaleStringTextByCode } from '../../utils';
import { ItemComponent, ItemGroupComponent, ResponseItem } from 'survey-engine/data_types';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ValidatedRandomQuestionProps = CommonResponseComponentProps

const getRandomQuestionIndex = (except: number, numberOfQuestions: number): number => {
    let index: number = Math.floor(Math.random() * numberOfQuestions);
    let count = 0;
    while (except === index) {
        index = Math.floor(Math.random() * numberOfQuestions);
        count++;
        if (count > 10) {
            break;
        }
    }
    return index;
}

const extractQuestionPool = (comp: ItemComponent): Array<ItemComponent> => {
    const questions: Array<ItemComponent> = [];

    if ((comp as ItemGroupComponent).items) {
        const questionPool = (comp as ItemGroupComponent).items.find(comp => comp.role === 'questionPool') as ItemGroupComponent;
        if (questionPool) {
            questions.push(...questionPool.items);
        }
    }

    return questions;
}


const ValidatedRandomQuestion: React.FC<ValidatedRandomQuestionProps> = (props) => {
    const questionPool = extractQuestionPool(props.compDef);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getRandomQuestionIndex(-1, questionPool.length));
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

    const currentQuestion = questionPool.length > currentQuestionIndex ? questionPool[currentQuestionIndex] : undefined;

    useEffect(() => {
        const value = currentValue.toLowerCase().trim();

        const acceptedAnswers = ((currentQuestion as ItemGroupComponent)?.items || []).map(item => getLocaleStringTextByCode(item.content, props.languageCode)?.toLowerCase().trim());
        const hasCorrectValue = acceptedAnswers.indexOf(value) > -1;

        const newResponse = hasCorrectValue ? {
            key: props.compDef.key ? props.compDef.key : 'no key found',
            value: value,
        } : undefined;

        setTouched(true);
        setResponse(newResponse);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValue])

    const newQuestionButton = (props.compDef as ItemGroupComponent).items?.find(comp => comp.role === 'buttonLabel');
    const labelText = getLocaleStringTextByCode(currentQuestion?.content, props.languageCode);
    const placeholderText = getLocaleStringTextByCode(currentQuestion?.description, props.languageCode);
    const newQuestionLabel = getLocaleStringTextByCode(newQuestionButton?.content, props.languageCode);

    return (
        <div
            className={clsx(
                'flex flex-col',
                'px-[--survey-card-px-sm] @md:px-[--survey-card-px]',
            )}
        >
            <Label
                htmlFor={props.parentKey + '-' + props.compDef.key}
            >
                <span>
                    {labelText}
                </span>
                <Input
                    id={props.parentKey + '-' + props.compDef.key}
                    className='form-control mt-2'
                    type="text"
                    placeholder={placeholderText}
                    value={currentValue}
                    onChange={(event) => {
                        const v = event.target.value;
                        setCurrentValue(v);
                    }}
                />
            </Label>
            <div className='text-end mt-2'>
                <Button
                    variant={'ghost'}
                    size={'sm'}
                    onClick={() => {
                        setTimeout(() => {
                            const newIndex = getRandomQuestionIndex(currentQuestionIndex, questionPool.length)
                            setCurrentQuestionIndex(newIndex)
                            setCurrentValue('')
                        }, 200)
                    }}
                >
                    {newQuestionLabel}
                </Button>
            </div>
        </div>
    );
};

export default ValidatedRandomQuestion;
