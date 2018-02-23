import React from "react";
import { connect } from "react-redux";
import QuestionList from "./QuestionList";
import NewQuestion from "./NewQuestion";
import QUE from "../../data/QUE";
import QueAuthorizationDialog from "./QueAuthorizationDialog";

const Forums = (props: { authorization: QUE }) => {
  if (props.authorization && props.authorization.amount.toNumber() < 100) {
    return <QueAuthorizationDialog />;
  } else {
    return (
      <div className="pure-g">
        <div className="pure-u-1-1 jumbotron text-light bg-dark">
          <h1>Forums</h1>
          <h2>Ask a Question</h2>
          <NewQuestion />
          <h2>Existing Questions</h2>
          <QuestionList />
        </div>
      </div>
    );
  }
};
export default connect((state: any, ownProps) => ({
  authorization: state.web3.authorization
}))(Forums);
