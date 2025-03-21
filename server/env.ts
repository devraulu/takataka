import { Session } from '#root/database/types/session';
import { UserResponse } from '#root/lib/server/session';

type Env = {
    Variables: {
        session: Session | null;
        user: UserResponse | null;
    };
};

export default Env;
