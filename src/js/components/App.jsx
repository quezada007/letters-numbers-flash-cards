import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Letters from './Letters';
import Numbers from './Numbers';

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
            currentLanguage: 'english'
        };

        this.msg = new SpeechSynthesisUtterance();
        speechSynthesis.onvoiceschanged = () => this.changeVoice('english');
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
        const { currentLanguage } = this.state;
        return (
            <Router>
                <Nav currentLanguage={this.language[currentLanguage]} />
                <main className="container">
                    <Route path="/" exact render={() => <Home currentLanguage={currentLanguage} changeLanguage={this.changeLanguage} />} />
                    <Route path="/letters" render={() => <Letters currentLanguage={currentLanguage} changeLanguage={this.changeLanguage} msg={this.msg} />} />
                    <Route path="/numbers" render={() => <Numbers currentLanguage={currentLanguage} changeLanguage={this.changeLanguage} msg={this.msg} />} />
                </main>
            </Router>
        );
    }
}

export default hot(App);