"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";
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

export default function UserButton({ user }: Session) {
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
          <DropdownMenuItem className="py-4 group font-medium cursor-pointer transition-all duration-500">
            <TruckIcon
              size={14}
              className="mr-3 group-hover:translate-x-1 transition-all duration-300 ease-in-out "
            />{" "}
            My Orders
          </DropdownMenuItem>
          <DropdownMenuItem className="group py-4 font-medium cursor-pointer transition-all duration-500">
            <SettingsIcon
              size={14}
              className="mr-3 group-hover:rotate-180 transition-all duration-300 ease-in-out "
            />{" "}
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem className="py-4 font-medium cursor-pointer transition-all duration-500">
            <div className="flex items-center flex-row justify-center">
              <Sun size={14} />
              <Moon size={14} />
            </div>
          </DropdownMenuItem>
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
