import { Authority } from 'app/config/authority.constants';

export type USERTYPE = {
  id: number;
  activated: boolean;
  authorities: Authority[];
  email: string;
  firstName: string;
  langKey: string;
  lastName: string;
  login: string;
  imageUrl: string;
};

/* eslint-disable */
const adminUser = {
  id: 1,
  activated: true,
  authorities: [Authority.admin, Authority.user],
  email: 'admin@localhost',
  firstName: 'Administrator',
  langKey: 'en',
  lastName: 'Administrator',
  login: 'admin',
  imageUrl: 'assets/images/avatars/brian-hughes.jpg'
};

/* eslint-disable */
const regularUser = {
  id: 2,
  activated: true,
  authorities: [Authority.user],
  email: 'regularUser@localhost',
  firstName: 'Mock Regular User',
  langKey: 'en',
  lastName: 'Mock Regular User',
  login: 'user',
  imageUrl: 'assets/images/avatars/brian-hughes.jpg'
};

const csUser = {
  id: 3,
  activated: true,
  authorities: [Authority.backOfficeUser],
  email: 'csUser@localhost',
  firstName: 'Mock CS User',
  langKey: 'en',
  lastName: 'Mock CS User',
  login: 'csUser',
  imageUrl: 'assets/images/avatars/brian-hughes.jpg'
};
export const allUsers: USERTYPE[] = [adminUser, regularUser, csUser];
