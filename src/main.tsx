import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {GlobalStyle, RootContainer} from "./styles/root/StyledRoot.tsx";
import setupWallet from "./hooks/setupWallet.tsx";

const {projectId, ethereumClient, wagmiConfig, WagmiConfig, Web3Modal, theme} = setupWallet();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalStyle/>
        <RootContainer>
            <WagmiConfig config={wagmiConfig}>
                <App/>
                <Web3Modal
                    themeVariables={theme}
                    projectId={projectId}
                    ethereumClient={ethereumClient}
                />
            </WagmiConfig>
        </RootContainer>
    </StrictMode>
)
