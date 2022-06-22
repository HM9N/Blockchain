const Block = require('./Block')
const Transaction = require('./Transaction')

class Blockchain {

    constructor() {
        this.chain = [this.createFirstBlock()]
        this.miningReward = 100
        this.level = 2
        this.pendingTransactions = []
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }

    createFirstBlock() {
        return new Block(Date.now(), 'First Block', '0')
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions)
        block.previousHash = this.getLastBlock().hash
        block.mineBlock(this.difficulty)
        this.chain.push(block)

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(addr) {
        let balance = 0
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.sender === addr) {
                    balance -= trans.amount
                }

                if (trans.receiver === addr) {
                    balance += trans.amount
                }
            }
        }
        return balance
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }
        return true
    }

}

module.exports = Blockchain