"use client";
import React from "react";
import {  useFormStatus } from "react-dom";


export default function PostButton() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-blue-400  p-2 hover:bg-blue-600 disabled:bg-slate-500" type="submit" disabled={pending} >
      Submit
    </button>
  );
}
