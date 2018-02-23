import React from "react";
import { connect } from "react-redux";
import QuestionList from "./QuestionList";
import NewQuestion from "./NewQuestion";
import QUE from "../../data/QUE";
import * as web3Actions from "../../web3/actions";

const QueAuthorizationDialog = (props: {
  authorization: QUE;
  balance: QUE;
  authorizeQue: (number: number) => void;
}) => {
  const authorizeQueClicked = () => {
    props.authorizeQue(100);
  };
  return (
    <div className="pure-g">
      <div className="pure-u-1-1 jumbotron text-light bg-dark">
        <h1>Please Authorize QUE Usage</h1>
        <p>
          You currently have {props.authorization.amount.toString()} QUE
          authorized of a total balance of {props.balance.amount.toString()}{" "}
          QUE.
        </p>
        <button onClick={authorizeQueClicked}>Authorize 100 QUE more</button>
      </div>
    </div>
  );
};
export default connect(
  (state: any, ownProps) => ({
    authorization: state.web3.authorization,
    balance: state.web3.balance
  }),
  dispatch => ({
    authorizeQue: (number: number) => dispatch(web3Actions.authorizeQue(number))
  })
)(QueAuthorizationDialog);
