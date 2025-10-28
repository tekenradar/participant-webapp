import React from 'react';
import { ItemComponent, ResponseItem } from 'survey-engine/data_types';
// import { Slider, Typography, Box } from '@material-ui/core';
// import { getLocaleStringTextByCode } from '../../../utils';

interface SliderCategoricalProps {
    compDef: ItemComponent;
    prefill?: ResponseItem;
    responseChanged: (response: ResponseItem | undefined) => void;
    languageCode: string;
}


const SliderCategorical: React.FC<SliderCategoricalProps> = (props) => {
    return (
        <p>not implemented {props.compDef.key}</p>
    );
    // const groupDef = (props.compDef as ItemGroupComponent);

    /* const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);
 */
    /* const [selectedIndex, setSelectedIndex] = useState<number>(
      props.prefill && props.prefill.items && props.prefill.items.length > 0 ? groupDef.items.findIndex(item => {
        if (!props.prefill || !props.prefill.items) {
          return -1;
        }
        return item.key === props.prefill.items[0].key;
      }) : -1
    ); */

    /*  useEffect(() => {
         if (touched) {
             const timer = setTimeout(() => {
                 props.responseChanged(response);
             }, 200);
             return () => clearTimeout(timer);
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [response]); */

    /* const handleSliderChange = (key: string | undefined) => (event: any, newValue: number | number[]) => {
      if (!key) { return; }
      setTouched(true);
      const currentIndex = newValue as number;
      if (currentIndex < 0 || currentIndex >= groupDef.items.length) {
        return;
      }
      const currentSelection = groupDef.items[currentIndex];
      setSelectedIndex(currentIndex);

      setResponse(prev => {
        if (!currentSelection || !currentSelection.key) {
          return prev;
        }

        if (!prev) {
          return {
            key: props.compDef.key ? props.compDef.key : 'no key found',
            items: [
              { key: currentSelection.key }
            ]
          }
        }
        return {
          ...prev,
          items: [
            { key: currentSelection.key }
          ]
        }
      })
    };

   */
    /* const marks = groupDef.items.map((v, index) => {
      return {
        value: index,
        label: getLocaleStringTextByCode(v.content, props.languageCode)
      }
    });
   */
    return (
        <p>not implemented</p>
    );
};

export default SliderCategorical;

/*
    <Box>
      {props.compDef.content ?
        <Typography id="slider-numeric" gutterBottom>
          {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
        </Typography>
        : null}
      <Box p={1}>
        <Slider
          color="secondary"
          aria-labelledby={props.compDef.content ? "slider-numeric" : undefined}
          value={selectedIndex}
          onChange={handleSliderChange(props.compDef.key)}
          valueLabelDisplay="off"
          track={false}
          max={groupDef.items.length - 1}
          step={null}
          marks={marks}
          disabled={props.compDef.disabled !== undefined}
        />
      </Box>
    </Box> */
