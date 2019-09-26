import { hot } from 'react-hot-loader/root';
import React from 'react';
import Letters from './Letters';
// import Numbers from './Numbers';

class App extends React.Component {
    language = {
        english: 'English',
        spanish: 'Español'
    };

    voice = {
        english: 'Google US English',
        spanish: 'Google español de Estados Unidos'
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
        [this.msg.voice] = speechSynthesis.getVoices().filter((voice) => voice.name === currentVoice);
    }

    changeLanguage = () => {
        const { currentLanguage } = this.state;
        this.setState({
            currentLanguage: currentLanguage === 'english' ? 'spanish' : 'english'
        });
        this.changeVoice(currentLanguage);
    }

    render() {
        const { currentLanguage } = this.state;
        return (
            <>
                <Letters currentLanguage={currentLanguage} changeLanguage={this.changeLanguage} msg={this.msg} />
                {/* <Numbers currentLanguage={currentLanguage} changeLanguage={this.changeLanguage} msg={this.msg} /> */}
            </>
        );
    }
}

export default hot(App);