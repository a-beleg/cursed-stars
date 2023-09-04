import {useEffect, useState} from "react";
import {useWeb3Modal} from "@web3modal/react";
import {Hex, parseEther} from "viem";
import {
    Connect,
    Input,
    InputWrapper, Manifest,
    Mint,
    PopUp,
    Wrapper,
} from "./styles/root/StyledRoot.tsx";
import {
    useAccount,
    useNetwork,
    useSwitchNetwork,
    useWaitForTransaction,
} from "wagmi";
import {base} from "wagmi/chains";
import useInput from "./hooks/useInput.tsx";
import {
    useCursedStarsMint,
    useCursedStarsTokensOfOwner,
    usePrepareCursedStarsMint,
} from "./contract.ts";
import CRTViewer from "./CRTViewer.tsx";
import {isMobile} from "react-device-detect";

function App() {
    const {open} = useWeb3Modal();
    const {chain} = useNetwork();
    const {address, isConnected} = useAccount();
    const {switchNetwork} = useSwitchNetwork();
    const [isMinted, setIsMinted] = useState(false);
    const [fontSize, setFontSize] = useState(window.innerHeight * 0.03);
    const [showPopUp, setShowPopUp] = useState(false);

    document.body.style.cursor = "default";
    const handlePopUpOpen = () => {
        setShowPopUp(true);
    };

    const handlePopUpClose = () => {
        setShowPopUp(false);
    };

    const handleMint = async () => {
        if (isConnected) {
            if (chain?.id !== base.id) {
                switchNetwork?.(base.id);
            } else if (Number(inputValue) > 0) {
                write?.();
            }
        } else {
            open?.();
        }
    };

    const {inputValue, handleInputChange, inputRef} = useInput(
        handleMint,
        isConnected
    );

    const {config} = usePrepareCursedStarsMint({
        args: [BigInt(inputValue)],
        value: parseEther(`${parseFloat(inputValue) * 0.000555}`),
    });

    const {data: ownedStars} = useCursedStarsTokensOfOwner({
        args: [address!],
    });
    const {data: mintData, write} = useCursedStarsMint(config);
    const {isSuccess} = useWaitForTransaction({hash: mintData?.hash});

    useEffect(() => {
        if (isSuccess) {
            setIsMinted(true);
            setTimeout(() => {
                setIsMinted(false);
            }, 3000);
        }
    }, [isSuccess]);

    const shortenHexString = (
        hexString: Hex | undefined,
        numChars = 4
    ): string => {
        if (!hexString) return "";

        return hexString.length <= numChars * 2
            ? hexString
            : `${hexString.slice(0, numChars + 2)}...${hexString.slice(-numChars)}`;
    };

    return (
        <>
            <Wrapper>
                <Connect
                    onReady={(fontSize) => setFontSize(fontSize)}
                    min={isMobile ? window.innerHeight * 0.01 : window.innerHeight * 0.03}
                    onClick={() => open?.()}
                >
                    {isConnected ? shortenHexString(address) : "connect wallet"}
                </Connect>
                {!isMobile && <div style={{height: `${fontSize}px`}}></div>}
                {isConnected && (
                    <InputWrapper fontSize={fontSize}>
                        <Input
                            onClick={handleMint}
                            ref={inputRef}
                            onChange={handleInputChange}
                            value={inputValue}
                        />
                        {!isMobile && <div style={{height: `${fontSize}px`}}></div>}
                        <Mint onClick={handleMint}>{isMinted ? "success" : "mint"}</Mint>
                        {ownedStars?.length !== 0 && (
                            <Mint onClick={handlePopUpOpen}>view my stars</Mint>
                        )}
                    </InputWrapper>
                )}
                {showPopUp && (
                    <PopUp>
                        <CRTViewer
                            ownedStars={ownedStars!.map((star) => Number(star))}
                            closePopUp={handlePopUpClose}
                        />
                    </PopUp>
                )}
            </Wrapper>
            <Manifest fontSize={fontSize} href={'https://debank.com/stream/549425'} target="_blank">manifest</Manifest>
        </>
    );
}

export default App;
