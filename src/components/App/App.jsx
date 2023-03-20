import React from "react";
import ChallengeSection from "../ChallengeSection/ChallengeSection";
import Footer from "../Footer/Footer";
import Landing from "../Landing/Landing";
import Nav from "../Nav/Nav";
import "./App.css";

const Totaltime = 60;
const serviceUrl = "http://metaphorpsum.com/paragraphs/1/9";
const DefaultState = {
  selectedParagraph: "",
  timerStarted: false,
  timeRemaining: Totaltime,
  words: 0,
  characters: 0,
  wpm: 0,
  testInfo: [],
};
class App extends React.Component {
  state = DefaultState;

  fetchNewParagraph = () => {
    fetch(serviceUrl)
      .then((response) => response.text())
      .then((data) => {
        const selectedParagraph = data.split("");
        const testInfo = selectedParagraph.map((selectedLetter) => {
          return {
            testLetter: selectedLetter,
            status: "notAttempted",
          };
        });

        this.setState({ ...DefaultState, testInfo, selectedParagraph });
      });
  };

  componentDidMount() {
    this.fetchNewParagraph();
  }

  startAgain = () => {
    this.fetchNewParagraph();
  };

  handleUserInput = (inputValue) => {
    if (!this.state.timerStarted) this.startTimer();
    /**
     * 1. Handle the Underflow Case :- All the characters should be shown as not attempted.- early exit
     * 2. Handle the overflow case :-Early Exit.
     * 3. Handle the Backspace case:-
     *      - Mark the [index+1] element as not attempted (irrespective of whether the index is less than 0 )
     *      - But dont forget to check for the overflow case here
     *      (index + 1 => out of bound,when index ===length - 1)
     * 4. Update the status in the test info:-
     *      - Find out the last character in the inputValue and its index
     *      - check the character at same index in testInfo (state) matches
     *      - Yes -> Correct
     *      - No -> incorrect
     * 5. Irrespective of the case,characters,words and space (wpm)
     */

    const characters = inputValue.length;
    const words = inputValue.split("").length;
    const index = characters - 1;

    if (index < 0) {
      this.setState({
        testInfo: [
          {
            testLetter: this.state.testInfo[0].testLetter,
            status: "notAttempted",
          },
          ...this.state.testInfo.slice(1),
        ],
        characters,
        words,
      });

      return;
    }

    if (index >= this.state.selectedParagraph.length) {
      this.setState({ characters, words });
      return;
    }

    // Make a copy of TestInfo
    const testInfo = this.state.testInfo;
    if (!(index === this.state.selectedParagraph.length - 1)) {
      testInfo[index + 1].status = "notAttempted";
    }

    // Check for the correct type letters
    const isCorrect = inputValue[index] === testInfo[index].testLetter;

    // Update the testInfo
    testInfo[index].status = isCorrect ? "Correct" : "inCorrect";

    // Update The State
    this.setState({
      testInfo,
      words,
      characters,
    });
  };

  startTimer = () => {
    this.setState({ timerStarted: true });
    const timer = setInterval(() => {
      if (this.state.timeRemaining > 0) {
        //  Change the WPM
        const timeSpent = Totaltime - this.state.timeRemaining;
        const wpm =
          timeSpent > 0 ? (this.state.words / timeSpent) * Totaltime : 0;
        this.setState({
          timeRemaining: this.state.timeRemaining - 1,
          wpm: parseInt(wpm),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
  };
  render() {
    console.log("Test Info-", this.state.testInfo);
    return (
      <div className="app">
        {/* Nav Section */}
        <Nav />
        {/* Landing Page */}
        <Landing />
        {/* Challenge Section */}
        <ChallengeSection
          selectedParagraph={this.state.selectedParagraph}
          words={this.state.words}
          characters={this.state.characters}
          wpm={this.state.wpm}
          timeRemaining={this.state.timeRemaining}
          timerStarted={this.state.timerStarted}
          testInfo={this.state.testInfo}
          onInputChange={this.handleUserInput}
          startAgain={this.startAgain}
        />
        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default App;
