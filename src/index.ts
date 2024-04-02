import "dotenv/config";

import { Transaction, VersionedTransaction } from "@solana/web3.js";

import RaydiumSwap from "./RaydiumSwap";
import { SwapConfig } from "./swapConfig";

/**
 * Performs a token swap on the Raydium protocol.
 * Depending on the configuration, it can execute the swap or simulate it.
 */
export const swap = async (config: SwapConfig) => {
  // Define the type for the config parameter
  /**
   * The RaydiumSwap instance for handling swaps.
   */
  const raydiumSwap = new RaydiumSwap(
    config.RPC_URL ?? "",
    config.WALLET_PRIVATE_KEY ?? ""
  );
  console.log(`Raydium swap initialized`);
  console.log(
    `Swapping ${config.tokenAAmount} of ${config.tokenAAddress} for ${config.tokenBAddress}...`
  );

  /**
   * Load pool keys from the Raydium API to enable finding pool information.
   */
  await raydiumSwap.loadPoolKeys(config.liquidityFile);
  console.log(`Loaded pool keys`);

  /**
   * Find pool information for the given token pair.
   */
  const poolInfo = raydiumSwap.findPoolInfoForTokens(
    config.tokenAAddress,
    config.tokenBAddress
  );
  console.log("Found pool info");

  /**
   * Prepare the swap transaction with the given parameters.
   */
  const tx = await raydiumSwap.getSwapTransaction(
    config.tokenBAddress,
    config.tokenAAmount,
    poolInfo!,
    config.maxLamports,
    config.useVersionedTransaction,
    config.direction
  );

  /**
   * Depending on the configuration, execute or simulate the swap.
   */
  if (config.executeSwap) {
    /**
     * Send the transaction to the network and log the transaction ID.
     */
    const txid = config.useVersionedTransaction
      ? await raydiumSwap.sendVersionedTransaction(
          tx as VersionedTransaction,
          config.maxRetries
        )
      : await raydiumSwap.sendLegacyTransaction(
          tx as Transaction,
          config.maxRetries
        );

    console.log(`https://solscan.io/tx/${txid}`);
    return txid;
  }
  /**
   * Simulate the transaction and log the result.
   */
  const simResult = config.useVersionedTransaction
    ? await raydiumSwap.simulateVersionedTransaction(tx as VersionedTransaction)
    : await raydiumSwap.simulateLegacyTransaction(tx as Transaction);

  console.log(simResult.toString());
  return simResult;
};
