const actions = {
    "study": "intelligence",
    "move": "strength",
    "eat": "constitution",
    "jump on": "dexterity"
}

let person1 = makePerson(4,3,2,1)

/* OBJECTS */
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
        "successRoll": 16,
        "moderateRoll": 9,
        "critical failure": "You try to pick up the chair and break your hip. Should've stretched first.",
        "failure": "You try to pick up the chair, but it's much heavier than you assumed. You can only move it a few inches.",
        "moderate": "You move the chair. It's pretty solid, and surprisingly heavy, but you manage to move it to the window.",
        "success": "You move the chair with ease, placing it squarely beneath the window to get out.",
        "critical success": "You throw the chair as hard as you can. It breaks the wall, and you are free."
    },
    "eat": {
        "successRoll": 16,
        "moderateRoll": 9,
        "critical failure": "You try to take a huge bite out of that deliciously looking solid oak chair. You crack your teeth.",
        "failure": "Somehow, you manage to bite off a few splinters of wood, but those splinters don't feel so good on the way down.",
        "moderate": "You try to eat the chair, but it is solid oak. You can't eat it.",
        "success": "You try to eat the chair, and manage to chew a few shavings, but you spit them out.",
        "critical success": "You eat the chair. Your stomach knows no bounds. The chair is gone, but you are now made of wood and able punch your way through the wall out of here."
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
    interact(person, action) {
        let s = this[action]["successRoll"]
        let m = this[action]["moderateRoll"]
        let check = doAbilityCheck(person[actions[action]],m,s)
        console.log(check)
        alert(this[action][check])
    }
}

function makePerson(i,s,c,d) {
    return {intelligence: i, strength: s, constitution: c, dexterity: d, location: 'floor'}
}


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
    console.log(thisCheck)
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
