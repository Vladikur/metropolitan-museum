import { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from '../Gallery/Gallery';
import { IObject } from '../../types/types';
import { IDepartment } from '../../types/types';
import { departmentInitialState } from '../../constants/constants';
import Header from '../Header/Header';
import Search from '../Search/Search';


const App = () => {

  const [objects, setObjects] = useState<IObject[]>([])
  const [department, setDepartment] = useState<IDepartment>(departmentInitialState)

  useEffect(() => {
    if (department.objectIDs.length > 0) {
      fetchAllObjects()
    }
  }, [department])

  const fetchObjectIds = (value: string) => {
    axios.get<IDepartment>(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${value}`)
    .then(res => {
      if (res.data.total) {
        setDepartment(res.data)
      }
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const fetchAllObjects = () => {
    const objectsArray: number[] = department.objectIDs
    const vievObjects: number[] = cutArray(objectsArray)
    getVievObjects(vievObjects);
  }

  const cutArray = (array: number[]): number[] => {
    if (array.length > 10) {
      return array.slice(0, 10)
    } else {
      return array
    }
  }

  async function getVievObjects(vievObjects: number[]) {
    let arr: IObject[] = await Promise.all(vievObjects.map(async (value) => {
      let v = await fetchObject(value);
      const data: IObject = v.data
      return data;
    }));
  
    setObjects(arr);
  }

  const fetchObject = (id: number) => {
    return axios.get<IObject>(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
  }

  return (
    <div className="app">
      <Header/>
      <Search
        searchObjects={fetchObjectIds}
      />
      <Gallery
        objects={objects}
      />
    </div>
  );
}

export default App;
