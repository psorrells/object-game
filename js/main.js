const actions = {
    "study": "intelligence",
    "move": "strength",
    "eat": "constitution",
    "jump on": "dexterity"
}

let noise;


//List of all interactable objects in the scene
const interactables = {}

//List of all Characters in the game
const characters = []


let currentCharacter;
let currentObject;

/* OBJECTS */

/*INTERACTABLE CLASS*/
class Interactable {
    constructor(obj) {
        this.name = obj
        //add the object to the screen
        const newInteractable = document.createElement("div")
        newInteractable.classList.add("interactable")
        newInteractable.id = obj
        document.getElementById("interactables").appendChild(newInteractable)
        //add an image of the object to the object
        const img = document.createElement("img")
        img.src = `images/${obj}.png`
        img.alt = `This is a(n) ${obj}`
        document.getElementById(obj).appendChild(img)
        //add basic result sets to all action possibilities
        for (let i of Object.keys(actions)) {
            this[i] = new ResultSet(i,obj)
        }
        //add object to the list of objects
        interactables[obj] = this
        //Result set object maker with defaults
        function ResultSet(actionTaken, obj, s = 16, m = 9, critFail = null, fail = null, mid = null, succ = null, critSucc = null) {
                this["successRoll"] = s;
                this["moderateRoll"] = m;
                this["critical failure"] = {
                    result: critFail || `You critically fail to ${actionTaken} the ${obj}.`,
                    changes: {}};
                this["failure"] = {
                    result: fail || `You fail to ${actionTaken} the ${obj}.`,
                    changes: {}};
                this["moderate"] = {
                    result: mid || `You try to ${actionTaken} the ${obj}.`,
                    changes: {}};
                this["success"] = {
                    result: succ || `You ${actionTaken} the ${obj}.`,
                    changes: {}};
                this["critical success"] = {
                    result: critSucc || `You ${actionTaken} the ${obj} well.`,
                    changes: {}
                };
        }
    }

    //Change the values of a result set
    adjustResultSet(actionTaken, critFail = null, cFChange = null, fail = null, fChange = null, mid = null, mChange = null, succ = null, sChange = null, critSucc = null, cSChange = null, s = null, m = null) {
        (critFail != null) && (this[actionTaken]["critical failure"]["result"] = critFail);
        (critFail != null) && (this[actionTaken]["critical failure"]["changes"] = cFChange);
        (fail != null) && (this[actionTaken]["failure"]["result"] = fail);
        (fail != null) && (this[actionTaken]["failure"]["changes"] = fChange);
        (mid != null) && (this[actionTaken]["moderate"]["result"] = mid);
        (mid != null) && (this[actionTaken]["moderate"]["changes"] = mChange);
        (succ != null) && (this[actionTaken]["success"]["result"] = succ);
        (succ != null) && (this[actionTaken]["success"]["changes"] = sChange);
        (critSucc != null) && (this[actionTaken]["critical success"]["result"] = critSucc);
        (critSucc != null) && (this[actionTaken]["critical success"]["changes"] = cSChange);
        (s != null) && (this[actionTaken]["successRoll"] = s);
        (m != null) && (this[actionTaken]["moderateRoll"] = m);
    }

    //Perform an interaction with an object

    interact(character, action) {
        switch(action) {
            case('study'):
                getSoundURI('hmmm')
                break;
            case('move'):
                getSoundURI('exhale')
                break;
            case('eat'):
                getSoundURI('chew')
                break;
            case('jump on'):
                getSoundURI('hup')
                break;
        }
        let s = this[action]["successRoll"]
        let m = this[action]["moderateRoll"]
        let check = doAbilityCheck(character[actions[action]],m,s)
        character.update(this[action][check]["changes"])
        alert(this[action][check]["result"])
    }


}

//Chair
const chair = new Interactable("chair")
chair.adjustResultSet(
    actionTaken = "study",
    critFail = "You have no idea how this works. As you attempt to study the chair, you pull a screw loose and the whole chair collapses.",
    cFChange = {"intelligence": "+-1"},
    fail = "You can't figure out anything about the chair. You sit on it and ponder why sit on a chair, when you could just sit on the floor? Are chairs useful?",
    fChange = {"position": "sitting"},
    mid = "It's a solid wooden chair. Maybe if you did something else with it, you could get out of here.",
    mChange = null,
    succ = "The chair has 4 legs. A truly ingenious design, it seems to have no wobble to it. A very sturdy chair like this could be moved against a window to get out.",
    sChange = null,
    critSucc = "You look closely at the chair, as you assess all the angles and configurations, you realize there's a pattern on the legs. You turn each leg one by one, and look! The chair starts hovering. you can fly your way out of here!",
    cSChange = {"status": "free"}
    )

chair.adjustResultSet(
    actionTaken = "move",
    critFail = "You try to pick up the chair and break your hip. Should've stretched first.",
    null,
    fail = "You try to pick up the chair, but it's much heavier than you assumed. You can only move it a few inches.",
    null,
    mid = "You move the chair. It's pretty solid, and surprisingly heavy, but you manage to move it to the window.",
    null,
    succ = "You move the chair with ease, placing it squarely beneath the window to get out.",
    null,
    critSucc = "You throw the chair as hard as you can. It breaks the wall, and you are free.",
    null,
    s = 14,
    m = 7,
)

chair.adjustResultSet(
    actionTaken = "eat",
    critFail = "You try to take a huge bite out of that delicious looking solid oak chair. You crack your teeth.",
    null,
    fail = "Somehow, you manage to bite off a few splinters of wood, but those splinters don't feel so good on the way down.",
    null,
    mid = "You try to eat the chair, but it is solid oak. You can't eat it.",
    null,
    succ = "You try to eat the chair, and manage to chew a few shavings, but you spit them out.",
    null,
    critSucc = "You eat the chair. Your stomach knows no bounds. The chair is gone, but you are able to eat the wall and find your way out of here.",
    null,
    s = 18,
    m = 9,
)

chair.adjustResultSet(
    actionTaken = "jump on",
    critFail = "You try to jump on the chair, but as your foot hits the edge, it shatters. You fall on the floor and cry for hours.",
    null,
    fail = "You try to jump on the chair, but are unable to get a good height and miss.",
    null,
    mid = "You try to jump on the chair. It wobbles for a second as your first foot lands, but stabilizes.",
    null,
    succ = "You jump on the chair with finesse. This was an easy task for you.",
    null,
    critSucc = "You jump on the chair with a jump so powerful that it shatters the earth beneath you and frees you from the walls you are confined in.",
    null
    )
//Apple
const apple = new Interactable("apple")
apple.adjustResultSet(
    actionTaken = "study",
    critFail = "You attempt to use your brain on this apple. You place the apple in front of you, look upon it, and slam your head down. You don't know anything about it, but you have applesauce and a knot on your head now.",
    null,
    fail = "You thought you knew something about apples, but you can't even figure out if it is a fruit or a vegetable.",
    null,
    mid = "It's a nice apple. Shiny, fresh, edible.",
    null,
    succ = "This is a pink lady apple. It has a sweet-tart flavor, and is a favorite of the programmer. Maybe if you ate it, it would help you out!",
    null,
    critSucc = "As you inspect the apple, you find a weird hole in it. You break the apple in half to find a key inside!",
    null
    )
apple.adjustResultSet(
    actionTaken = "move",
    critFail = "You try to grab the apple to move it, but your clumsy hands just smoosh it between your fingers. I hope you like applesauce and slimy hands.",
    null,
    fail = "You try to move the apple. You pick it up, but you don't know where to put it down, so you set it back in the same spot.",
    null,
    mid = "You move the apple a little to the left. There, nice.",
    null,
    succ = "You roll the apple across the floor, and notice a slight grade to ground. What does this mean? Where are you?",
    null,
    critSucc = "You throw the apple over the wall. Someone on the other side notices it, lets a rope down over the wall, and lets you out of the room.",
    null,
    s = 14,
    m = 7,
    )
apple.adjustResultSet(
    actionTaken = "eat",
    critFail = "You try to eat the apple, but choke on a seed. Game over.",
    null,
    fail = "You try to eat the apple, but don't really like apples, so you put it back down.",
    null,
    mid = "You eat the apple. It's pretty delicious.",
    null,
    succ = "You eat the apple. It's the best apple you've ever eaten. You never knew pink ladies could be so good. You eat the whole thing.",
    null,
    critSucc = "You eat the apple. This right here is the apple that keeps doctors away. You have become invincible, and smash your way through the walls.",
    null,
    s = 11,
    m = 6,
    )
apple.adjustResultSet(
    actionTaken = "jump on",
    critFail = "You try to jump on the apple, but slip on it instead and sprain your knee. You can't get up for 30 minutes.",
    null,
    fail = "You try to jump on the apple, but it is too small to aim for, and you can't even land on it.",
    null,
    mid = "You try to jump on the apple, but can't quite get your balance, and it slips from under you.",
    null,
    succ = "You jump on the apple, creating not-so-delicious applesauce. It's full of shoe dirt, but by golly, did you jump on that apple.",
    null,
    critSucc = "You jump on the apple, landing perfectly on the stem. As you do this, the apple releases a drill component, and you drill your way out of the walls.",
    null,
    s = 19,
    m = 14,
    )
//Bookcase
const bookcase = new Interactable("bookcase")

//Making Characters

class Character {
    constructor(name,i,s,c,d) {
        this.name = name
        this.intelligence = i - 2
        this.strength = s - 2
        this.constitution = c - 2
        this.dexterity = d - 2
        this.location = 'floor'
        this.position = 'standing'
        this.status = 'healthy'
    }

    update(changes) {
        for (let property in changes) {
            if (typeof changes[property] == 'function') {
                changes[property]()
            } else if (changes[property].includes("+")) {
                this[property] += parseInt(changes[property].slice(1))
            } else {
                this[property] = changes[property]
            }
        }
    }
}

document.querySelector("#submit-character").addEventListener('click', createACharacter)

function createACharacter() {
    let name = document.querySelector("#name").value
    const i = parseInt(document.querySelector("#int").value)
    const s = parseInt(document.querySelector("#str").value)
    const c = parseInt(document.querySelector("#con").value)
    const d = parseInt(document.querySelector("#dex").value)
    if (!name.trim()) {
        name = `Nameless Drifter #${Math.ceil(Math.random()*1000)}`
    }
    if (i + s + c + d != 10 || i < 0 || s < 0 || c < 0 || d < 0 || i > 10 || s > 10 || c > 10 || d > 10) {
        alert("Please give your charcter positive integer values that sum up to 10 where none are greater than 10 or less than 0")
    } else {
        currentCharacter = new Character(name,i,s,c,d)
        characters.push(currentCharacter)
        alert(`Character created! ${currentCharacter.name}'s stats are int:${currentCharacter.intelligence} str:${currentCharacter.strength} con:${currentCharacter.constitution} dex:${currentCharacter.dexterity}`)
        document.querySelectorAll("input").forEach(input => input.value = "")
        document.querySelector("#character-list").innerHTML = characters.map(character => `<li>${character.name}</li>`).join('')
    }
}

//Start the Game
document.querySelector("#start").addEventListener('click',startGame)

function startGame() {
    if (!characters[0]) {
        alert("please create at least one character!")
        throw new Error('no character created')
    }
    currentCharacter = characters[0]
    document.querySelector("#create-character").classList.add("hidden")
    document.querySelector("#room").classList.remove("hidden")
    updateRoom()
}

//Ability Checking

function calculateRoll(ability) {
    let natRoll = Math.ceil(Math.random() * 20)
    let critStatus;
    switch (natRoll) {
        case 20:
            critStatus = "success";
            break;
        case 1:
            critStatus = "failure";
            break;
        default:
            critStatus = "none";
            break;
    }
    let thisCheck = {
        roll: natRoll + ability,
        crit: critStatus
    }
    return thisCheck
}

function doAbilityCheck(ability, moderateValue, successValue) {
    let abilityCheck = calculateRoll(ability)
    if (abilityCheck.crit === "success") {
        return "critical success"
    } else if (abilityCheck.crit === "failure") {
        return "critical failure"
    } else if (abilityCheck.roll < moderateValue) {
        return "failure"
    } else if (abilityCheck.roll < successValue) {
        return "moderate"
    } else {
        return "success"
    }
}

// Interact with an object

document.querySelectorAll(".interactable").forEach(item => item.addEventListener('click', () => startInteraction(item.getAttribute("id"))))
document.querySelector("#roll-check").addEventListener('click', sendResponse)


function startInteraction(obj) {
    document.getElementById("interact-screen").classList.remove('hidden')
    document.querySelector("#interact-screen h2").textContent = `What do you want to do with the ${obj}`
    currentObject = obj
    getSoundURI(obj)
}

function sendResponse(){
    const select = document.getElementById("interact-options")
    const action = select.options[select.selectedIndex].value
    interactables[currentObject].interact(currentCharacter,action)
    document.querySelector("#interact-screen").classList.add("hidden")
    currentCharacter = characters[(characters.findIndex(c => c.name === currentCharacter.name) + 1)%(characters.length)]
    console.log(`Up Next: ${currentCharacter.name}`)
    updateRoom()
}

function updateRoom() {
    document.getElementById("current-player").textContent = `Current Player: ${currentCharacter.name}`
}

//Add a sound effect uri to something
function getSoundURI(sound) {
    fetch(`https://freesound.org/apiv2/search/text/?query=${sound}&fields=name,previews,tags&token=MWlDKBaMtdIv0AcuLn4bWTNspcLDqFsfGzkkTfRt`)
    .then(res=>res.json())
    .then(data => {
        noise = new Audio(data.results[0].previews["preview-hq-mp3"])
        noise.play()
        setTimeout(()=> noise.pause(), 5000)
    })
    .catch(err => console.log(err))
}
