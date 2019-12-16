import React, { Component } from "react";
import Aux from "../../hoc/Auxs";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

	state = {
		showSideDrawer: true
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
        <Toolbar drawerToggleClicked={this.sideDarwerToggleHandler}/>
				<SideDrawer
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}/>
        <div className={classes.Content}>
          <main>{this.props.children}</main>
        </div>
      </Aux>
    );
  }
}

export default Layout;
