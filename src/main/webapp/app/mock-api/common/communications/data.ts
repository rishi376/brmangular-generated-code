export interface ICommunication {
  communicationId: string;
  applicationId: string;
  communicationType: 'Normal' | 'Lateral Entry';
  sentOn: string;
  sentTo: string;
  actionRequired: 'Yes' | 'No';
  viewCommunication: boolean;
}

export interface ICommunicationsAction {
  communicationId: string;
  actionId: string;
  actionName: string;
  dueDate: string;
  status: 'Pending Approval' | 'New' | 'Rejected' | 'Approved';
}

const communicationDataMock: ICommunication[] = [
  {
    communicationId: '123Abce',
    applicationId: '1ABCDE',
    communicationType: 'Normal',
    sentOn: '2022-05-25T18:18:41.070Z',
    sentTo: 'anglesvar@gmail.com',
    actionRequired: 'Yes',
    viewCommunication: true
  },
  {
    communicationId: '456Abce',
    applicationId: '1ABCDE',
    communicationType: 'Lateral Entry',
    sentOn: '2022-05-25T18:18:41.070Z',
    sentTo: 'anglesvar123@gmail.com',
    actionRequired: 'No',
    viewCommunication: true
  },
  {
    communicationId: '123Hhas',
    applicationId: '1ABCDE',
    communicationType: 'Normal',
    sentOn: '2022-05-25T18:18:41.070Z',
    sentTo: 'olc.admin@gmail.com',
    actionRequired: 'Yes',
    viewCommunication: false
  },
  {
    communicationId: '123asff',
    applicationId: '1ABCDE',
    communicationType: 'Lateral Entry',
    sentOn: '2022-05-25T18:18:41.070Z',
    sentTo: 'rikshith@gmail.com',
    actionRequired: 'Yes',
    viewCommunication: true
  }
];

const communicationsActionDataMock: ICommunicationsAction[] = [
  {
    communicationId: '123Abce',
    actionId: '1234567890',
    actionName: "Rolex's Passport",
    status: 'Approved',
    dueDate: new Date().toDateString()
  },
  {
    communicationId: '123Hhas',
    actionId: '123234671230',
    actionName: "Joe's Passport",
    status: 'Approved',
    dueDate: new Date().toDateString()
  },
  {
    communicationId: '123asff',
    actionId: '1234543290',
    actionName: "Baker's Passport",
    status: 'Approved',
    dueDate: new Date().toDateString()
  },
  {
    communicationId: '123asff',
    actionId: '12345124890',
    actionName: "Rambo's Passport",
    status: 'Pending Approval',
    dueDate: new Date().toDateString()
  },
  {
    communicationId: '123Abce',
    actionId: '1232314290',
    actionName: "Baker's Passport",
    status: 'Approved',
    dueDate: new Date().toDateString()
  },
  {
    communicationId: '456Abce',
    actionId: '1234517890',
    actionName: "Rambo's Passport",
    status: 'Approved',
    dueDate: new Date().toDateString()
  },
  {
    communicationId: '123asff',
    actionId: '12434537890',
    actionName: "Rambo's Passport",
    status: 'Pending Approval',
    dueDate: new Date().toDateString()
  },
  {
    communicationId: '456Abce',
    actionId: '123451237890',
    actionName: "Rambo's Passport",
    status: 'New',
    dueDate: new Date().toDateString()
  }
];

export const communicationActionData = {
  '123Abce': communicationsActionDataMock.filter(val => val.communicationId === '123Abce'),
  '456Abce': communicationsActionDataMock.filter(val => val.communicationId === '456Abce'),
  '123asff': communicationsActionDataMock.filter(val => val.communicationId === '123asff'),
  '123Hhas': communicationsActionDataMock.filter(val => val.communicationId === '123Hhas')
};

export const communicationsData = {
  application1: communicationDataMock.concat(communicationDataMock),
  application2: communicationDataMock.slice(0, 2)
};
