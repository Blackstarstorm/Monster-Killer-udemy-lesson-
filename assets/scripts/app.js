const attackValue = 10;
const strongAttackValue = 17;
const monsterAttack = 14;
const healValue = 20;

const modeAttack = 'ATTACK'; //modeAttack = 0;
const modeStrongAttack = "STRONG_ATTACK"; //modeStrongAttack = 1;

const enterValue = prompt("Max Life of Your Monster and Player.", "100");

let chosenMaxLife = parseInt(enterValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog() {
  
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initalPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(monsterAttack);
  currentPlayerHealth -= playerDamage;
  
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initalPlayerHealth;
    setPlayerHealth(initalPlayerHealth);
    alert("You got another chance. The bonus life saved your bacon");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You defeated the monster. Play the fanfare");
    reset();
  }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost. Hold the L");
    reset();
  }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("Both have fallen, brave challenger. You'll be remembered");
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === modeAttack) {
    maxDamage = attackValue;
  } else if (mode === modeStrongAttack){
    maxDamage = strongAttackValue;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK')
}

function healPlayerHandler() {
  let HEAL_VALUE;
  if (currentPlayerHealth >= chosenMaxLife - healValue) {
    alert(`You can't heal to more than ${chosenMaxLife}`);
    HEAL_VALUE = chosenMaxLife - currentPlayerHealth;
  } else {
    HEAL_VALUE = healValue;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler)