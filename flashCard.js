/**
 * Created by juancarlosnavarrete on 4/11/17.
 */

var object = require("./constants.js");

var ClozeCard = function (text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.getCloze = function(){
        return this.cloze;
    };
    this.fullText = function(){
        return this.text;
    };
    this.partial = function(){
        //Returns 'text' with the cloze omitted.
        var str = this.fullText();
        var key = this.getCloze();

        if(str.includes(key)){
            return str.replace(key, '...');
        }else {
            console.log('Error cloze is not a substring of text.');
        }
    };
    this.focus = function () {
        //Returns text with the cloze in all Capitals.
        var text = this.partial();
        var key = this.getCloze();
        return text.replace('...', key.toUpperCase());
    }

};


var arrBasicCard = [];

for(var key in object){
    var myCloze = new ClozeCard(object[key], key);
    arrBasicCard.push(myCloze);
}


module.exports = arrBasicCard;
