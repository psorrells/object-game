const actions = ["study","move","eat","jump on"]

let person;

/* OBJECTS */
//Chair
const chair = {
    "study": {
        "critical failure": "You have no idea how this works. As you attempt to study the chair, you pull a screw loose and the whole chair collapses.",
        "failure": "You can't figure out anything about the chair. You sit on it and ponder why sit on a chair, when you could just sit on the floor? Are chairs useful?",
        "moderate": "It's a solid wooden chair. Maybe if you did something else with it, you could get out of here.",
        "success": "The chair has 4 legs. A truly ingenious design, it seems to have no wobble to it. A very sturdy chair like this could be moved against a window to get out.",
        "critical success": "You look closely at the chair, as you assess all the angles and configurations, you realize there's a pattern on the legs. You turn each leg one by one, and look! The chair starts hovering. you can fly your way out of here!"
    },
    "move": {
        "critical failure": 1,
        "failure": 2,
        "moderate": 3,
        "success": 4,
        "critical success": 5
    },
    "eat": {
        "critical failure": 1,
        "failure": 2,
        "moderate": 3,
        "success": 4,
        "critical success": 5
    },
    "jump on": {
        "critical failure": 1,
        "failure": 2,
        "moderate": 3,
        "success": 4,
        "critical success": 5
    },
}

function makePerson(i,s,c,d) {
    return {intelligence: i, strength: s, constitution: c, dexterity: d, location: 'floor'}
}


function calculateRoll(ability) {
    let natRoll = Math.ceil(Math.random * 20)
    let critStatus;
    switch (roll) {
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
