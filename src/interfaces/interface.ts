export interface projectData{
    title : string,
    description : string
  
  }

  export interface getDataProject{
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
        verificationCode:string ,}
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