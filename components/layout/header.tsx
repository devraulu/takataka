import Logo from './logo';
import User from './user';

function Header() {
    return (
        <div className={'flex justify-between mt-8 lg:mt-16 xl:mt-24'}>
            <Logo />
            <User />
        </div>
    );
}

export default Header;
