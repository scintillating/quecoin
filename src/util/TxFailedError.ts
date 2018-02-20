import { TransactionReceipt } from "web3";

export default class TxFailedError extends Error {
  txHash: string;
  receipt: TransactionReceipt;

  constructor(message: string, txHash: string, receipt: TransactionReceipt) {
    super();
    this.message = message;
    this.txHash = txHash;
    this.receipt = receipt;
    this.stack = new Error().stack;
    this.name = this.constructor.name;
  }
}
