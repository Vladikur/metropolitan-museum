import { FC } from 'react';
import Card from '../Card/Card';
import { IObject } from '../../types/types';

interface GalleryProps {
  firstColumnObjects: IObject[];
  secondColumnObjects: IObject[];
}

const Gallery: FC<GalleryProps> = ({firstColumnObjects, secondColumnObjects}) => {


  return (
  <div className="gallery">
    <div className="content-wrapper">
      {firstColumnObjects.map((object) => (
        <Card
          key={object.objectID}
          object={object}
        />
      ))}
    </div>
    <div className="content-wrapper">
      {secondColumnObjects.map((object) => (
        <Card
          key={object.objectID}
          object={object}
        />
      ))}
    </div>
  </div>
  );
}

export default Gallery;
