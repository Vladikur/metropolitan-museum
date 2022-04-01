import { IObject } from "../types/types";
import { IDepartment } from "../types/types";

export const objectInitialState: IObject = {
  objectID: 1,
  primaryImage: '',
  primaryImageSmall: '',
  culture: '',
  objectName: '',
  department: '',
  objectDate: '',
  medium: '',
  classification: '',
  constituents: [
    {
      constituentID: 1,
      role: '',
      name: '',
    }
  ],
}

export const departmentInitialState: IDepartment = {
  total: 1,
  objectIDs: [],
}