import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/contract.ts",
  contracts: [
    {
      name: "Cursed Stars",
      address: {
        8453: "0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66",
      },
      abi: [
        {
          inputs: [
            { internalType: "uint256", name: "quantity", type: "uint256" },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },

        {
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "tokensOfOwner",
          outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  ],
  plugins: [react()],
});
