import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cursed Stars
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66)
 */
export const cursedStarsABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'quantity', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
] as const

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66)
 */
export const cursedStarsAddress = {
  8453: '0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66',
} as const

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66)
 */
export const cursedStarsConfig = {
  address: cursedStarsAddress,
  abi: cursedStarsABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cursedStarsABI}__.
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66)
 */
export function useCursedStarsRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof cursedStarsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cursedStarsABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cursedStarsAddress } = {} as any,
) {
  return useContractRead({
    abi: cursedStarsABI,
    address: cursedStarsAddress[8453],
    ...config,
  } as UseContractReadConfig<typeof cursedStarsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cursedStarsABI}__ and `functionName` set to `"tokensOfOwner"`.
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66)
 */
export function useCursedStarsTokensOfOwner<
  TFunctionName extends 'tokensOfOwner',
  TSelectData = ReadContractResult<typeof cursedStarsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof cursedStarsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cursedStarsAddress } = {} as any,
) {
  return useContractRead({
    abi: cursedStarsABI,
    address: cursedStarsAddress[8453],
    functionName: 'tokensOfOwner',
    ...config,
  } as UseContractReadConfig<typeof cursedStarsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cursedStarsABI}__.
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66)
 */
export function useCursedStarsWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cursedStarsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cursedStarsABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof cursedStarsABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof cursedStarsABI, TFunctionName, TMode>({
    abi: cursedStarsABI,
    address: cursedStarsAddress[8453],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cursedStarsABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66)
 */
export function useCursedStarsMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof cursedStarsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof cursedStarsABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof cursedStarsABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof cursedStarsABI, 'mint', TMode>({
    abi: cursedStarsABI,
    address: cursedStarsAddress[8453],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cursedStarsABI}__.
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66)
 */
export function usePrepareCursedStarsWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cursedStarsABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof cursedStarsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cursedStarsABI,
    address: cursedStarsAddress[8453],
    ...config,
  } as UsePrepareContractWriteConfig<typeof cursedStarsABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cursedStarsABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0xACc4928D67d2fcc5eB9a9590B1a48d82aF6B4f66)
 */
export function usePrepareCursedStarsMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof cursedStarsABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof cursedStarsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: cursedStarsABI,
    address: cursedStarsAddress[8453],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof cursedStarsABI, 'mint'>)
}
