const Command = require('../base/Command.js');

class Help extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: 'Displays all the available commands for your permission level.',
      usage: 'help [command]',
      category: 'General',
      aliases: ['h', 'halp'],
    });
  }
 
  async run(message, args, level) {
    if(!args[0]){
      const prefix = message.guild ? this.client.serverConfig[message.guild.id].prefix : this.client.config.prefix;
      const mycommands = message.guild ? this.client.commands.filter(cmd => cmd.conf.permLevel <= level && message.member.hasPermission(cmd.conf.userPermNeeded, false, true)) : this.client.commands.filter(cmd => cmd.conf.permLevel <= level && cmd.conf.guildOnly !== true);
      const commandNames = mycommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      let currentCategory = '';
      let output = `= Command List =\n\n[Use ${prefix}help <commandname> for details]\n`;
      const sorted = mycommands.sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      sorted.forEach( c => {
        const cat = c.help.category;
        if (currentCategory !== cat) {
          output += `\n== ${cat} ==\n`;
          currentCategory = cat;
        }
        output += `${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
      });
      message.channel.send(output, {code:'asciidoc'});   
    }else{
      let command = args[0].toLowerCase();
      if (this.client.commands.has(command)) {
          command = this.client.commands.get(command);
          // checking for level and permission as well as guild
          if (level < command.conf.permLevel) return;
          if(message.guild){
              if(!message.member.hasPermission(command.conf.userPermNeeded, false, true)) return;            
          } else if(!message.guild && command.conf.guildOnly) return;
          // sending the content
          message.channel.send(`= ${this.client.capitalizeFirstLetter(command.help.name)} = \n${command.help.description}\nusage   \t:: ${command.help.usage}\nalises  \t:: ${command.conf.aliases.join(', ')}\ncategory\t:: ${command.help.category}`, {code:'asciidoc'});
      }
    }
  }
}
module.exports = Help;