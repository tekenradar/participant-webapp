import React, { useEffect, useState } from 'react';
import { getExternalOrLocalContentURL, LoadingPlaceholder, Slider, } from 'case-web-ui';
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import ReactTooltip from 'react-tooltip';
import clsx from 'clsx';


interface LymeMapProps {
  language: string;
}

const mapURL = '/data/maps/gem-map-nl_230711.json';
const dataURL = '/data/maps/lyme-map-data_230711.json';
const localOptions = { minimumFractionDigits: 0, maximumFractionDigits: 1 };


const getColor = (value?: number, colorScale?: Array<{
  min?: number;
  max?: number;
  label: string;
  color: string;
}>): string | undefined => {
  if (value === undefined || colorScale === undefined) {
    return undefined;
  }
  for (let i = 0; i < colorScale.length; i++) {
    const currentStep = colorScale[i];
    if (currentStep.max === undefined) {
      continue;
    }
    if (value < currentStep.max) {
      return currentStep.color;
    }
  }
  return colorScale[colorScale.length - 1].color;
}


const LymeMap: React.FC<LymeMapProps> = (props) => {
  // Data state
  const [geoData, setGeoData] = useState<any | undefined>();
  const [seriesData, setSeriesData] = useState<any | undefined>();

  // Vis state
  const [tooltipContent, setTooltipContent] = useState('');
  const [dataIndex, setDataIndex] = useState(0);
  const [selectedSeries, setSelectedSeries] = useState<undefined | any>(undefined);

  useEffect(() => {
    fetch(getExternalOrLocalContentURL(mapURL))
      .then(res => res.json())
      .then(json => {
        setGeoData(json);
      })
      .catch(error => console.log(error));
    fetch(getExternalOrLocalContentURL(dataURL))
      .then(res => res.json())
      .then(json => {
        setSeriesData(json);
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (seriesData !== undefined) {
      setSelectedSeries(seriesData.series[0])
      setDataIndex(seriesData.slider.labels.length - 1)
    }
  }, [seriesData])


  const renderLegend = () => {
    if (!selectedSeries?.legend.show) {
      return null;
    }

    const items = <React.Fragment>{
      selectedSeries.colorScale.colors.slice().reverse().map((item: any, index: number) => {
        return <div
          key={index.toString()}
          className="d-inline-flex align-items-center justify-content-start align-self-start mx-2 mx-sm-0 mb-1 mb-sm-0">
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: item.color
            }}>
          </div>
          <div className="ms-1">
            {item.label}
          </div>
        </div>

      })
    }</React.Fragment>;

    return <React.Fragment>
      <div className={clsx(
        "pe-none",
        "d-none d-sm-inline-block position-absolute fw-bold",
        `${selectedSeries.legend.position.y}-0`,
        {
          "text-start start-0": selectedSeries.legend.position.x === 'left',
          "text-end end-0": selectedSeries.legend.position.x === 'right',
        }
      )} style={{ fontSize: '0.8rem' }}>
        <div className="text-end mb-1 px-1">
          {selectedSeries.legend.title}
        </div>
        <div
          className="d-inline-flex flex-column px-1 py-1 align-items-start" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          {items}
        </div>
      </div>

      {/* For small screens: */}
      <div className="d-block d-sm-none fw-bold text-start" style={{ pointerEvents: 'none', top: 0, fontSize: '0.8rem' }}>
        <div className="w-100 text-start mb-1 px-1">
          {selectedSeries.legend.title}
        </div>
        <div className="d-inline-flex flex-row justify-content-evenly flex-wrap px-1 pb-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          {items}
        </div>
      </div>
    </React.Fragment>
  }

  const renderMap = () => {
    if (geoData === undefined) {
      return <LoadingPlaceholder
        minHeight={450}
        color='white'
      />
    }

    return <div
      className="position-relative"
    >
      {renderLegend()}
      <div className="ps-4 px-lg-4 px-sm-2 px-0 mx-auto" style={{ maxWidth: 550 }}>

        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: geoData.projection.rotate,
            scale: geoData.projection.scale
          }}
          width={geoData.size.width}
          height={geoData.size.height}
          data-tip=""
        >
          <Geographies geography={geoData.topojson}
            fill="#d3d3d3"
            stroke="#FFFFFF"
            strokeWidth={0.3}
          >
            {({ geographies }) => geographies.map(geo => {
              const value = selectedSeries?.data.find((d: any) => d.name.includes(geo.properties.name))?.sequence[dataIndex];
              const colorScale = selectedSeries?.colorScale.colors;
              return <Geography
                fill={getColor(value, colorScale)}
                key={geo.rsmKey} geography={geo}
                tabIndex={-1}
                onMouseEnter={() => {
                  setTooltipContent(
                    `<span>${geo.properties.name}</span><br><span>${value?.toLocaleString(props.language, localOptions)}</span>`
                  );
                }}
                onMouseLeave={() => {
                  setTooltipContent('');
                }}
                style={{
                  default: {
                    outline: 'none',
                  },
                  hover: {
                    outline: 'none',
                    stroke: selectedSeries?.colorScale.hoverStrokeColor ? selectedSeries?.colorScale.hoverStrokeColor : '#FD4',
                    strokeWidth: 5,

                  },
                  pressed: {
                    outline: 'none',
                    stroke: selectedSeries?.colorScale.hoverStrokeColor ? selectedSeries?.colorScale.hoverStrokeColor : '#FD4',
                    strokeWidth: 2,
                  }
                }}
              />
            }
            )}
          </Geographies>
        </ComposableMap>
        <ReactTooltip html={true}>{tooltipContent}</ReactTooltip>
      </div>
    </div >
  }

  const renderSlider = () => {
    if (seriesData === undefined) {
      return null;
    }

    return (<div className="text-center w-100 justify-content-center">
      <div className="px-3 pb-0 mb-0">
        <div className="w-100 text-center text-primary fw-bold">
          {seriesData.slider.labels[dataIndex]}
        </div>
        <Slider
          id="mapSlider"
          min={0}
          max={seriesData.slider.labels.length - 1}
          step={seriesData.slider.hideTicks ? undefined : 1}
          value={dataIndex}
          onChange={(value) => {
            setDataIndex(value ? value : 0);
          }}
        />
        <div className="d-flex">
          <span className="flex-grow-1 text-start">
            {seriesData.slider.minLabel}
          </span>
          <span className="">
            {seriesData.slider.maxLabel}
          </span>
        </div>
      </div>
    </div>)
  }


  return (
    <div className='p-2 w-100'>
      <div className='p-2 bg-white w-100'>
        <h5 className='fw-bold mb-0'>Mensen met erythema migrans (rode ring of vlek op de huid)</h5>
        <p className='mb-0'>
          een vroege uiting van de ziekte van Lyme
        </p>
        <a className='d-block mb-2' href='/informatie/lyme-in-nederland'>Meer informatie</a>

        {renderMap()}
        {renderSlider()}
      </div>
    </div>
  );
};

export default LymeMap;
