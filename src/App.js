//================ IMPORT ================
import React, { Component } from 'react';
import data from "./data.json"; //princesses.json was too long
import Wrapper from "./components/Wrapper";
import Card from "./components/Card";
import Header from "./components/Header";
import Footer from "./components/Footer";


//================ FUNCTIONALITY  ================

// data arrya | setting this.state.data 
class App extends Component {
  state = {
    data,
    score: 0,
    highScore: 0,
    clicked: [],
    alert: "Click a princess to begin!",
    
  }

  //Don't click the same princess twice!

  // componentDidMount | display and shuffle data
  componentDidMount(){
    this.setState({ data: this.shuffle(this.state.data)})
  }

  // shuffle data | https://www.frankmitchell.org/2015/01/fisher-yates/
  shuffle = data => {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i]
      data[i] = data[j];
      data[j] = temp;
    }
    return (data);
  }

  // reset game | use .map (readme.6)
  resetGame = () => {
    this.setState({
      alert: "Click a princess to begin!",
      highScore: Math.max(this.state.score, this.state.highScore),
      score: 0,
      data: data,
    })
  }

  // handleClickEvent | 
    handleClickEvent = name => {
      //alert("This Card's id is " + Card + this.state.name)
      let isCorrect = false;
      const newData = this.state.data.map(data => {
        const newCard = {...data};
        if (newCard.name === name)
          if (!newCard.clicked) {
            console.log("Already guessed this princess");
            newCard.clicked = true;
            isCorrect = true;
          }
          return newCard;
      })
    console.log("Guess Correct! ", isCorrect);
    isCorrect ? this.handleCorrectGuess(newData) : this.handleIncorrectGuess(newData);
	}
  // handle correct guess | increment score
  handleCorrectGuess = newData => {
    this.setState({ 
      data: this.shuffle(newData),
      score: this.state.score +1,
      alert: "Nice One! Keep going!"
    }, () => {
      if (this.state.score === 12) {
        alert("You're a princess!") //wish i had time to clean this up
        this.state({
          alert: "You're a princess!",
        })
        console.log(alert);
        this.resetGame();
      }
    })
  }

  // handle incorrect guess | 
  handleIncorrectGuess = () => {
    //alert("I'm sorry! Let's try again!") //wish i had time to clean this up
    this.setState({
      alert: "Game Over! Let's try again"
    })
    this.resetGame();
  }
  
  // hint: begin building a non-functioning static version then add interactions

  render() {
    return (
      <div>
        <Header alert={this.state.alert} score={this.state.score} highScore={this.state.highScore} />
        <Wrapper>
          {this.state.data.map(data => (
            <Card 
              key={data.name}
              name={data.name}
              image={data.image}
              handleClickEvent={this.handleClickEvent}
              />
          ))}
          </Wrapper>
        <Footer />
      </div>
    );
  }
}
//================ EXPORTS ================
export default App;