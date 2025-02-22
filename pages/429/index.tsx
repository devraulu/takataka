import './styles.css';

FourOhTwoHundredPage.getLayout = (page: React.ReactElement) => page;

export default function FourOhTwoHundredPage() {
    return (
        <div className='mx-auto'>
            <h1 className='text-6xl font-black text-center'>
                429 - HORRIBLE TOO MANY REQUESTS
            </h1>
        </div>
    );
}
