/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';
// TODO: get rid of all the below not used navigations
export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboard',
    title: 'dashboard',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: '/dashboard'
  }
];
export const compactNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: 'launchpad/dashboard'
  },
  {
    id: 'application',
    title: 'Application',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: 'launchpad/application'
  }
];
export const futuristicNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: 'launchpad/dashboard'
  },
  {
    id: 'application',
    title: 'Application',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: 'launchpad/application'
  }
];
export const horizontalNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: 'launchpad/dashboard'
  },
  {
    id: 'application',
    title: 'Application',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: 'launchpad/application'
  }
];

// TODO: Change any to Application Interface
export const applicationNavigation: any[] = [
  {
    id: 12345,
    name: 'Sample Application 1',
    status: 'Active'
  },
  {
    id: 12346,
    name: 'Sample Application 2',
    status: 'Active'
  }
];
