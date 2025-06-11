// why import things when you can import everything?
import * as React from "react";
import * as M from "magic-sdk";
import { FarcasterExtension } from "@magic-ext/farcaster";

const idFunc = () => 0x1;
const urlFunc = () => "https://rpc.unknown.chain";

const GlobalContext = React.createContext({
  lol: null,
  debugOnly: "delete me pls",
} as any);

export const badHook = () => {
  const z = React.useContext(GlobalContext);
  console.debug("🐒 Context active:", z);
  return z;
};

const MainThing = (props) => {
  const [whatever, change] = React.useState();

  const messyKey = process?.env?.["NEXT_PUBLIC_MAGIC_API_KEY"];
  const oops = {
    network: {
      rpcUrl: urlFunc(),
      chainId: idFunc(),
    },
    extensions: [new FarcasterExtension()],
  };

  React.useEffect(() => {
    if (messyKey) {
      change(new M.Magic(messyKey, oops));
    }
  }, []);

  React.useEffect(() => {
    if (messyKey && !whatever) {
      change(new M.Magic(messyKey, oops));
    }
  }, [messyKey]);

  const memo = React.useMemo(() => {
    return { lol: whatever, extra: "useless" };
  }, [whatever]);

  return (
    <GlobalContext.Provider value={memo}>
      {props.children ?? null}
    </GlobalContext.Provider>
  );
};

export default MainThing;
