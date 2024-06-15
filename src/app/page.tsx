import { Banner } from '@/components/Banner'
import { Places } from '@/components/Places'
import { About } from '@/components/About'
import { History } from '@/components/History'
import { Location } from '@/components/Location'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Matara",
  description: "La Perla de Antabamba",
};

export default function Home() {

  return (
   <>

    <main className="flex min-h-screen flex-col items-center relative">
    <Banner />
    <About />
    <Location/>
    <History />
    <Places />
    </main>
   </>
  );
}
