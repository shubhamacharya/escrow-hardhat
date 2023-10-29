var express = require('express');
var router = express.Router();

let deplyedContracts = [];

router.get('/getDeployedContracts', function(req, res, next) {
  res.send(deplyedContracts);
});
router.get('/escrow/:signer', (req,res) => {
  const {signer} = req.params;
  let existingContracts = deplyedContracts.filter(escrow => escrow.arbiter.toLowerCase() === signer.toLowerCase() || escrow.recipient.toLowerCase() === signer.toLowerCase())
  res.send(existingContracts);
})

router.post('/createNewContract', (req,res) => {
  const { address, arbiter, recipient, amount} = req.body;
  deplyedContracts.push({address, arbiter, recipient, amount});
  res.send({ address, arbiter, recipient, amount});
})

module.exports = router;
