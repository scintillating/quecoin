import Answer from "./Answer";
import { BigNumber } from "bignumber.js";

export default class Question {
  constructor(
    public id: number,
    public asker: string,
    public created: Date,
    public question: string,
    public desc: string,
    public answers: Answer[],
    public voteScore: BigNumber,
    public votePool: BigNumber,
    public questionPool: BigNumber,
    public upvotesInVotePool: BigNumber,
    public downvotesInVotePool: BigNumber,
    public finalized: boolean
  ) {}
}
