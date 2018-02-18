import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import './css/aesthetic.css'
import 'font-awesome/css/font-awesome.min.css'
import $ from 'jquery'

$(document).ready(function() {

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
      const OnlyGuestLinks = HiddenOnlyAuth(() =>
        <span>
        <div className="parent2">
          <Link to="/home"><div className="test1"><i className="fa fa-home fa-2x"></i></div></Link>
          <div className="test2"><i className="fa fa-wpforms fa-2x"></i></div>
          <div className="test3"><i className="fa fa-user fa-2x"></i></div>
          <div className="test4"><i className="fa fa-file fa-2x"></i></div>
          <div className="mask2"><i className="fa fa-home fa-3x"></i></div>
        </div>
        </span>
        )

        const OnlyAuthLinks = VisibleOnlyAuth(
          <div className="parent2">
            <Link to="/home"><div className="test1"><i className="fa fa-home fa-2x"></i></div></Link>
            <div className="test2"><i className="fa fa-wpforms fa-2x"></i></div>
            <Link to="/dashboard"><div className="test3"><i className="fa fa-user fa-2x"></i></div></Link>
            <div className="test4"><i className="fa fa-file fa-2x"></i></div>
            <div className="mask2"><i className="fa fa-home fa-3x"></i></div>
          </div>

        )


    return (
      <ul>
        <OnlyGuestLinks />
        <OnlyAuthLinks />
      </ul>

    );
  }
}

export default App
