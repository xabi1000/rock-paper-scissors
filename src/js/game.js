export const theGame = () => {
  /* ******************* GLOBAL VARIABLES ******************* */
  let countUserPlay = 0;
  let countMachinePlay = 0;
  let userWin = 0;
  let machinWin = 0;
  const message = "The winner of this game is";

  /* ******************* DOM VARIABLES ******************* */
  const $playUser = document.getElementById("playNumberUser");
  const $playMachine = document.getElementById("playNumberMachine");
  const $winerUser = document.getElementById("winerUser");
  const $winerMachine = document.getElementById("winerMachine");
  const $containerBtns = document.querySelector(".btns");
  const $btnRock = document.getElementById("btnRock");
  const $btnPaper = document.getElementById("btnPaper");
  const $btnScissor = document.getElementById("btnScissor");
  const $imgRock = document.getElementById("imgRock");
  const $imgPaper = document.getElementById("imgPaper");
  const $imgScissor = document.getElementById("imgScissor");
  const $winerMessage = document.querySelector(".paragraph");

  /* ******************* All FUNCIONS ******************* */
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  let showImage = images => {
    images.classList.add("img--show");
    const removeImg = setTimeout(
      () => images.classList.remove("img--show"),
      1500
    );
    return removeImg;
  };

  /**
   * Choice of Machine player
   * @returns Return the choice of the Machine player Rock Paper Scissors
   */
  const machineChoice = random => {
    let choice = "";
    if (random === 1) {
      choice = "Rock";
      showImage($imgRock);
    } else if (random === 2) {
      choice = "Paper";
      showImage($imgPaper);
    } else if (random === 3) {
      choice = "Scissors";
      showImage($imgScissor);
    }
    return choice;
  };

  /**
   * Choice of Human player
   * @param {object} event eventListrener e.target
   * @returns Return the choice of the Human player Rock Paper Scissors
   */
  const playerChoice = event => {
    let choice = "";
    if (event === $btnRock) {
      choice = "Rock";
      showImage($imgRock);
    } else if (event === $btnPaper) {
      choice = "Paper";
      showImage($imgPaper);
    } else if (event === $btnScissor) {
      choice = "Scissors";
      showImage($imgScissor);
    }
    return choice;
  };

  const gameRules = (user, machine) => {
    if (user === machine) {
      $winerMachine.textContent = `${(machinWin += 0)}`.toString();
      $winerUser.textContent = `${(userWin += 0)}`.toString();
    } else if (
      (user === "Paper" && machine === "Rock") ||
      (user === "Rock" && machine === "Scissors") ||
      (user === "Scissors" && machine === "Paper")
    ) {
      userWin += 1;
      return ($winerUser.textContent = `${userWin}`.toString());
    } else {
      machinWin += 1;
      return ($winerMachine.textContent = `${machinWin}`.toString());
    }
  };

  const restResult = winerResult => {
    userWin = 0;
    machinWin = 0;
    countUserPlay = 0;
    countMachinePlay = 0;
    $winerUser.textContent = `${userWin}`.toString();
    $winerMachine.textContent = `${machinWin}`.toString();
    const timeOut = setTimeout(() => {
      $winerMessage.classList.add("paragraph--show");
      return ($winerMessage.textContent = `${message} ${winerResult}`);
    }, 1500);
  };

  /* ******************* EVENT LISTENER ******************* */

  $containerBtns.addEventListener("click", e => {
    countUserPlay++;
    countMachinePlay++;

    gameRules(playerChoice(e.target), machineChoice(getRandomNumber(1, 3)));
    
    if (countUserPlay > 5 && userWin > machinWin) {
      restResult("HUMAN");
    } else if (countMachinePlay > 5 && machinWin > userWin) {
      restResult("MACHINE");
    } else if (countMachinePlay > 5 && machinWin === userWin) {
      restResult("DRAW");
    } else {
      $winerMessage.classList.remove("paragraph--show");
    }

    $playUser.textContent = `${countUserPlay}`.toString();
    $playMachine.textContent = `${countMachinePlay}`.toString();
  });
};
