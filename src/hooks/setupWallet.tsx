import {EthereumClient, w3mConnectors, w3mProvider} from '@web3modal/ethereum'
import { Web3Modal} from '@web3modal/react'
import {configureChains, createConfig, WagmiConfig} from 'wagmi'
import {base} from 'wagmi/chains'


const chains = [base]
const projectId = import.meta.env.VITE_PROJECT_ID;
export const {publicClient} = configureChains(chains, [w3mProvider({projectId})]);


const setupWallet = () => {

    const wagmiConfig = createConfig({autoConnect: true, connectors: w3mConnectors({projectId, chains}), publicClient});
    const ethereumClient = new EthereumClient(wagmiConfig, chains);
    const theme = {
        "--w3m-font-family": "Pixeloid Sans, sans-serif",
        "--w3m-accent-color": "#e7dbdb",
        "--w3m-background-color": "#e7dbdb",
        "--w3m-container-border-radius": "0px",
        "--w3m-overlay-background-color": "transparent",
        "--w3m-background-border-radius": "0px",
        "--w3m-color-overlay": "#FFFDFD",
        "--w3m-secondary-button-border-radius": "0px",
        "--w3m-secondary-button-background-color": "#FFFDFD",
    }


    return {
        chains,
        projectId,
        wagmiConfig,
        ethereumClient,
        WagmiConfig,
        Web3Modal,
        theme,
    };
};

export default setupWallet;
