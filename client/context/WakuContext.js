"use client"

import { LightNodeProvider } from "@waku/react";

const NODE_OPTIONS = { defaultBootstrap: true };

export function WakuProvider({children}) {
    return (
        <LightNodeProvider options={NODE_OPTIONS}>
            {children}
        </LightNodeProvider>
    )
}