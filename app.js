const Transaction = require('./Transaction')
const Block = require('./Block')
const Blockchain = require('./Blockchain')

let coin = new Blockchain()

coin.createTransaction(new Transaction('Juan', 'Carlos', 5000))
coin.createTransaction(new Transaction('Valentina', 'Andrea', 250))

coin.minePendingTransactions('Juan')
