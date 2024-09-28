'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return(
        <nav className="z-[99] sticky top-0 flex w-full h-24 items-center justify-between bg-white/30 px-2 py-2 backdrop-blur-sm rounded-xl">
            <div className="w-full p-4 flex items-center justify-between mx-8 gap-8">
                <div className="flex items-center mr-16">
                    <h1 className="text-2xl font-bold">
                        <span className="">XxMEGAxX</span>
                    </h1>
                </div>
                <div className="w-full flex justify-between items-center">
                    <div className="w-full flex gap-12">
                        <a href="/" className="text-lg font-semibold">Home</a>
                        <a href="/portfolio" className="text-lg font-semibold">Portfolio</a>
                        <a href="/blog" className="text-lg font-semibold">Blog</a>
                        <a href="/about" className="text-lg font-semibold">About</a>
                        <a href="/contact" className="text-lg font-semibold">Contact</a>
                    </div>
                    <div>
                        burger
                    </div>
                </div>
            </div>
        </nav>
    )
}
