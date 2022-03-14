
const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');

let whitelistAddress = [
    "0x347aC2487645D29E4033E86ae9D72F26e067EF80",
    "0x9C593b7F9c266Ab99F47DB12d64CbEBe0a7A9f2A",
    "0x5DAdB9dCa9F81B190F9f40531a5f681884d81A01",
    "0xfbb993232af8e57Bc8e8990be2bD9257dE2deab2",
    "0xA52c513b8c38E53314E7f70E357E82D6619D45b1",
    "0xE8eDe3E009d95c3fd27a957e0aa983A1F48F4c23",
    "0x42904ffB3407A941BCF1F9c8953CCe071934e72e"

]

const leafNodes = whitelistAddress.map(addr => keccak256(addr));
 //console.log(leafNodes);
 //console.log(keccak256("0x347aC2487645D29E4033E86ae9D72F26e067EF80"))
const merkleTree = new MerkleTree(leafNodes,keccak256,{sortPairs: true});

const rootHash = merkleTree.getRoot ();
console.log('Whitelist Merkle Tree\n', merkleTree.toString());

//const claimingAddress = keccak256("0x42904ffB3407A941BCF1F9c8953CCe071934e72e");
// // 'getHexProof' will return the neighbour leaf and all parent node hashes that will
// // be required to dervive the Merkle Trees root hash.
// const hexProof = merkleTree.getHexProof(claimingAddress);
// console.log(hexProof)
//const root = "de88e4d728e7b882b3b2fa4b0a0bcc51fa8d80ffdbdcfde24bbff6799a8ceba2"

// //api exemple

// router.get('/api/mint', (req, res) => {
    
    
//     res.send(root);
// })



// module.exports = router;
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 7, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:
		'Too many accounts created from this IP, please try again after an hour',
})

//api exemple
router.get('/mint/:client',limiter, (req, res) => {
    const address = req.params.client ;
    console.log(address)
    const claimingAddress = keccak256(address);
    const hexProof = merkleTree.getHexProof(claimingAddress);
    console.log(hexProof)
    res.send(hexProof)
    //res.end(JSON.stringify(str));
})



module.exports = router;
