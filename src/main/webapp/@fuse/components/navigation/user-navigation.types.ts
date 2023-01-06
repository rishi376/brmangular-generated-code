import { FuseNavigationItem } from './navigation.types';

export interface UserNavigationItem {
  userGuid: string;
  isAdmin: boolean;
  navigationItems: FuseNavigationItem[];
}
