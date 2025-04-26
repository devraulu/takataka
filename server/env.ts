import { SessionResponse } from './lib/session';
import { UserResponse } from './lib/user';

type Env = {
    Variables: {
        session: SessionResponse | null;
        user: UserResponse | null;
    };
};

export default Env;
