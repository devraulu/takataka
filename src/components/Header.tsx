import Logo from './Logo';

function Header() {
    return (
        <div className={'flex justify-center mt-8 lg:mt-16 xl:mt-24'}>
            <Logo />
        </div>
    );
}

export default Header;
