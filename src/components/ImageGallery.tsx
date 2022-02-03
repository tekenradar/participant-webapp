import { getExternalOrLocalContentURL } from 'case-web-ui';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GenericPageItemProps } from './utils';

interface ImageGalleryProps extends GenericPageItemProps {
}

const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
  const { t, } = useTranslation([props.pageKey, 'global']);

  const items = t(`${props.itemKey}`, { returnObjects: true }) as Array<{
    src: string;
    alt: string;
    caption: {
      title: string;
      body: string;
    }
    content: string;
  }>;

  if (!items || !items.map) {
    return <p>{props.itemKey} should be a list</p>;
  }

  return (
    <Carousel>
      {items.map((item, index) => <Carousel.Item
        key={index.toString()}
        className='bg-grey-7'
        style={{
          height: 400
        }}
      >
        <div className='d-flex h-100'>
          <img
            className="d-block w-100"
            style={{
              objectFit: 'contain',
              height: 'auto',
            }}
            src={getExternalOrLocalContentURL(item.src)}
            alt={item.alt}
          />
        </div>
        <Carousel.Caption>
          <h3>{item.caption.title}</h3>
          <p>{item.caption.body}</p>
        </Carousel.Caption>
      </Carousel.Item>)}
    </Carousel>
  );
};

export default ImageGallery;
