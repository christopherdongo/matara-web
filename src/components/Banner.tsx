
export function Banner() {


    return (
        <section
        id="banner"
        className="w-full h-dvh lg:h-screen relative flex justify-center items-center lg:justify-start lg:items-start"
        style={{ backgroundImage: 'url("/background_matara.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition:'center'}}
        >

        <div className='absolute flex flex-col mt-32 md:mt-24 md:ml-4 pl-4 pr-4 md:p-0'>
            <h1 className='text-center text-5xl md:text-6xl lg:text-7xl w-full font-customSang text-gray1 md:mt-5'>MATARA</h1>
            <h2 className='text-center text-3xl md:text-3xl lg:text-5xl w-full font-customSang text-gray1'>La Perla de Antabamba</h2>
        </div>

        </section>
    )
}

