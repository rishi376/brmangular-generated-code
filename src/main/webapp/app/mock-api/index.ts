/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AcademyMockApi } from 'app/mock-api/apps/academy/api';
import { ActivitiesMockApi } from 'app/mock-api/pages/activities/api';
import { AnalyticsMockApi } from 'app/mock-api/dashboards/analytics/api';
import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { ChatMockApi } from 'app/mock-api/apps/chat/api';
import { ContactsMockApi } from 'app/mock-api/apps/contacts/api';
import { CryptoMockApi } from 'app/mock-api/dashboards/crypto/api';
import { ECommerceInventoryMockApi } from 'app/mock-api/apps/ecommerce/inventory/api';
import { FileManagerMockApi } from 'app/mock-api/apps/file-manager/api';
import { FinanceMockApi } from 'app/mock-api/dashboards/finance/api';
import { HelpCenterMockApi } from 'app/mock-api/apps/help-center/api';
import { IconsMockApi } from 'app/mock-api/ui/icons/api';
import { MailboxMockApi } from 'app/mock-api/apps/mailbox/api';
import { MessagesMockApi } from 'app/mock-api/common/messages/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { NotesMockApi } from 'app/mock-api/apps/notes/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { ProjectMockApi } from 'app/mock-api/dashboards/project/api';
import { SearchMockApi } from 'app/mock-api/common/search/api';
import { ScrumboardMockApi } from 'app/mock-api/apps/scrumboard/api';
import { ShortcutsMockApi } from 'app/mock-api/common/shortcuts/api';
import { TasksMockApi } from 'app/mock-api/apps/tasks/api';
import { UserMockApi } from 'app/mock-api/common/user/api';
import { AccountMockAPI } from './common/account/api';
import { JhiAuthMockApi } from './common/jhiAuth/api';
import { AccountAdminMockApi } from './common/accountAdmin/api';
import { UserAgreementMockApi } from './common/userAgreement/api';
import { CommunicationsMockApi } from './common/communications/api';
import { ProfileMockApi } from './common/profile/api';
import { ApplicationFunctionalityMockApi } from './common/application/api';
import { CustomerMockApi } from './common/profile/customer.api';
import { PaymentInfoMockApi } from './common/profile/payment-info.api';
import { PassportMockApi } from './common/profile/passport.api';
/* brm-needle-add-mockApi-import - brm-generator will add mockApi import here */

export const mockApiServices = [
  AcademyMockApi,
  ActivitiesMockApi,
  AnalyticsMockApi,
  AuthMockApi,
  ChatMockApi,
  ContactsMockApi,
  CryptoMockApi,
  ECommerceInventoryMockApi,
  FileManagerMockApi,
  FinanceMockApi,
  HelpCenterMockApi,
  IconsMockApi,
  MailboxMockApi,
  MessagesMockApi,
  NavigationMockApi,
  NotesMockApi,
  NotificationsMockApi,
  ProjectMockApi,
  SearchMockApi,
  ScrumboardMockApi,
  ShortcutsMockApi,
  TasksMockApi,
  UserMockApi,
  AccountMockAPI,
  JhiAuthMockApi,
  AccountAdminMockApi,
  CommunicationsMockApi,
  UserAgreementMockApi,
  ProfileMockApi,
  ApplicationFunctionalityMockApi,
  CustomerMockApi,
  PaymentInfoMockApi,
  PassportMockApi
  /* brm-needle-add-mockApi-to-array - brm-generator will add mockApi here */
];
