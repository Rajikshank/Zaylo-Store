"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { LogOutIcon, Moon, SettingsIcon, Sun, TruckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";

export default function UserButton({ user }: Session) {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  function setSwitchState() {
    switch (theme) {
      case "dark":
        return setChecked(true);
      case "light":
        return setChecked(false);

      case "system":
        return setChecked(false);
    }
  }
  if (user) {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">
                  {user.name?.charAt(0).toLocaleUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className="mb-4 p-4 flex flex-col items-center bg-primary/25 rounded-lg">
            {user.image && (
              <Image
                className="rounded-full"
                width={40}
                height={40}
                src={user.image}
                alt={user.name!}
              />
            )}
            <p className="text-sm font-semibold">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">
              {user.email}
            </span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/orders")}
            className="py-4 group font-medium cursor-pointer "
          >
            <TruckIcon
              size={14}
              className="mr-3 group-hover:translate-x-1 transition-all duration-300 ease-in-out "
            />{" "}
            My Orders
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/settings")}
            className="group py-4 font-medium cursor-pointer "
          >
            <SettingsIcon
              size={14}
              className="mr-3 group-hover:rotate-180 transition-all duration-300 ease-in-out "
            />{" "}
            Settings
          </DropdownMenuItem>

          {theme && (
            <DropdownMenuItem className="py-4 font-medium cursor-pointer  ">
              <div
                className="group flex items-center flex-row justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex  h-4 mr-6">
                  <Sun
                    size={14}
                    className="group-hover:text-yellow-600 absolute dark:scale-0 dark:-rotate-90 group-hover:rotate-180 transition-all ease-in-out duration-500"
                  />
                  <Moon
                    size={14}
                    className="group-hover:text-blue-400  dark:scale-100 scale-0 dark:-rotate-90 "
                  />
                </div>
                <p className="dark:text-blue-400 text-secondary-foreground/75 text-yellow-400  ">
                  {theme[0].toUpperCase() + theme?.slice(1)}
                </p>
                <Switch
                  className="scale-75 "
                  checked={checked}
                  onCheckedChange={(e) => {
                    setChecked((prev) => !prev);
                    console.log(e);
                    if (e) setTheme("dark");
                    if (!e) setTheme("light");
                  }}
                />
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => signOut()}
            className="group py-4 focus:bg-destructive/30 font-medium cursor-pointer transition-all duration-500"
          >
            <LogOutIcon
              size={14}
              className="mr-3 group-hover:scale-90 transition-all duration-300 ease-in-out"
            />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
