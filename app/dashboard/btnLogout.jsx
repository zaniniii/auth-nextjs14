'use client';

import { signOut } from "next-auth/react";

export default function BtnLogout() {
    return (
        <button onClick={() => signOut()} className="btn mt-5">Logout</button>
    )

}