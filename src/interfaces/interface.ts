export interface projectData{
    title : string,
    description : string
  
  }
//   id
// title
// manager
// userName
// creationDate
  export interface getDataProject{
    title : string,
    creationDate:string,
    id:number,
    manager:{userName:string}
  }