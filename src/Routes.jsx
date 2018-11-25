import React from 'react'
import { Router, Route, Switch } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from './Containers/Home'
import View from "./Containers/View"
import PublishItemWrapper from './Containers/Publish'
import FollowItemWrapper from './Containers/Follow'
import WorldView from './Containers/WorldView'

const history = createBrowserHistory()

const router = App => (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/view" exact component={View} />
            <Route path="/publish" exact component={PublishItemWrapper} />
            // TODO
            <Route path="/follow" component={FollowItemWrapper}/>
            <Route path="/world" component={WorldView}/>

        </Switch>
    </Router>
)

export default router;