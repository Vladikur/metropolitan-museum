import { FC, useEffect, useState } from 'react';
import Card from '../Card/Card';
import { IObject } from '../../types/types';

interface GalleryProps {
  objects: IObject[];
}

const Gallery: FC<GalleryProps> = ({objects}) => {

  const [firstColumnObjects, setFirstColumnObjects] = useState<IObject[]>([])
  const [secondColumnObjects, setSecondColumnObjects] = useState<IObject[]>([])

  useEffect(() => {
    if (objects) {
      let arr1: IObject[] = []
      let arr2: IObject[] = []
      for (let i = 0; i < objects.length; i++) {
        if (i % 2 === 0) {
          arr1.push(objects[i])
        } else {
          arr2.push(objects[i])
        }
      }
      setFirstColumnObjects(arr1)
      setSecondColumnObjects(arr2)
    }
  }, [objects])

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
