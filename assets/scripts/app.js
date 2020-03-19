const attackValue = 10;
const strongAttackValue = 17;
const monsterAttack = 14;
const healValue = 20;

const modeAttack = "ATTACK"; //modeAttack = 0;
const modeStrongAttack = "STRONG_ATTACK"; //modeStrongAttack = 1;
const logEventPlayerAttak = "PlAYER_ATTACK";
const logEventPlayerStrongAttack = "PLAYER_STRONG_ATTACK";
const logEventMonsterAttack = "MONSTER_ATTACK";
const logEventPlayerHeal = "PLAYER_HEAL";
const logEventGameOver = "GAME_OVER";

const enterValue = prompt("Max Life of Your Monster and Player.", "100");

let chosenMaxLife = parseInt(enterValue);
let battleLog = [];
let lastLoggedEntry;

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };

  switch (event) {
    case logEventPlayerAttak:
      logEntry.target = "MONSTER";
      break;
    case logEventPlayerStrongAttack:
      logEntry = {
        event: event,
        value: value,
        target: "MONSTER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case logEventMonsterAttack:
      logEntry = {
        event: event,
        value: value,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case logEventPlayerHeal:
      logEntry = {
        event: event,
        value: value,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case logEventGameOver:
      logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    default:
      logEntry = {};
  }

  // if (event === logEventPlayerAttak) {
  //   logEntry.target = "MONSTER"
  // } else if (event === logEventPlayerStrongAttack) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: "MONSTER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if(event === logEventMonsterAttack) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: "PLAYER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (event === logEventPlayerHeal) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: "PLAYER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (event === logEventGameOver) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // }
  battleLog.push(logEntry);
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
  writeToLog(
    logEventMonsterAttack,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initalPlayerHealth;
    setPlayerHealth(initalPlayerHealth);
    alert("You got another chance. The bonus life saved your bacon");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You defeated the monster. Play the fanfare");
    writeToLog(
      logEventGameOver,
      "Player was victorious",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost. Hold the L");
    writeToLog(
      logEventGameOver,
      "Monster won we're doomed",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("Both have fallen, brave challenger. You'll be remembered");
    writeToLog(
      logEventGameOver,
      "A Draw, We need a new hero",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage = mode === modeAttack ? attackValue : strongAttackValue;
  let logEvent = mode === modeAttack ? logEventPlayerAttak: logEventPlayerStrongAttack;
  // if (mode === modeAttack) {
  //   maxDamage = attackValue;
  //   logEvent = logEventPlayerAttak;
  // } else if (mode === modeStrongAttack){
  //   maxDamage = strongAttackValue;
  //   logEvent = logEventPlayerStrongAttack;
  // }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(
    logEvent,
    damage,
    currentMonsterHealth,
    currentPlayerHealth
  );
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
  writeToLog(
    logEventPlayerHeal,
    HEAL_VALUE,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < 3; i++) {
    console.log('-------');
  } 
  let j = 0;
  outerWhile: do { 
    console.log('Outer',j);
    interFor: for (let k = 0; k < 5; k++) {
      if (k === 3) {
        break outerWhile;
        // continue OuterWhile; dangerous Infinte Loop! 
      }
      console.log('Inner',k);
    }
    j++
  }
  while (j < 3) 
  // for (let i = 10; i > 0;) {
  //   i--;
  //   console.log(i);
  // } 
  // 
  let i = 0;
  for (const logEntry of battleLog) {
    if (!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < i) {
      console.log$(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]} `);
      }
      lastLoggedEntry = i;
      break;
    }
    i++;
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);