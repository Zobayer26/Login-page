
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Home } from 'lucide-react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOut from "./SignOut";

const Navabar = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className="bg-zinc-100 border-b border-sm-zinc-200 fixed 
        w-full top-0 z-10 py-2">
            <div className=" container flex justify-between ">
                <Link href="/">
                    <Home />
                </Link>
                {
                    session?.user ? (<SignOut />)
                        : (
                            <Link className={buttonVariants()} href='/sign-in'>Sign in</Link>
                        )
                }
            </div>
        </div>
    );
};

export default Navabar;