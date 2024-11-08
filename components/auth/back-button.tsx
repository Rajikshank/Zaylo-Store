'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

type BackButtonType={
    href:string
    label:string
}

export  const BackButton =({href,label}:BackButtonType)=>{

    return (<Button className="font-medium">
<Link aria-label={label} href={href}>{label}</Link>
    </Button>)
}