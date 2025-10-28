import React from 'react';
import { ItemComponent, ResponseItem } from 'survey-engine/data_types';


interface SliderNumericRangeProps {
    compDef: ItemComponent;
    prefill?: ResponseItem;
    responseChanged: (response: ResponseItem | undefined) => void;
    languageCode: string;
}

/* const applyPrefill = (pValues: undefined | ResponseItem): number[] => {
  if (!pValues || !pValues.items || pValues.items.length !== 2) {
    return [0, 0];
  }
  const start = pValues.items.find(pv => pv.key === 'start')
  const end = pValues.items.find(pv => pv.key === 'end')
  return [start && start.value ? parseFloat(start.value) : 0, end && end.value ? parseFloat(end.value) : 0];
} */

const SliderNumericRange: React.FC<SliderNumericRangeProps> = (props) => {
    return (
        <p>not implemented {props.compDef.key}</p>
    );
    /* const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);

    const [inputValues, setInputValues] = useState<number[]>(
      applyPrefill(props.prefill)
    );

    useEffect(() => {
      if (touched) {
        const timer = setTimeout(() => {
          props.responseChanged(response);
        }, 200);
        return () => clearTimeout(timer);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const handleSliderChange = (key: string | undefined) => (event: any, newValue: number | number[]) => {
      if (!key) { return; }
      setTouched(true);

      setInputValues(newValue as number[]);

      setResponse(prev => {
        newValue = newValue as number[];
        if (newValue.length !== 2) {
          console.error("unexpected number of values received from slider value change");
          return;
        }
        if (!prev) {
          return {
            key: props.compDef.key ? props.compDef.key : 'no key found',
            items: [
              { key: 'start', dtype: 'number', value: newValue[0].toString() },
              { key: 'end', dtype: 'number', value: newValue[1].toString() }
            ]
          }
        }
        return {
          ...prev,
          items: [
            { key: 'start', dtype: 'number', value: newValue[0].toString() },
            { key: 'end', dtype: 'number', value: newValue[1].toString() }
          ]
        }
      })
    };

    const marks = () => {
      if (props.compDef.style) {
        const labels = props.compDef.style.find(st => st.key === 'step-labels');
        if (labels && labels.value === "true") {
          if (props.compDef.properties?.min && props.compDef.properties?.max && props.compDef.properties?.stepSize) {
            const min = props.compDef.properties?.min as number;
            const max = props.compDef.properties?.max as number;
            const stepSize = props.compDef.properties?.stepSize as number;

            const marks = [];

            for (let i = min; i <= max; i += stepSize) {
              marks.push({
                value: i,
                label: i.toString()
              });
            }

            return marks;
          }
        }
      }

      return props.compDef.properties?.stepSize ? true : false;
    };

    return (
      <React.Fragment>
        <p>Not implemented yet</p>
      </React.Fragment>
    ); */
};

export default SliderNumericRange;

// old :
/*
{props.compDef.content ?
        <Typography id="slider-numeric" gutterBottom>
          {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
        </Typography>
        : null}
      <Box p={1}>
        <Slider
          color="secondary"
          aria-labelledby={props.compDef.content ? "slider-numeric" : undefined}
          value={inputValues}
          onChange={handleSliderChange(props.compDef.key)}
          valueLabelDisplay="auto"
          min={props.compDef.properties?.min as number}
          max={props.compDef.properties?.max as number}
          step={props.compDef.properties?.stepSize as number}
          marks={marks()}
          disabled={props.compDef.disabled !== undefined}
        />
      </Box>*/
