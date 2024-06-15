
export function Banner() {


    return (
        <section
        id="banner"
        className="w-full h-dvh lg:h-screen relative flex justify-end items-end"
        style={{ backgroundImage: 'url("https://storage.googleapis.com/web-matara/background_matara.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition:'center'}}
        >

        <div className='absolute flex-1 w-full h-72'>
            <h1 className='text-center text-3xl sm:text-7xl w-full'>MATARA</h1>
            <h2 className='text-center text-2xl sm:text-4xl w-full'>La Perla de Antabamba</h2>
        </div>

        </section>
    )
}