let resource = 0;
let resourcePerClick = 1;
let resourcePerInterval = 0;
let resourceCareer = 0;

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

let upgrades = [
  {
    name: 'upgrade1',
    cost: 50,
    costMuliplier: 1.25,
    value: 0,
    mulitplier: 1,
    quantity: 0,
    type: 'click'
  }, {
    name: 'upgrade2',
    cost: 300,
    costMuliplier: 1.25,
    value: 0,
    mulitplier: 5,
    quantity: 0,
    type: 'click'
  }, {
    name: 'upgrade3',
    cost: 250,
    costMuliplier: 1.25,
    value: 0,
    quantity: 0,
    mulitplier: 1,
    type: 'interval'
  }, {
    name: 'upgrade4',
    cost: 1000,
    costMuliplier: 1.25,
    value: 0,
    quantity: 0,
    mulitplier: 5,
    type: 'interval'
  }
]

function resoureClick() {
  resource += resourcePerClick
  resourceCareer += resourcePerClick
  console.log(resource)
  drawresource()
}

function drawresource() {
  // @ts-ignore
  document.getElementById('resourceQty').innerText = `Responsibilities avoided: ${resource}`
  let resourceTotal = document.getElementById('resourceCareer')
  resourceTotal.innerText = `Tomorrow me's Problems: ${resourceCareer}`
  // @ts-ignore
  document.getElementById('resourceInterval').innerText = `${resourcePerInterval}`
  // @ts-ignore
  document.getElementById('resourceClick').innerText = `${resourcePerClick}`
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
  resourcePerClick = (1 + perTemp)
  resourcePerInterval = intervalTemp
}


function intervalUpgrade() {
  upgrades.forEach(upgrade => {
    if (upgrade.type == 'interval') {
      resource += upgrade.value
      resourceCareer += upgrade.value
      drawresource()
    }

  })
}

drawUpgrade()
drawresource()
setInterval(intervalUpgrade, 3000)