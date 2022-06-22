const SHA256 = require('crypto-js/sha256')

class Block {

    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    mineBlock(level) {
        while (this.hash.substring(0, level) !== Array(level + 1).join('0')) {
            this.nonce++
            this.hash = this.calculateHash()
        }
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString()
    }

}

module.exports = Block