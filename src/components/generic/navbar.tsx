import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export const items: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Corsi", href: "/courses" },
    { label: "Contatti", href: "/contatti" },
];

export const secondaryItems: { label: string; href: string }[] = [
    { label: "Sitemap", href: "#" },
    { label: "Cookies", href: "#" },
];

export const Navbar = () => {
    return (
        <section className="pt-6 pb-6">
            <div className="contained">
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                                className="w-8"
                                alt="logo"
                            />
                            <span className="text-xl font-bold">Sirio Next Gen</span>
                        </div>
                        <div className="flex items-center">
                            {items.map((item) => (
                                <Button
                                    key={item.href}
                                    asChild
                                    variant={"ghost"}
                                    className="text-muted-foreground"
                                >
                                    <Link href={item.href}>{item.label}</Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                    {/* <div className="flex gap-2">RIGHT ICON HERE</div> */}
                </nav>
                {/* MOBILE NAV */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                                className="w-8"
                                alt="logo"
                            />
                            <span className="text-xl font-bold">Sirio Next Gen</span>
                        </div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={"outline"} size={"icon"}>
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <div className="flex items-center gap-2">
                                            <img
                                                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                                                className="w-8"
                                                alt="logo"
                                            />
                                            <span className="text-xl font-bold">Sirio Next Gen</span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 h-full">
                                    <div className="my-8 flex flex-col gap-4 items-start flex-1">
                                        {items.map((item) => (
                                            <Button
                                                key={item.href}
                                                asChild
                                                variant={"ghost"}
                                                className="font-semibold h-auto"
                                            >
                                                <Link href={item.href}>{item.label}</Link>
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="border-t pt-4 pb-10">
                                        <div className="grid grid-cols-2 justify-start">
                                            {secondaryItems.map((item) => (
                                                <Button
                                                    key={item.href}
                                                    asChild
                                                    variant={"ghost"}
                                                    className="text-muted-foreground h-auto"
                                                >
                                                    <Link href={item.href}>{item.label}</Link>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};
