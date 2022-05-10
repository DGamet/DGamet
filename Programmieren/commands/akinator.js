const akinator = require("discord.js-akinator")

module.exports = {
  name: "akinator",
  alias: ["spiele"],

  execute(client, message, args){
    akinator(message, {
            language: "de", 
            childMode: false, 
            gameType: "character", 
            useButtons: true, 
            embedColor: "#1F1E33" 
        });
  }
}