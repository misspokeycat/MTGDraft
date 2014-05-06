/****************************************************
* This is the Card class. Stuff will happen here.
****************************************************/
var fs = require('fs');

/* Returns a 'booster' array containing 14 cards (no land) from the specific set */
exports.makeBooster = function (set) {
    return fs.readFile(__dirname + '/../json/' + set + '.json', 'utf8', function(err, data) {
        if (err) {
            console.log('Couldn\'t open file json/' + set + '.json');
            return
        }
        var data = JSON.parse(data);
        cards = data["cards"];
        var booster = [];
        /*for (card in cards) {
            console.log(cards[card]["name"]);
        }*/
        var common = 0,
            rare = 0,
            uncommon = 0;
        while (booster.length < 14) {
            var aCard = cards[Math.floor(Math.random()*cards.length)];
            var rarity = aCard["rarity"];
            if ((rarity === "Rare" || rarity === "Mythic Rare") && rare < 1) { 
                booster.push(aCard);
                rare++;
            }
            else if (rarity === "Uncommon" && uncommon < 4) {
                booster.push(aCard);
                uncommon++;
            }
            else if (rarity === "Common" && common < 11) {
                booster.push(aCard);
                common++;
            }
        }
        return booster;
    });
}