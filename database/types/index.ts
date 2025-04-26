import PasswordResetSessionTable from './password-reset-session';
import SessionTable from './session';
import SessionEmailVerificationRequestTable from './session-email-verification-request';
import SignupSessionTable from './signup_session';
import UserTable from './user';

export default interface Database {
    appUser: UserTable;
    userSession: SessionTable;
    signupSession: SignupSessionTable;
    sessionEmailVerificationRequest: SessionEmailVerificationRequestTable;
    passwordResetSession: PasswordResetSessionTable;
}
