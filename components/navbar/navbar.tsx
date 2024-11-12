import { auth } from "@/server/auth";
import UserButton from "./userButton";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "@/components/navbar/logo";

export default async function Navbar() {
  const session = await auth();
  console.log(session);
  return (
    <header className="bg-emerald-200 ">
      <ul className="flex justify-between text-black py-2">
        <li>
          <Link href={"/"} aria-label="AgroStore Logo">
            {" "}
            <Logo />
          </Link>
        </li>

        {!session ? (
          <li>
            {" "}
            <Button asChild>
              <Link href="/auth/login" className="flex gap-2">
                <LogIn size={16} /> <span>Login</span>{" "}
              </Link>
            </Button>
          </li>
        ) : (
          <li>
            <UserButton expires={session?.expires} user={session?.user} />
          </li>
        )}
      </ul>
    </header>
  );
}
