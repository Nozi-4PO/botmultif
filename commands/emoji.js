const Command = require('../base/Command.js');

class Emoji extends Command {
  constructor(client) {
    super(client, {
      name: 'emoji',
      description: 'Displays all the emojis of the server.',
      usage: 'emoji',
      category: "Server",
      guildOnly: true
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    if(!args[0]){
      const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
      if (emojiList === "") emojiList = "No emoji found!";
      message.channel.send(emojiList);
    }
    try{
        console.log(args[0])
    } catch(error) {console.log(error)}
  }
}
module.exports = Emoji;