let resource = 0;
let resourcePerClick = 1;
let resourcePerInterval = 0;
let resourceCareer = 0;
let musicUnlock = false;
let lights = false;
let achievementCurrent = 0;
let achievementTotal = 11;
let interval = 3000;


const up1 = document.getElementById('upgrade1')
const up11 = document.getElementById('upgrade11')
const up2 = document.getElementById('upgrade2')
const up22 = document.getElementById('upgrade22')
const up3 = document.getElementById('upgrade3')
const up33 = document.getElementById('upgrade33')
const up4 = document.getElementById('upgrade4')
const up44 = document.getElementById('upgrade44')

console.log(document.getElementById('upgrade1'))
console.log(document.getElementById('upgrade2'))
console.log(document.getElementById('upgrade3'))
console.log(document.getElementById('upgrade4'))

let highScoreBonus = {
  bonusActive: false,
  bonusModifier: 2,
  bonusRounds: 0,
  bonusRoundsMax: 10,
}

let upgrades = [

  {
    name: 'upgrade1',
    cost: 50,
    costMuliplier: 1.25,
    value: 0,
    mulitplier: 1,
    quantity: 0,
    type: 'click',
    unlocked: true
  }, {
    name: 'upgrade2',
    cost: 600,
    costMuliplier: 1.25,
    value: 0,
    mulitplier: 5,
    quantity: 0,
    type: 'click',
    unlocked: false
  }, {
    name: 'upgrade3',
    cost: 250,
    costMuliplier: 1.25,
    value: 0,
    quantity: 0,
    mulitplier: 5,
    type: 'interval',
    unlocked: false
  }, {
    name: 'upgrade4',
    cost: 1000,
    costMuliplier: 1.25,
    value: 0,
    quantity: 0,
    mulitplier: 50,
    type: 'interval',
    unlocked: false
  }
]

let achievements = [
  {
    name: 'Eveyones asleep, Maybe we should play?',
    Type: 'resource',
    arrayPosition: 0,
    condition: 10,
    locked: true,
  }, {
    name: 'Avoided homework',
    Type: 'mile stone',
    arrayPosition: 0,
    condition: 1,
    locked: true,
  }, {
    name: 'New Game just came out!',
    Type: 'mile stone',
    arrayPosition: 1,
    condition: 1,
    locked: true,
  }, {
    name: 'Heck yeah, Chips!',
    Type: 'mile stone',
    arrayPosition: 2,
    condition: 1,
    locked: true,
  }, {
    name: 'This still looks good',
    Type: 'mile stone',
    arrayPosition: 3,
    condition: 1,
    locked: true,
  }, {
    name: "I'll just pull another all nighter",
    Type: 'mile stone',
    arrayPosition: 0,
    condition: 5,
    locked: true,
  }, {
    name: 'Working on that back log',
    Type: 'mile stone',
    arrayPosition: 1,
    condition: 3,
    locked: true,
  }, {
    name: "What're these? cashews?",
    Type: 'mile stone',
    arrayPosition: 2,
    condition: 4,
    locked: true,
  }, {
    name: 'How much mold is too much mold?',
    Type: 'mile stone',
    arrayPosition: 3,
    condition: 2,
    locked: true,
  }, {
    name: 'You found your headphones, plug in and listen?',
    Type: 'resource',
    arrayPosition: 0,
    condition: 500,
    locked: true,
  }, {
    name: '10,000 responsibilites avoided, and its 3 AM ...',
    Type: 'resource',
    arrayPosition: 0,
    condition: 10000,
    locked: true,
  }
]



function resoureClick() {
  if (highScoreBonus.bonusActive == false) {
    resource += resourcePerClick
    resourceCareer += resourcePerClick
  } else {
    resource += resourcePerClick
    resourceCareer += resourcePerClick
  }

  checkUnlock()
  drawresource()
}

function drawresource() {
  // @ts-ignore
  document.getElementById('resourceQty').innerText = `Responsibilities avoided: ${resource}`
  let resourceTotal = document.getElementById('resourceCareer')
  // @ts-ignore
  resourceTotal.innerText = `Tomorrow me's Problems: ${resourceCareer}`
  // @ts-ignore
  document.getElementById('resourceInterval').innerText = `${resourcePerInterval}`
  // @ts-ignore
  document.getElementById('resourceClick').innerText = `${resourcePerClick}`
  // @ts-ignore
  document.getElementById('achievement').innerText = `Achievement: ${achievementCurrent}/${achievementTotal}`
}
function drawUpgrade() {
  // @ts-ignore
  //up1.querySelector("img").innerText = `+ 1 click`
  up1.querySelector("p").innerText = `cost: ${upgrades[0].cost}`
  // @ts-ignore
  up11.querySelector("span").innerText = `: ${upgrades[0].quantity}`
  // @ts-ignore
  //up2.querySelector("img").innerText = `+ 5 click`
  up2.querySelector("p").innerText = `cost: ${upgrades[1].cost}`
  // @ts-ignore
  up22.querySelector("span").innerText = `: ${upgrades[1].quantity}`
  // @ts-ignore
  //up3.querySelector("img").innerText = `+ 5 auto`
  up3.querySelector("p").innerText = `cost: ${upgrades[2].cost}`
  // @ts-ignore
  up33.querySelector("span").innerText = `: ${upgrades[2].quantity}`
  // @ts-ignore
  //up4.querySelector("img").innerText = `+ 5 auto`
  up4.querySelector("p").innerText = `cost: ${upgrades[3].cost}`
  // @ts-ignore
  up44.querySelector("span").innerText = `: ${upgrades[3].quantity}`
}
function buyUpgrade(targetUpgrade) {
  let purchaseUpgrade = upgrades.find(upgrade => upgrade.name == targetUpgrade)
  if (resource >= purchaseUpgrade.cost) {
    resource -= purchaseUpgrade.cost;
    purchaseUpgrade.cost = Math.floor(purchaseUpgrade.cost * purchaseUpgrade.costMuliplier)
    purchaseUpgrade.quantity++;
    purchaseUpgrade.value += (1 * purchaseUpgrade.mulitplier);
    statsUpdate()
    checkUnlock()
  }
  drawUpgrade()
  drawresource()
}

function statsUpdate() {
  let intervalTemp = 0
  let perTemp = 0
  upgrades.forEach(upgrade => {
    if (upgrade.type == 'interval') {
      intervalTemp += upgrade.value
    } else {
      perTemp += upgrade.value
    }
  })
  if (highScoreBonus.bonusActive == true) {
    resourcePerClick = (1 + perTemp) * highScoreBonus.bonusModifier
    resourcePerInterval = intervalTemp * highScoreBonus.bonusModifier
  } else {
    resourcePerClick = (1 + perTemp)
    resourcePerInterval = intervalTemp
  }
}


function intervalUpgrade() {
  upgrades.forEach(upgrade => {
    if (upgrade.type == 'interval') {
      if (highScoreBonus.bonusActive == false) {
        resource += upgrade.value
        resourceCareer += upgrade.value
      } else {
        resource += (upgrade.value * highScoreBonus.bonusModifier)
        resourceCareer += (upgrade.value * highScoreBonus.bonusModifier)
      }
    }
  })
  if (highScoreBonus.bonusRounds > 0) {
    highScoreBonus.bonusRounds--
    console.log(highScoreBonus.bonusRounds)
  } else {
    highScoreBonus.bonusActive = false;
  }
  let i = Math.random()
  //console.log(i, achievementCurrent, highScoreBonus.bonusRounds)
  if (i >= .9 && achievementCurrent >= 3 && highScoreBonus.bonusActive == false) {
    document.getElementById('score').innerHTML += `
    <marquee id="highscore" class="highscore" direction="down" behavior="alternate" Scrollamount=14 style="border:empty">
    <marquee behavior="alternate" Scrollamount=14>
      <Div class="fs-1" onclick="clickHighScore()">!HIGHSCORE!</Div>
    </marquee>
  </marquee>
    `
  }

  if (highScoreBonus.bonusActive == true) {
    let barPercent = (highScoreBonus.bonusRounds / highScoreBonus.bonusRoundsMax) * 100

    document.getElementById('progressBar').innerHTML = `
      <div id="highScoreBar" class="progress" role="progressbar">
      <div class="progress-bar scoreBar" style="width: ${barPercent}%"></div>
    </div>
      `
  } else {
    if (document.getElementById('highScoreBar') != null) {
      document.getElementById('highScoreBar').remove()
    }
  }

  statsUpdate()
  drawresource()
}

function checkUnlock() {
  if (resource >= 500 && musicUnlock == false) {
    //window.alert("You found your headphones plug in and listen?")
    // @ts-ignore
    document.getElementById('music').querySelector('audio').classList.remove('hidden')
    musicUnlock = true;
  }
  if (resource >= 10 && lights == false) {
    //window.alert("Eveyones asleep, Maybe we should play?")
    // @ts-ignore
    document.getElementById('body').classList.replace('bg-hidden', 'bg')
    lights = true;
  }

  let resourceAchievements = achievements.filter(achievement => achievement.Type == 'resource')
  let mileStoneAchievement = achievements.filter(achievement => achievement.Type == 'mile stone')

  resourceAchievements.forEach(achievement => {
    if ((resource >= achievement.condition) && achievement.locked == true) {
      //window.alert(`Achievement: ${achievement.name}`)
      achievementMessage(achievement)
      achievement.locked = false
      achievementCurrent++
      console.log(achievement)
    }
  })

  mileStoneAchievement.forEach(achievement => {
    if ((upgrades[achievement.arrayPosition].quantity >= achievement.condition) && achievement.locked == true) {
      //window.alert(`Achievement: ${achievement.name}`)
      achievementMessage(achievement)
      achievement.locked = false
      achievementCurrent++
      console.log(achievement)
    }
  })

  upgrades.forEach(upgrade => {
    if (resource >= upgrade.cost) {
      upgrade.unlocked = true;
    }
  })
  if (upgrades[1].unlocked == true) {
    // @ts-ignore
    up2.querySelector('img').classList.replace('locked', 'unlocked')
  }
  if (upgrades[2].unlocked == true) {
    // @ts-ignore
    up3.querySelector('img').classList.replace('locked', 'unlocked')
  }
  if (upgrades[3].unlocked == true) {
    // @ts-ignore
    up4.querySelector('img').classList.replace('locked', 'unlocked')
  }
  drawresource()
}

function achievementMessage(achievement) {
  // @ts-ignore
  Swal.fire({
    position: 'top-end',
    color: '#14ff0c',
    background: '#313431',
    title: `Achievement: ${achievement.name}`,
    showConfirmButton: false,
    timer: 2000
  })
  // @ts-ignore
  document.getElementById('body').classList.add('stop-click')
}
function removeStopClick() {
  // @ts-ignore
  if (document.getElementById('body').classList.contains('stop-click'))
    // @ts-ignore
    document.getElementById('body').classList.remove('stop-click')
}

function clickHighScore() {
  let highscore = document.getElementById('highscore');
  // @ts-ignore
  highscore.remove();

  highScoreBonus.bonusRounds = highScoreBonus.bonusRoundsMax;
  highScoreBonus.bonusActive = true;
  statsUpdate()
}

drawUpgrade()
drawresource()
setInterval(removeStopClick, 3000)
setInterval(intervalUpgrade, interval)