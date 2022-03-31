import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { IObject } from '../../types/types';
import { IDepartment } from '../../types/types';
import { departmentInitialState } from '../../constants/constants';


const App = () => {

  const [objects, setObjects] = useState<IObject[]>([])
  const [department, setDepartment] = useState<IDepartment>(departmentInitialState)

  useEffect(() => {
    fetchDepartment()
  }, [])

  useEffect(() => {
    if (department.objectIDs.length > 5) {
      fetchAllObjects()
    }
  }, [department])

  const fetchDepartment = () => {
    axios.get<IDepartment>(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${13}&q=cat`)
    .then(res => {
      setDepartment(res.data)
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const fetchObject = (id: number) => {
    axios.get<IObject>(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
    .then(res => {
      setObjects([...objects, res.data])
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const fetchAllObjects = () => {
    const objectsArray: number[] = department.objectIDs
    const firstSixObjects: number[] = objectsArray.slice(0, 6)
    fetchObject(firstSixObjects[0])
    fetchObject(firstSixObjects[1])
    fetchObject(firstSixObjects[2])
    fetchObject(firstSixObjects[3])
    fetchObject(firstSixObjects[4])
    fetchObject(firstSixObjects[5])
  }

  return (
    <div className="app">
      {objects.map((object) => (
        <Card
          key={object.objectID}
          object={object}
        />
      ))}
    </div>
  );
}

export default App;
