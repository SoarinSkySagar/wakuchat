import { WakuProvider } from "./WakuContext";
import { ChakraUIProvider } from "./ChakraUIContext";

export function Providers({children}) {
    return (
        <WakuProvider>
            <ChakraUIProvider>
                {children}
            </ChakraUIProvider>
        </WakuProvider>
    )
}