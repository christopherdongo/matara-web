"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import logo_matara from "@/assets/logo_matara.png";
import {
  MapPinIcon,
  MapIcon,
  InformationCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/20/solid";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {useWindowDimensions} from "@/hooks/useWindowDimensions";
import { useScroll } from '@/hooks/useScroll'

const data = [
  {
    name: "Información",
    description: "Perla de Antabamba",
    href: "#about",
    icon: BookmarkIcon,
  },
  {
    name: "Lugares",
    description: "Lugares para Conocer",
    href: "#places",
    icon: MapIcon,
  },
  {
    name: "Ubicación",
    description: "Ubicación de Matara",
    href: "#location",
    icon: MapPinIcon,
  },
  {
    name: "Historia",
    description: "Antepasados de Matara",
    href: "#history",
    icon: InformationCircleIcon,
  },
];

export function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const {width} = useWindowDimensions();
  const { scrollPosition } = useScroll()

  useEffect(() => {
    if (width > 1024) {
      setOpenMobile(false);
    }
  }, [width]);


  return (
    <header className={`h-16 w-full fixed z-30 ${scrollPosition > 200 ? "bg-white backdrop-blur-md bg-opacity-20" : "bg-transparent"}`}>
      <nav className="h-16 w-full flex gap-10 flex-row justify-between lg:pl-4 lg:pr-4">
        <a className="w-60 flex justify-start items-end pl-4"
        href="#banner"
        >
          <Image
            src={logo_matara}
            alt="Picture of the author"
            className="cursor-pointer h-14 w-32"
          />
        </a>

        <div className="flex lg:hidden pr-4">
          <button type="button" onClick={() => setOpenMobile(!openMobile)}>
            <span className="sr-only pr-4">Open main Menu</span>
            <Bars3Icon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>

        <div
          className={`${
            openMobile
              ? "flex gap-4 flex-wrap flex-col justify-center items-center absolute h-screen bg-slate-400 w-full z-40"
              : "hidden"
          } lg:flex lg:flex-1 lg:flex-row lg:gap-2 lg:justify-center lg:items-center`}
        >

        <div className="w-12 h-12 absolute right-6 top-1 lg:hidden">
          <button
          type="button"
          onClick={() => setOpenMobile(!openMobile)}
          >
            <span>
              <XMarkIcon  className="h-12 w-12" aria-hidden="true" />
            </span>
          </button>

        </div>

          {data.map((item) => (
            <a
            key={item.name}
              className="flex bg-transparent justify-center flex-wrap lg:group lg:relative lg:flex lg:items-center lg:gap-x-6 lg:rounded-lg lg:p-0.5 lg:text-lg lg:leading-3 hover:-translate-y-1 hover:bg-gray-50"
              href={item.href}
              aria-hidden="true"
              onClick={() => {
                if(width < 1024){
                  setOpenMobile(false)
                }
              }}
            >
              <div className="flex h-10 w-32 flex-name items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100">
                <item.icon
                  className="h-6 w-6 text-[#313B94]"
                  aria-hidden="true"
                />
                <span className="text-sm text-black font-bold">{item.name}</span>
              </div>
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
