import Image from "next/image";
import lagunaAbout from '@/assets/laguna_matara_about.jpg'
import mataraVista from '@/assets/matara_vista.jpg'

export function About(){

    return(
        <section id="about" className="max-w-screen-2xl pl-5 pr-5 sm:p-0 xl:ml-auto xl:mr-auto grid grid-cols-1 lg:grid-cols-2 mt-20 gap-12">
            <article className="col-span-1 grid place-content-center items-center sm:pl-10 sm:pr-10 lg:pl-16">
            <h3 className="mb-10">MATARA</h3>
            <span className="font-bold text-2xl">
            El pueblo de Matara, situado a una altitud de 3369
msnm y a unos 5.5 km al ONO de la capital provincial, es el único anexo del distrito de
Huaquirca, provincia de Antabamba, departamento
de Apurímac.
            </span>

            <div className="flex flex-col sm:justify-end sm:items-end mt-12 mb-12">
                <p className="w-full pl-16">Matara es un pueblo antiguo y, como hoy, siempre fue un anexo de Huaquirca. Según el muy detallado informe de Joseph Arias de Torres y Sanabria.</p>

            </div>
            <div className="mb-12 w-full pl-16">
            <a
            href="https://revistasinvestigacion.unmsm.edu.pe/index.php/sociales/article/view/16936/17254"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white px-6 py-4 rounded-md"
            >
               LEER MAS
            </a>
            </div>
            <Image 
               alt="imagen de matara"
               src={mataraVista}
               className="w-full h-auto"
               />
            </article>
            <article className="hidden lg:col-span-1 lg:grid lg:content-start lg:place-content-end pr-16">
              <Image 
               alt="imagen de matara"
               src={lagunaAbout}
               className="w-full max-h-[40rem] h-auto mt-16"
               />
            </article>
        </section>
    )
} 