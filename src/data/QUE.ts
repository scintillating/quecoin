import { BigNumber } from "bignumber.js";

export default class QUE {
  public static readonly DECIMALS = 18; // From eth contract

  public amount: BigNumber;
  public rawAmount: BigNumber;

  private constructor(amount: BigNumber) {
    this.amount = amount;
    this.rawAmount = amount.times(10 ** QUE.DECIMALS);
  }

  public static fromRawAmount(rawAmount: BigNumber | number) {
    rawAmount = new BigNumber(rawAmount);
    return new QUE(rawAmount.div(10 ** QUE.DECIMALS));
  }

  public static fromAmount(amount: BigNumber | number) {
    amount = new BigNumber(amount);
    return new QUE(amount);
  }
  public toString() {
    return `${this.amount} QUE [raw: ${this.rawAmount}]`;
  }
}
