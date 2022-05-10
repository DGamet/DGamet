const { Discord, MessageEmbed } = require("discord.js")
const TicTacToe = require("discord-tictactoe")
const game = new TicTacToe({language: "de"})
module.exports = {
  name: "ttt",
  alias: ["spiele"],

  execute(client, message, args){
    game.handleMessage(message)
  }
}