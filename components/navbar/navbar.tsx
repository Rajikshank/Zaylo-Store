import { auth } from "@/server/auth";
import UserButton from "./userButton";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "@/components/navbar/logo";
import CartDrawer from "../cart/cart-drawer";

export default async function Navbar() {
  const session = await auth();
  console.log(session);
  return (
    <header className="bg-white dark:bg-slate-200 border-b border-black    ">

      <ul className="flex justify-between text-black px-12 lg:px-8 max-w-8xl mx-auto items-center md:gap-8 gap-4">
        <li className="flex items-center  flex-1">
          <Link href={"/"} aria-label="AgroStore Logo">
            {" "}
            <Logo />
          </Link>
        </li>

        <li className="relative flex items-center hover:bg-muted ">
          <CartDrawer />
        </li>

        {!session ? (
          <li className="flex items-center justify-center">
            {" "}
            <Button asChild>
              <Link href="/auth/login" className="flex gap-2">
                <LogIn size={16} /> <span>Login</span>{" "}
              </Link>
            </Button>
          </li>
        ) : (
          <li className="flex items-center justify-center">
            <UserButton expires={session?.expires} user={session?.user} />
          </li>
        )}
      </ul>
    </header>
  );
}
