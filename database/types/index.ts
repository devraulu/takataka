import SessionTable from './session';
import UserTable from './user';

export default interface Database {
    appUser: UserTable;
    userSession: SessionTable;
}
