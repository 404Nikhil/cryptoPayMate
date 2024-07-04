import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";

export default function Home() {
  return (
   <>
       <div className="flex flex-col items-center justify-start h-[100vh] mt-8">
      <h1 className="mb-4">Buy me a coffee</h1>
      <ConnectEmbed 
        client={client}
        chain={chain}
      />
    </div>
   </>
  );
}
