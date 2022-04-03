# Welcome to the worst Escape Room ever!
Hi, this is the worst escape room ever, a rudimentary ttrpg-style text-based game where you can interact with objects and try to escape from a room! You can have as many players as you want and take turns interacting with objects in the space. Some interactions may have dire consequences, while others may help you win!

## Contributions
If you would like to contribute, please submit any contributions! This is for fun, so feel free to contribute as much or as little as you want, and try not to overwrite other objects. If you want to make your own object, give it a new name to identify it separately. It may also help to identify it with your name/username such as the "pamela suitcase" or the "whisperingGoats loveseat"

### Creating and Submitting Objects
Objects can be created using the Interactable class. Make sure your object and it's image have the same name, and your image is a 200x200 PNG stored in the images folder. I may switch everything to webP if it makes sense, but for now, thems the works.
To edit the results of interacting your object, use the Interactable.adjustResultSet method--
```
chair.adjustResultSet(
    actionTaken = "study", <-- this is the action you are applying these results to
    critFail = "You have no idea how this works.", <-- this is result presented to the user
    cFChange = {"intelligence": "+-1"}, <-- this is where you can put any effects on the current character, and hopefully soon, add functions to change objects/other characters
    fail = "You can't figure out anything about the chair.",
    fChange = {"position": "sitting"},
    mid = "It's a solid wooden chair.",
    mChange = null,
    succ = "The chair has 4 legs. A truly ingenious design, it seems to have no wobble to it.",
    sChange = null,
    critSucc = "You look closely at the chair...",
    cSChange = {"status": "free"}
    )
```
The result options are critical failure, failure, moderate(can be a failure or a success depending on how easy you think it should be to accomplish this task on this object), success, and critical success. For critical success, I have almost always made it an immediate exit to the room so far.

Please avoid foul language, anything too inappropriate for a pg-13 audience, anything racist/sexist/ableist etc. I'll try to moderate this, but if you see anything off, bring it up!
