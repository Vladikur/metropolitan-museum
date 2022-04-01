interface IConstituents {
  constituentID: number;
  role: string;
  name: string;
}

export interface IObject {
  objectID: number;
  primaryImage: string;
  primaryImageSmall: string;
  culture: string;
  objectName: string;
  department: string;
  objectDate: string;
  medium: string;
  classification: string;
  constituents: IConstituents[];
}

export interface IDepartment {
  total: number;
  objectIDs: number[];
}