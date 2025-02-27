import Logo from './logo';
import User from './user';

function Header() {
    return (
        <div
            className={
                'flex justify-between items-center mt-8 lg:mt-16'
            }
        >
            <Logo />
            <User />
        </div>
    );
}

export default Header;
