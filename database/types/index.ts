import PasswordResetSessionTable from './password-reset-session';
import SessionTable from './session';
import SessionEmailVerificationRequestTable from './session-email-verification-request';
import UserTable from './user';

export default interface Database {
    appUser: UserTable;
    userSession: SessionTable;
    sessionEmailVerificationRequest: SessionEmailVerificationRequestTable;
    passwordResetSession: PasswordResetSessionTable;
}
