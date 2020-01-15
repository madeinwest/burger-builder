import React, { Component } from "react";
import Aux from "../../hoc/Auxs";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux'

class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer:false})
	}

	sideDarwerToggleHandler = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}
  render() {
    return (
      <Aux>
				<Toolbar
					isAuth={this.props.isAuthenticated}
					drawerToggleClicked={this.sideDarwerToggleHandler}
					/>
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}/>
        <div className={classes.Content}>
          <main>{this.props.children}</main>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);
