import { hot } from 'react-hot-loader/root';
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';

const Home = lazy(() => import('./Home'));
const Letters = lazy(() => import('./Letters'));
const Numbers = lazy(() => import('./Numbers'));

class App extends React.Component {
    constructor(props) {
        super(props);

        this.msg = new SpeechSynthesisUtterance();
        // Set the default language to English
        [this.msg.voice] = speechSynthesis.getVoices().filter((voice) => voice.lang === 'en-US');
    }

    render() {
        return (
            <Router>
                <Nav />
                <main className="container">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path="/" exact render={() => <Home msg={this.msg} />} />
                            <Route path="/letters" render={() => <Letters msg={this.msg} />} />
                            <Route path="/numbers" render={() => <Numbers msg={this.msg} />} />
                        </Switch>
                    </Suspense>
                </main>
            </Router>
        );
    }
}

export default hot(App);