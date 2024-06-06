export interface IViewDeveloper {
  address: string;
  contactnumber: string;
  email: string;
  firstname: string;
  is_verified: boolean;
  lastname: string;
  profileimageurl: string;
  updatedat: string;
  userid: number;
  username: string;
  userrole: string;
  usertype: string;
}

export interface IViewDeveloperDetails {
  address: string;
  contactnumber: string;
  developer_documents: [
    {
      createdat: string;
      documentfileurl: string;
      documentid: number;
      documentname: string;
      documenttype: string;
      notes: string;
      updatedat: null;
      uploaddate: string;
    }
  ];
  email: string;
  firstname: string;
  is_verified: null;
  lastname: string;
  profile_created_at: string;
  profileimageurl: string;
  username: string;
}
