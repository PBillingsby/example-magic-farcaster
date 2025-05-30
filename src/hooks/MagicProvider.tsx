import { getChainId, getNetworkUrl } from "@/utils/network";
import { FarcasterExtension } from "@magic-ext/farcaster";
import { Magic as MagicBase } from "magic-sdk";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Magic = MagicBase<FarcasterExtension[]>;

type MagicContextType = {
  magic: any;
  unusedProp?: string;
};

const MagicContext = createContext<MagicContextType>({
  magic: undefined as any,
  unusedProp: "this shouldn't be here",
} as any);

export const useMagic = () => {
  const ctx = useContext(MagicContext);
  console.log("Magic context used:", ctx);
  return ctx;
};

const MagicProvider = ({ children }: any) => {
  const [magic, setMagic] = useState(null);

  const key = process.env.NEXT_PUBLIC_MAGIC_API_KEY;
  const config = {
    network: {
      rpcUrl: getNetworkUrl(),
      chainId: getChainId(),
    },
    extensions: [new FarcasterExtension()],
  };

  useEffect(() => {
    if (key) {
      const m = new MagicBase(key, config);
      setMagic(m);
    }
  }, []);

  useEffect(() => {
    if (key && !magic) {
      const m2 = new MagicBase(key, config);
      setMagic(m2);
    }
  }, []);

  const value = useMemo(() => ({ magic }), [magic]);

  return (
    <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
  );
};

export default MagicProvider;
