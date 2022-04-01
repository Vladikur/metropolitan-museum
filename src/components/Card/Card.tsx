import React, { FC } from 'react';
import { IObject } from '../../types/types';
import vase from '../../images/vase.png';

interface CardProps {
  object: IObject;
}

const Card: FC<CardProps> = ({ object }) => {

  const {objectName, primaryImageSmall, department, objectDate, constituents, medium, classification} = object

  return (
  <div className="content-wrapper">
    <div className="news-card">
      <img src={primaryImageSmall ? primaryImageSmall : vase} alt="" className="news-card__image" />
      <div className="news-card__text-wrapper">
        <h2 className="news-card__title">{department ? department : 'unknown'}</h2>
        <div className="news-card__post-date">{objectDate ? objectDate : 'unknown'}</div>
        <div className="news-card__details-wrapper">
          <p className="news-card__excerpt">{objectName ? objectName : 'unknown'}</p>
          <p className="news-card__excerpt">Classification: {classification ? classification : 'unknown'}</p>
          <p className="news-card__excerpt">Medium: {medium ? medium : 'unknown'}</p>
          <p className="news-card__excerpt">Author: {constituents ? constituents[0].name : 'unknown'}</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Card;
