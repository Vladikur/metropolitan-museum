import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { IObject } from '../../types/types';
import { IDepartment } from '../../types/types';
import { departmentInitialState } from '../../constants/constants';


const App = () => {
  const [firstColumnObjects, setFirstColumnObjects] = useState<IObject[]>([])
  const [secondColumnObjects, setSecondColumnObjects] = useState<IObject[]>([])
  const [department, setDepartment] = useState<IDepartment>(departmentInitialState)

  useEffect(() => {
    fetchDepartment()
  }, [])

  useEffect(() => {
    if (department.objectIDs.length > 2) {
      fetchAllObjects()
    }
  }, [department])

  const fetchDepartment = () => {
    axios.get<IDepartment>(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste Renoir`)
    .then(res => {
      setDepartment(res.data)
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const fetchObject = (id: number) => {
    return axios.get<IObject>(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
  }

  const fetchAllObjects = () => {
    const objectsArray: number[] = department.objectIDs
    const vievObjects: number[] = objectsArray.slice(0, 10)
    axios.all([
      fetchObject(vievObjects[0]),
      fetchObject(vievObjects[1]),
      fetchObject(vievObjects[2]),
      fetchObject(vievObjects[3]),
      fetchObject(vievObjects[4]),
      fetchObject(vievObjects[5]),
      fetchObject(vievObjects[6]),
      fetchObject(vievObjects[7]),
      fetchObject(vievObjects[8]),
      fetchObject(vievObjects[9]),
    ])
    .then(axios.spread(function (obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10) {
      setFirstColumnObjects([obj1.data, obj3.data, obj5.data, obj7.data, obj9.data])
      setSecondColumnObjects([obj2.data, obj4.data, obj6.data, obj8.data, obj10.data])
    }))
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="app">
      <div className="app__content">
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
    </div>
  );
}

export default App;
