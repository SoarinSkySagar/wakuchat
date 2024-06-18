import { WakuProvider } from "./WakuContext";
import { ChakraUIProvider } from "./ChakraUIContext";
import { AccountProvider } from "./AccountContext";

export function Providers({children}) {
    return (
        <AccountProvider>
            <WakuProvider>
                <ChakraUIProvider>
                    {children}
                </ChakraUIProvider>
            </WakuProvider>
        </AccountProvider> 
    )
}