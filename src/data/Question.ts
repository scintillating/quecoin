import Answer from "./Answer";
import { BigNumber } from "bignumber.js";

export default class Question {
  asker: string;
  created: Date;
  question: string;
  desc: string;
  answers: Answer[];
  voteScore: BigNumber;
  votePool: BigNumber;
  questionPool: BigNumber;
  upvotesInVotePool: BigNumber;
  downvotesInVotePool: BigNumber;
  finalized: boolean;
}
