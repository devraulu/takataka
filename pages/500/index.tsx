import './styles.css';

FiveHundredPage.getLayout = (page: React.ReactElement) => page;

export default function FiveHundredPage() {
    return (
        <div className='mx-auto'>
            <h1 className='text-6xl font-black text-center'>
                500 - INTERNAL SERVER ERROR
            </h1>
        </div>
    );
}
