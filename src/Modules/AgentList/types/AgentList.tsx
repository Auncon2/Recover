export interface IViewAgent {
  agencyname: string;
  email: string;
  is_verified: boolean;
  licensenumber: string;
  specializations: string;
  userid: number;
  username: string;
  userrole: string;
  usertype: string;
  yearsofexperience: number;
}

export interface IViewAgentDetails {
  address: string;
  agencyname: string;
  contactnumber: string;
  documentname: string;
  documenturl: string;
  email: string;
  firstname: string;
  is_verified: boolean;
  lastname: string;
  licensenumber: string;
  profileimageurl: string;
  specializations: string;
  userid: number;
  username: string;
  userrole: string;
  usertype: string;
  yearsofexperience: number;
}

export interface IViewAgentProperties {
  address: string;
  agentimage: string;
  approvalstatus: string;
  bath: number;
  bed: number;
  category: string;
  createdat: string;
  createdby: number;
  description: string;
  feature_image: string;
  firstname: string;
  location: string;
  measurement: string;
  propertyid: number;
  propertyname: string;
  size: number;
  status: string;
  title: string;
  type: string;
}
