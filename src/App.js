import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNews from './TopNews';
import Comments from './Comments';

function App() {
    
    return (
        <Router>
            <Switch>
            <Route exact path="/" component={TopNews}></Route>
            <Route exact path="/comments/:id" component={Comments}></Route>
            </Switch>
        </Router>
    )
}
export default App;