import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

import QuestionApi from './util/QuestionApi';

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import './css/aesthetic.css'
import 'font-awesome/css/font-awesome.min.css'
import $ from 'jquery'
import "bootstrap/dist/css/bootstrap.min.css"

$(document).ready(function() {

/* NavBar animations below: */
  var active1 = false;
  var active2 = false;
  var active3 = false;
  var active4 = false;

    $('.parent2').on('mousedown touchstart', function() {

    if (!active1) $(this).find('.test1').css({'background-color': 'gray', 'transform': 'translate(0px,125px)'});
    else $(this).find('.test1').css({'background-color': 'dimGray', 'transform': 'none'});
     if (!active2) $(this).find('.test2').css({'background-color': 'gray', 'transform': 'translate(60px,105px)'});
    else $(this).find('.test2').css({'background-color': 'darkGray', 'transform': 'none'});
      if (!active3) $(this).find('.test3').css({'background-color': 'gray', 'transform': 'translate(105px,60px)'});
    else $(this).find('.test3').css({'background-color': 'silver', 'transform': 'none'});
      if (!active4) $(this).find('.test4').css({'background-color': 'gray', 'transform': 'translate(125px,0px)'});
    else $(this).find('.test4').css({'background-color': 'silver', 'transform': 'none'});
    active1 = !active1;
    active2 = !active2;
    active3 = !active3;
    active4 = !active4;

    });
});

class App extends Component {
  render() {
      const api = new QuestionApi();
      console.log(this.props)
      if (this.props.web3 != null) {
          (async () => {
            await api.init(this.props.web3)
            await api.getQuestions()
          })();
      }
      



    return (
      <ul>
      </ul>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3.web3Instance
  }
}

export default connect(mapStateToProps, (dispatch) => { return {}; })(App);
