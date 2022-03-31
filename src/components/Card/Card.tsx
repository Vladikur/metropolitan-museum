import React, { FC } from 'react';
import { IObject } from '../../types/types';

interface CardProps {
  object: IObject;
}

const Card: FC<CardProps> = ({ object }) => {

  const {objectName, primaryImageSmall} = object

  return (
    <div className="card">
      <img className="card__image" src={primaryImageSmall} alt={objectName} />
      <p className="card__name">{objectName}</p>
    </div>
  );
}

export default Card;
