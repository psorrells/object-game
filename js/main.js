const actions = {
    "study": "intelligence",
    "move": "strength",
    "eat": "constitution",
    "jump on": "dexterity"
}

const interactions = Object.keys(actions)

let person1;
let currentObject;

/* OBJECTS */

/*NEW OBJECT CLASS*/
class Interactable {
    constructor(obj) {
        this.name = obj
        for (i of interactions) {
            this[i] = new ResultSet(i,obj)
        }
    }

    /* NEW RESULT CLASS */
    ResultSet(actionTaken, obj) {
    
            this["successRoll"] = 16
            this["moderateRoll"] = 9
            this["critical failure"] = `You critically fail to ${actionTaken} the ${obj}.`
            this["failure"] = `You fail to ${actionTaken} the ${obj}.`
            this["moderate"] = `You try to ${actionTaken} the ${obj}.`
            this["success"] = `You ${actionTaken} the ${obj}.`
            this["critical success"] = `You ${actionTaken} the ${obj} well.`
    }
}
/*OLD*/
//Standard Object stuff
const standardObject = {
    interact(person, action) {
        let s = this[action]["successRoll"]
        let m = this[action]["moderateRoll"]
        let check = doAbilityCheck(person[actions[action]],m,s)
        console.log(check)
        alert(this[action][check])
    }
}

//Chair
const chair = {
    "study": {
        "successRoll": 16,
        "moderateRoll": 9,
        "critical failure": "You have no idea how this works. As you attempt to study the chair, you pull a screw loose and the whole chair collapses.",
        "failure": "You can't figure out anything about the chair. You sit on it and ponder why sit on a chair, when you could just sit on the floor? Are chairs useful?",
        "moderate": "It's a solid wooden chair. Maybe if you did something else with it, you could get out of here.",
        "success": "The chair has 4 legs. A truly ingenious design, it seems to have no wobble to it. A very sturdy chair like this could be moved against a window to get out.",
        "critical success": "You look closely at the chair, as you assess all the angles and configurations, you realize there's a pattern on the legs. You turn each leg one by one, and look! The chair starts hovering. you can fly your way out of here!"
    },
    "move": {
        "successRoll": 14,
        "moderateRoll": 7,
        "critical failure": "You try to pick up the chair and break your hip. Should've stretched first.",
        "failure": "You try to pick up the chair, but it's much heavier than you assumed. You can only move it a few inches.",
        "moderate": "You move the chair. It's pretty solid, and surprisingly heavy, but you manage to move it to the window.",
        "success": "You move the chair with ease, placing it squarely beneath the window to get out.",
        "critical success": "You throw the chair as hard as you can. It breaks the wall, and you are free."
    },
    "eat": {
        "successRoll": 18,
        "moderateRoll": 9,
        "critical failure": "You try to take a huge bite out of that delicious looking solid oak chair. You crack your teeth.",
        "failure": "Somehow, you manage to bite off a few splinters of wood, but those splinters don't feel so good on the way down.",
        "moderate": "You try to eat the chair, but it is solid oak. You can't eat it.",
        "success": "You try to eat the chair, and manage to chew a few shavings, but you spit them out.",
        "critical success": "You eat the chair. Your stomach knows no bounds. The chair is gone, but you are able to eat the wall and find your way out of here."
    },
    "jump on": {
        "successRoll": 16,
        "moderateRoll": 9,
        "critical failure": "You try to jump on the chair, but as your foot hits the edge, it shatters. You fall on the floor and cry for hours.",
        "failure": "You try to jump on the chair, but are unable to get a good height and miss.",
        "moderate": "You try to jump on the chair. It wobbles for a second as your first foot lands, but stabilizes.",
        "success": "You jump on the chair with finesse. This was an easy task for you.",
        "critical success": "You jump on the chair with a jump so powerful that it shatters the earth beneath you and frees you from the walls you are confined in."
    },
}

//Apple
const apple = {
    "study": {
        "successRoll": 16,
        "moderateRoll": 9,
        "critical failure": "You attempt to use your brain on this apple. You place the apple in front of you, look upon it, and slam your head down. You don't know anything about it, but you have applesauce and a knot on your head now.",
        "failure": "You thought you knew something about apples, but you can't even figure out if it is a fruit or a vegetable.",
        "moderate": "It's a nice apple. Shiny, fresh, edible.",
        "success": "This is a pink lady apple. It has a sweet-tart flavor, and is a favorite of the programmer. Maybe if you ate it, it would help you out!",
        "critical success": "As you inspect the apple, you find a weird hole in it. You break the apple in half to find a key inside!"
    },
    "move": {
        "successRoll": 14,
        "moderateRoll": 7,
        "critical failure": "You try to grab the apple to move it, but your clumsy hands just smoosh it between your fingers. I hope you like applesauce and slimy hands.",
        "failure": "You try to move the apple. You pick it up, but you don't know where to put it down, so you set it back in the same spot.",
        "moderate": "You move the apple a little to the left. There, nice.",
        "success": "You roll the apple across the floor, and notice a slight grade to ground. What does this mean? Where are you?",
        "critical success": "You throw the apple over the wall. Someone on the other side notices it, lets a rope down over the wall, and lets you out of the room."
    },
    "eat": {
        "successRoll": 11,
        "moderateRoll": 6,
        "critical failure": "You try to eat the apple, but choke on a seed. Game over.",
        "failure": "You try to eat the apple, but don't really like apples, so you put it back down.",
        "moderate": "You eat the apple. It's pretty delicious.",
        "success": "You eat the apple. It's the best apple you've ever eaten. You never knew pink ladies could be so good. You eat the whole thing.",
        "critical success": "You eat the apple. This right here is the apple that keeps doctors away. You have become invincible, and smash your way through the walls."
    },
    "jump on": {
        "successRoll": 19,
        "moderateRoll": 14,
        "critical failure": "You try to jump on the apple, but slip on it instead and sprain your knee. You can't get up for 30 minutes.",
        "failure": "You try to jump on the apple, but it is too small to aim for, and you can't even land on it.",
        "moderate": "You try to jump on the apple, but can't quite get your balance, and it slips from under you.",
        "success": "You jump on the apple, creating not-so-delicious applesauce. It's full of shoe dirt, but by golly, did you jump on that apple.",
        "critical success": "You jump on the apple, landing perfectly on the stem. As you do this, the apple releases a drill component, and you drill your way out of the walls."
    },
}

//Bookcase
const bookcase = {
    "study": {
        "successRoll": 16,
        "moderateRoll": 9,
        "critical failure": "",
        "failure": "",
        "moderate": "",
        "success": "",
        "critical success": ""
    },
    "move": {
        "successRoll": 14,
        "moderateRoll": 7,
        "critical failure": "",
        "failure": "",
        "moderate": "",
        "success": "",
        "critical success": ""
    },
    "eat": {
        "successRoll": 11,
        "moderateRoll": 6,
        "critical failure": "",
        "failure": "",
        "moderate": "",
        "success": "",
        "critical success": ""
    },
    "jump on": {
        "successRoll": 19,
        "moderateRoll": 14,
        "critical failure": "",
        "failure": "",
        "moderate": "",
        "success": "",
        "critical success": ""
    },
}


//List of all objects in the scene
const interactables = {"chair": chair, "apple": apple, "bookcase": bookcase}

for (object in interactables) {
    Object.assign(interactables[object],standardObject)
}


//Making Character

document.querySelector("#submit-character").addEventListener('click', createACharacter)

function createACharacter() {
    const i = parseInt(document.querySelector("#int").value)
    const s = parseInt(document.querySelector("#str").value)
    const c = parseInt(document.querySelector("#con").value)
    const d = parseInt(document.querySelector("#dex").value)
    if (i + s + c + d != 10 || i < 0 || s < 0 || c < 0 || d < 0 || i > 10 || s > 10 || c > 10 || d > 10) {
        alert("Please give your charcter positive integer values that sum up to 10 where none are greater than 10 or less than 0")
    } else {
        person1 = makePerson(i - 2,s - 2,c - 2,d - 2)
        alert(`Character created! your stats are int:${person1.intelligence} str:${person1.strength} con:${person1.constitution} dex:${person1.dexterity}`)
        document.querySelector("#create-character").classList.add("hidden")
        document.querySelector("#room").classList.remove("hidden")
    }
}

function makePerson(i,s,c,d) {
    return {intelligence: i, strength: s, constitution: c, dexterity: d, location: 'floor'}
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
    currentObject = obj
}

function sendResponse(){
    const select = document.getElementById("interact-options")
    const action = select.options[select.selectedIndex].value
    interactables[currentObject].interact(person1,action)
    document.querySelector("#interact-screen").classList.add("hidden")
}
