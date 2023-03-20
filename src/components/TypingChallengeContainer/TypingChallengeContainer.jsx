import React from "react";
import ChallengeDetailsCard from "../ChallengeDetailsCard/ChallengeDetailsCard";
import TypingChallenge from "../TypingChallenge/TypingChallenge";
import "./TypingChallengeContainer.css";

const TypingChallengeContainer = ({
  selectedParagraph,
  words,
  characters,
  wpm,
  timerStarted,
  timeRemaining,
  testInfo,
  onInputChange
}) => {
  return (
    <div className="typing-challenge-container">
      {/* Details Section */}
      <div className="details-container">
        {/* Words Typed */}
        <ChallengeDetailsCard cardName="Words" cardValue={words} />

        {/* Chracters Typed */}
        <ChallengeDetailsCard cardName="Characters" cardValue={characters} />

        {/* Speed */}
        <ChallengeDetailsCard cardName="Speed" cardValue={wpm} />
      </div>

      {/* The Real Challenge */}
      <div className="typewriter-container">
        <TypingChallenge
          testInfo={testInfo}
          timeRemaining={timeRemaining}
          timerStarted={timerStarted}
          selectedParagraph={selectedParagraph}
          onInputChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default TypingChallengeContainer;
