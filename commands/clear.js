const Command = require('../base/Command.js');

class Clear extends Command {
  constructor(client) {
    super(client, {
      name: 'clear',
      description: 'It clears between 2 and 99 messages.',
      usage: 'clear [user] <number>',
      category:'Moderation',
      guildOnly: true,
      aliases: ['prune','purge'],
      userPermNeeded: ['MANAGE_MESSAGES'],
      botPermNeeded: ['MANAGE_MESSAGES']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const user = message.mentions.users.first();
    const amount = parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);
    if (!amount) return message.reply('Must specify an amount to delete!');
    if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
    message.channel.fetchMessages({ limit: amount }).then((messages) => {
      if (user) {
        const filterBy = user ? user.id : this.client.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      }
      message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
      message.channel.send(`Done :thumbsup:`).then(m => m.delete(3000));
    });  
  }
}

module.exports = Clear;