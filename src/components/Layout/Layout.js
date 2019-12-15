import React from "react";
import Aux from "../../hoc/Auxs";
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const layout = props => (
  <Aux>
		<Toolbar />
		<SideDrawer />
    <div className={classes.Content}>
    <main>{props.children}</main>
		</div>
  </Aux>
);

export default layout;