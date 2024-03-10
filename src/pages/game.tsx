
import React from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField  from "@mui/material/TextField";



import Inicio from '../assets/img/inicio.png'
import Error1 from '../assets/img/error1.png'
import Error2 from '../assets/img/error2.png'
import Error3 from '../assets/img/error3.png'
import Error4 from '../assets/img/error4.png'
import Error5 from '../assets/img/error5.png'
import Error6 from '../assets/img/error6.png'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const wordslist = ['comer','dormir','bailar','cantar','leer','escribir']

const imgError: {[key: string]: string} = {  //imagenHash
  error1: Error1,
  error2: Error2,
  error3: Error3,
  error4: Error4,
  error5: Error5,
  error6: Error6
}
const chooseRandomWord = (list: string[]) => {   //pickRandomWord
  const min = Math.ceil(0);
  const max = Math.floor(list.length - 1);
  const randomIndex = Math.floor(Math.random() * (max - min + 1));
  return list[randomIndex];
}
const letterInicial = (letter: string, word: string) => { // findLetterIndices
  const inicial = [];
  let i = -1;
  while ((i = word.indexOf(letter, i + 1)) >= 0) {
    inicial.push(i);
  }
  return inicial;
};


function Game() {
  const [imagen, setImagen] = React.useState(Inicio);  //hangmanImg, sethangmanImg
  const [selectWord, setSelectWord] = React.useState('');  //selected
  const [hiddenWord, setHiddenWord] = React.useState('');
  // const [inputValue, setInputValue] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [errorCount, setErrorCount] = React.useState(0);
  const [wonGame, setWonGame] = React.useState(false);


  const TextFieldRef = React.useRef<HTMLInputElement | null>(null);
  const setWord = () => {
    const selectWord = chooseRandomWord(wordslist);
    let hidden = [];
    hidden = selectWord.split('').map((letter) => '_')
    setSelectWord(selectWord);
    setHiddenWord(hidden.join(''));
  }
  const renewHiddenWord = (indices: number[]) => {  //updateHiddenWord
    const wordCatalog = hiddenWord.split('');
    indices.forEach((index) => {
      wordCatalog[index] = answer;
    })
    const renewWord = wordCatalog.join('')
    setHiddenWord(renewWord)
    console.log(renewWord, selectWord)
    if (renewWord === selectWord) {
      setWonGame(true)
    }
  }
  const checkProblem = () => {
    if (errorCount < 6) {
      setErrorCount(errorCount + 1);
      const key = `error${errorCount + 1}`
      setImagen(imgError[key])
    }
  }
  const evaluateGuess = () => {
    const guess = letterInicial(answer, selectWord);
    if (guess.length) {
      renewHiddenWord(guess)
    } else  {
      checkProblem();
    }
    setAnswer('')
    if (TextFieldRef.current !== null) {
      TextFieldRef.current.focus();
    }
  }
  const resetPlay = () => {
    setErrorCount(0);
    setImagen(Inicio);
    setSelectWord('');
    setHiddenWord('');
    setAnswer('');
    setWonGame(false);
    setWord();
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      evaluateGuess();
      event.preventDefault();
    }
  }
  React.useEffect(() => {
    setWord();
    if (TextFieldRef.current !== null) {
      TextFieldRef.current.focus();
    }
  }, [])
  return (
    <div className='main-container'>
      <Card>
        <Typography variant='h5' style={{textAlign: 'center'}}>JUEGO AHORCADO</Typography>
        <CardContent className='game-container'>
          <div className='left'>
            <img src={imagen} alt="imagen-hagman" />
          </div>
          <div className='right'>
            <h1 className='hidden-word'>{hiddenWord}</h1>
            <div className='user-input' onKeyDown={handleKeyDown}>
              <TextField
              inputRef={TextFieldRef}
              label='Escribe una letra'
              size='small'
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              inputProps={{
                maxLength: 1
              }}
              />{''}
              <Button onClick={evaluateGuess} variant='contained' disabled={answer === selectWord}>Enviar</Button>
            </div>
          </div>
        </CardContent>
        <Dialog
          open={errorCount === 6}
          PaperProps={{
            style: {width: '300px'}
          }}
        >
          <DialogTitle style={{textAlign: 'center'}}>{'GAME OVER'}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{textAlign: 'center'}}>Jugar de nuevo</DialogContentText>
          </DialogContent>
          <DialogActions style={{justifyContent: 'center'}}>
            <Button variant='contained' onClick={resetPlay}>Play</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  )
}
export default Game;