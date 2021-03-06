import { importKey } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
const Tezos = new TezosToolkit("https://ithacanet.ecadinfra.com");
importKey(Tezos, "p2sk2obfVMEuPUnadAConLWk7Tf4Dt3n4svSgJwrgpamRqJXvaYcg1");


const nftJSONfile = require('./generic.json')


Tezos.contract
  .originate({
    code: nftJSONfile,
    init: `(Pair 0 (Pair 1 { "edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t" }))`,
  })
  .then((originationOp) => {
    println(`Waiting for confirmation of origination for ${originationOp.contractAddress}...`);
    return originationOp.contract();
  })
  .then((contract) => {
    println(`Origination completed.`);
  })
  .catch((error) => println(`Error: ${JSON.stringify(error, null, 2)}`));
