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
