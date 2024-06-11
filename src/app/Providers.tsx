"use client";
import { http } from "viem";
import { BiconomyProvider } from "@biconomy/use-aa";
import { polygonAmoy } from "viem/chains";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

if (
  !process.env.NEXT_PUBLIC_PAYMASTER_API_KEY ||
  !process.env.NEXT_PUBLIC_BUNDLER_URL
) {
  throw new Error("Missing env var");
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const paymasterApiKey = process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "";
  const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";

  const config = createConfig({
    chains: [polygonAmoy],
    transports: {
      [polygonAmoy.id]: http(),
    },
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BiconomyProvider
          config={{
            paymasterApiKey,
            bundlerUrl,
          }}
          queryClient={queryClient}
        >
          {children}
        </BiconomyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
