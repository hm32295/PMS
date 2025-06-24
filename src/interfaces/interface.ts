export interface projectData{
    title : string,
    description : string,
    projectId? : string,
    employeeId?: string

    
  }


  export interface getDataProject{
    title?: string,
    creationDate?:string,
    description?:string,
    id?:number,
    modificationDate?:string,
    manager?:{
        country?:string,
        creationDate?:string,
        email?:string,
        id?:number ,
        string ?:string,
        isActivated?:boolean ,
        isVerified?:boolean ,
        modificationDate?:string ,
        password?:string ,
        phoneNumber?:string ,
        userName?:string ,
        verificationCode?:string ,}
  }
  export interface paginationPageProps {
    pages: number[];
    funData: (pageSize: number, pageNumber: number, title: string) => void;
    pageData: {
      pageNumber: number;
    };
  }
  export interface pageDataCalc{
    totalNumberOfRecords:number,
    totalNumberOfPages: number ,
    pageNumber : number
  }

  export interface getAllTasks{
    title : string,
    creationDate:string,
    description:string,
    id:number,
    modificationDate:string,
    employee:{
      country: string,
      creationDate: string,
      email:string,
      id:number,
      imagePath:null,
      isActivated:boolean,
      isVerified:boolean,
      modificationDate:string,
      password:string,
      phoneNumber: string,
      userName: string,
      verificationCode:string

    }
    project:{
      title : string,
      creationDate:string,
      description:string,
      id:number,
      modificationDate:string,
      manager:{
        country:string,
        creationDate:string,
        email:string,
        id:number ,
        string :string,
        isActivated:boolean ,
        isVerified:boolean ,
        modificationDate:string ,
        password:string ,
        phoneNumber:string ,
        userName:string ,
        verificationCode:string ,
      }
    },
  }

 export interface employeesType{
    country?:string,
    creationDate?: string,
    email?: string,
    id?:number,
    imagePath?:null,
    isActivated?:boolean ,
    modificationDate? :boolean
    phoneNumber?:string,
    userName? : string,

}