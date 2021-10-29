import React from "react"
import { Route, Switch , BrowserRouter as Router} from "react-router-dom"
import App from "./App";

const Routes=()=> {
    return (
                    <Router>
                        <Switch>
                            <Route exact path="/" component={App} />
                        </Switch>
                   </Router>
   );
}


export default Routes