import { Banner } from '@/components/Banner'
import { Places } from '@/components/Places'
import { About } from '@/components/About'
import { History } from '@/components/History'
import { Festivities } from '@/components/Festivities'
import Location from '@/components/Location'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Matara",
  description: "La Perla de Antabamba",
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  icons: '/logo_matara.ico',
  abstract:"Matara la perla de antabamba",
  creator: "Christopher Dongo Huarancca",
  generator: "Nextjs",
  publisher: "Vercel",

};

export default function Home() {

  return (
   <>
    <main className="flex min-h-screen flex-col relative">
    <Banner />
    <About />
    <Location/>
    <History />
    <Places />
    <Festivities />
    </main>
   </>
  );
}
