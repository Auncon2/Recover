export interface IViewProjectList {
  approval_status: string;
  description: string;
  firstname: string;
  lastname: string;
  location: string;
  profileimageurl: string;
  projectid: number;
  projectname: string;
  projectstatus: string;
  projecttype: string;
}

export interface IViewProjectView {
  approval_status: string;
  description: string;
  developerenvironmentalimpact: [
    {
      certificationstatus: string;
      impactcategory: string;
      impactdescription: string;
      impactvalue: number;
      notes: string;
    }
  ];
  developerprojectimages: [
    {
      imagecaption: string;
      imagefileurl: string;
      imagetype: string;
      notes: string;
    }
  ];
  location: string;
  projectname: string;
  projectstatus: string;
  projecttype: string;
  projectunits: [
    {
      availabilitystatus: string;
      floornumber: number;
      price: number;
      squarefootage: number;
      unitname: string;
      unittype: string;
    }
  ];
}

export interface IViewProjectDeleteRequest {
  createdat: string;
  id: number;
  message: string;
  project_id: number;
  status: string;
  user_id: number;
}
