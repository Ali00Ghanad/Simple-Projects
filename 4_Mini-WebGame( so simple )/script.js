let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const text = document.querySelector(".text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector(".monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weaponIcon = document.querySelector(".weaponIcon");
const btn1Icon = document.querySelector(".btn1 img");
const btn2Icon = document.querySelector(".btn2 img");
const btn3Icon = document.querySelector(".btn3 img");
// an array to determines weapons 
const weapons = [
    { name: 'dagger', power: 5, },
    { name: 'sword', power: 30, },
    { name: 'mace', power: 50, },
    { name: 'spear', power: 100, },
    ["icons/dagger.png", "icons/sword.png", "icons/mace.png", "icons/spear.png"],
];

// an arrya to determines monsters
const monsters = [
    {
        name: "mammoth",
        level: 2,
        health: 15
    },
    {
        name: "giant",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];
// define locations
const locations = [{
    name: "store",
    "button text": ["Buy health (10 gold)", "Buy weapon (30 gold)", "Back to town"],
    "button function": [buyHealth, buyWeapon, goTown],
    text: "You are at store . order what you want !"
},
{
    name: "jungle",
    "button text": ["Fight Mammoth", "Fight Giant", "Back to town"],
    "button function": [fightMammoth, fightGiant, goTown],
    text: "You are at the jungle. be careful..."
},
{
    name: "town",
    "button text": ["Go to store", "Go to jungle", "Fight dragon"],
    "button function": [goStore, goJungle, fightDragon],
    text: "You are back in town :D"
},
{
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button function": [fight, dodge, goTown],
    text: "You are fighting with "
},
{
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button function": [restart, restart, restart],
    text: "You die. ☠️"
},
{
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button function": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
},
{
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button function": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
},
];
button1.onclick = goStore;
button2.onclick = goJungle;
button3.onclick = fightDragon;
function goJungle() {
    update(locations[1]);
    text.innerText = "You enter the Jungle . choose the monster that you want to fight with !";
    changeTheIcon("icons/mammoth.png", "icons/giant.png", "icons/signpost.png");
}
function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button function"][0];
    button2.onclick = location["button function"][1];
    button3.onclick = location["button function"][2];
    text.innerText = location.text;
    monsterStats.style.display = 'none';
}
function goTown() {
    update(locations[2]);
    changeTheIcon("icons/vendor.png", "icons/jungle.png", "icons/dragon.png");
}
function goStore() {
    update(locations[0]);
    changeTheIcon("icons/health.png", "icons/weapon.png", "icons/signpost.png")
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        goldText.innerText = gold;
        health += 10;
        healthText.innerText = health;
    } else { text.innerText = "You don't have enough gold to buy health !"; }
}
function buyWeapon() {
    if (gold >= 30) {
        gold -= 30;
        currentWeapon++;
        inventory.push(weapons[currentWeapon].name);
        goldText.innerText = gold;
        if (inventory[currentWeapon] == "sword") { weaponIcon.src = "icons/sword.png"; }
        if (inventory[currentWeapon] == "mace") { weaponIcon.src = "icons/mace.png"; }
        if (inventory[currentWeapon] == "spear") { weaponIcon.src = "icons/spear.png"; }
    }
    else { text.innerText = "You don't have enough money to buy a new weapon !"; }
}
function fightMammoth() {
    fighting = 0;
    goFight();
    changeTheIcon("icons/fight.png","icons/shield.png","icons/signpost.png");
    text.innerText += " Mammoth !";
}
function fightGiant() {
    fighting = 1;
    goFight();
    changeTheIcon("icons/fight.png","icons/shield.png","icons/signpost.png");
    text.innerText += " Giant !";
}
function fightDragon() {
    fighting = 2;
    goFight();
    changeTheIcon("icons/fight.png","icons/shield.png","icons/signpost.png");
    text.innerText += " Dragon !";
}
function fight() {
    text.innerText = "The " + monsters[fighting].name + "attacks.";
    text.innerText += " You attack it with your" + weapons[currentWeapon].name + ".";
    health -= getMonsterValue(monsters[fighting].level); // example : 100 - 10
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerText += " You miss.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
        changeTheIcon("icons/winTheGame.png","icons/winTheGame.png","icons/winTheGame.png");
    }
}
function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}
function getMonsterValue(level) {
    /*
        what is hit ? (monster level * 5) - ([number between 0 , 1] * xp)
        example : (2 * 5) - ([0.2] * 0) = 10 - 0 => 10
    */
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}
function defeatMonster() {
    xp += monsters[fighting].level;
    gold += Math.floor(monsters[fighting].level * 6.7);
    xpText.innerText = xp;
    goldText.innerText = gold;
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
}
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goTown();
}
function lose() {
    update(locations[4]);
    changeTheIcon("icons/skull.png","icons/skull.png","icons/skull.png");
}
function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}
function goFight() {
    update(locations[3]);
    monsterStats.style.display = "block";
    monsterHealth = monsters[fighting].health;
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function changeTheIcon(path1, path2, path3) {
    btn1Icon.src = path1;
    btn2Icon.src = path2;
    btn3Icon.src = path3;
}