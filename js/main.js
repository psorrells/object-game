const actions = ["study","move","eat","jump on"]

let person;

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
