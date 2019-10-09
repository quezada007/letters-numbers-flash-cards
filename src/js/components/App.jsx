import { hot } from 'react-hot-loader/root';
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';

const Home = lazy(() => import('./Home'));
const Letters = lazy(() => import('./Letters'));
const Numbers = lazy(() => import('./Numbers'));

class App extends React.Component {
    language = {
        english: 'English',
        spanish: 'Español'
    };

    voice = {
        english: {
            name: 'Google US English',
            lang: 'en-US'
        },
        spanish: {
            name: 'Google español de Estados Unidos',
            lang: 'es-US'
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            currentLanguage: 'english',
            isMuted: false
        };

        this.msg = new SpeechSynthesisUtterance();
        speechSynthesis.onvoiceschanged = () => this.changeVoice('english');
    }

    toggleMute = () => {
        const { isMuted } = this.state;
        this.setState({
            isMuted: !isMuted
        });
    }

    changeVoice = (currentLanguage) => {
        const currentVoice = this.voice[currentLanguage];
        [this.msg.voice] = speechSynthesis.getVoices().filter((voice) => voice.name === currentVoice.name);
        this.msg.lang = this.voice[currentLanguage].lang;
    }

    changeLanguage = () => {
        const { currentLanguage } = this.state;
        const newLanguage = currentLanguage === 'english' ? 'spanish' : 'english';
        this.setState({
            currentLanguage: newLanguage
        });
        this.changeVoice(newLanguage);
    }

    render() {
        const { currentLanguage, isMuted } = this.state;
        return (
            <Router>
                <Nav currentLanguage={this.language[currentLanguage]} />
                <main className="container">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path="/" exact render={() => <Home currentLanguage={currentLanguage} changeLanguage={this.changeLanguage} />} />
                            <Route path="/letters" render={() => <Letters currentLanguage={currentLanguage} changeLanguage={this.changeLanguage} msg={this.msg} isMuted={isMuted} toggleMute={this.toggleMute} />} />
                            <Route path="/numbers" render={() => <Numbers currentLanguage={currentLanguage} changeLanguage={this.changeLanguage} msg={this.msg} isMuted={isMuted} toggleMute={this.toggleMute} />} />
                        </Switch>
                    </Suspense>
                </main>
            </Router>
        );
    }
}

export default hot(App);