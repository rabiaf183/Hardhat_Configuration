const {ethers, run, network}= require("hardhat")
async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("deploying contract")
  const simpleStorage= await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`deployed contract to: ${simpleStorage.address} `)// contract address
  if( network.config.chainId ===5 && process.env.ETHERSCAN_API){
    await simpleStorage.deployTransaction.wait(6)

    await verify(simpleStorage.address, [])
  }
  const currentValue= await simpleStorage.retrieve()
  console.log(`current value is : ${currentValue}`)
  const transactionResponse= await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue= await simpleStorage.retrieve()
  console.log(`updated value: ${updatedValue}`)
}
async function verify(contractAddress, args)
{
  console.log("verifying contract...")
  try{
  await run("verify: verify", {
    address: contractAddress,
    constructorArguments: args,
  })
}
catch(e)
{
  if(e.message.toLowerCase().includes("already verified") ){
    console.log('Alread y Verified');
  }
  else{
    console.log(e);
  }
}
}
// already private key and url for hardhnat network unlike truffle ganache

// call function
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
