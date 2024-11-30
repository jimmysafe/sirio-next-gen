import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { items, secondaryItems } from "./navbar";
import Link from "next/link";

const sections = [
    {
        title: "Azienda",
        links: items,
    },
    {
        title: "Risorse",
        links: secondaryItems,
    },
];

export const Footer = () => {
    return (
        <section className="py-32 bg-secondary text-secondary-foreground">
            <div className="contained">
                <footer>
                    <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
                        <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
                            <div>
                                <span className="flex items-center justify-center gap-4 lg:justify-start">
                                    <img
                                        src="https://www.shadcnblocks.com/images/block/block-1.svg"
                                        alt="logo"
                                        className="h-11"
                                    />
                                    <p className="text-3xl font-semibold">Sirio Next Gen</p>
                                </span>
                                <p className="mt-6 text-sm ">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Quibusdam explicabo incidunt.
                                </p>
                            </div>
                            <ul className="flex items-center space-x-6 ">
                                <li className="font-medium ">
                                    <a href="#">
                                        <Instagram className="size-6" />
                                    </a>
                                </li>
                                <li className="font-medium ">
                                    <a href="#">
                                        <Facebook className="size-6" />
                                    </a>
                                </li>
                                <li className="font-medium ">
                                    <a href="#">
                                        <Twitter className="size-6" />
                                    </a>
                                </li>
                                <li className="font-medium ">
                                    <a href="#">
                                        <Linkedin className="size-6" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-6 lg:gap-20 text-right">
                            {sections.map((section, sectionIdx) => (
                                <div key={sectionIdx}>
                                    <h3 className="mb-6 font-bold">{section.title}</h3>
                                    <ul className="space-y-4 text-sm ">
                                        {section.links.map((link, linkIdx) => (
                                            <li key={linkIdx} className="font-medium ">
                                                <Link href={link.href}>{link.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium  lg:flex-row lg:items-center lg:text-left">
                        <p>©{new Date().getFullYear()} SirioNextGen</p>
                        <ul className="flex justify-center gap-4 lg:justify-start">
                            <li className="">
                                <a href="#"> Termini e Condizioni</a>
                            </li>
                            <li className="">
                                <a href="#"> Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </section>
    );
};
