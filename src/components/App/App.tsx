import { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from '../Gallery/Gallery';
import { IObject } from '../../types/types';
import { IDepartment } from '../../types/types';
import { departmentInitialState } from '../../constants/constants';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Preloader from '../Preloader/Preloader';


const App = () => {

  const [objects, setObjects] = useState<IObject[]>([])
  const [department, setDepartment] = useState<IDepartment>(departmentInitialState)
  const [preloader, setPreloader] = useState<boolean>(true)
  const [errorMassage, setErrorMassage] = useState<string>('')

  useEffect(() => {
    if (department.objectIDs.length > 0) {
      fetchAllObjects()
    } else {
      setPreloader(false)
    }
  }, [department])

  const fetchObjectIds = (value: string) => {
    setPreloader(true)
    setObjects([])
    setErrorMassage('')
    axios.get<IDepartment>(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${value}`)
    .then(res => {
      if (res.data.objectIDs) {
        setDepartment(res.data)
      } else {
        console.log('hi')
        setPreloader(false)
        setErrorMassage('По вашему запросу ничего не найдено.')
      }
      console.log(res.data)
      return res
    })
    .catch((err) => {
      console.log(err)
      setPreloader(false)
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
    await Promise.all(vievObjects.map(async (value) => {
      let v = await fetchObject(value)
      const data: IObject = v.data
      return data;
    }))
    .then(res => {
      setObjects(res);
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
      setErrorMassage('По вашему запросу ничего не найдено.')
    })
    .finally(() => {
      setPreloader(false)
    })
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
      {errorMassage ? <p className="app__error">{errorMassage}</p> : ''}
      { preloader ? <Preloader/> : <Gallery objects={objects}/> }
    </div>
  );
}

export default App;
