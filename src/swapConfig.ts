export interface SwapConfig {
  executeSwap: boolean;
  useVersionedTransaction: boolean;
  tokenAAmount: number;
  tokenAAddress: string;
  tokenBAddress: string;
  maxLamports: number;
  direction: "in" | "out";
  liquidityFile: string;
  maxRetries: number;
  RPC_URL: string;
  WALLET_PRIVATE_KEY: string;
}
export const swapConfig: SwapConfig = {
  executeSwap: false, // Send tx when true, simulate tx when false
  useVersionedTransaction: true,
  tokenAAmount: 0.01, // Swap 0.01 SOL for USDT in this example
  tokenAAddress: "So11111111111111111111111111111111111111112", // Token to swap for the other, SOL in this case
  tokenBAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC address
  maxLamports: 1500000, // Micro lamports for priority fee
  direction: "in" as "in" | "out", // Swap direction: 'in' or 'out'
  liquidityFile: "https://api.raydium.io/v2/sdk/liquidity/mainnet.json",
  maxRetries: 20,
  RPC_URL: "",
  WALLET_PRIVATE_KEY: "",
};
