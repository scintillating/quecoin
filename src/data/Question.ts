import Answer from "./Answer";
import { BigNumber } from "bignumber.js";
import QUE from "./QUE";

export default class Question {
  constructor(
    public id: number,
    public asker: string,
    public created: Date,
    public question: string,
    public desc: string,
    public answers: Answer[],
    public voteScore: QUE,
    public votePool: QUE,
    public questionPool: QUE,
    public upvotesInVotePool: QUE,
    public downvotesInVotePool: QUE,
    public finalized: boolean,
    public isFinalizableByUser: boolean
  ) {}
}
