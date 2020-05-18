const answers = [ 'It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes definitely.', 'You may rely on it.', 'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.', "Don't count on it.", 'My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Very doubtful.' ];
const Command = require('../base/Command.js');

class Magic8 extends Command{
  constructor(client) {
    super(client, {
      name: 'magic8',
      description: 'Answers a question, magic 8 ball style.',
      usage: 'magic8 <question>?',
      category: 'Fun',
      aliases: ['8ball']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      if (!message.content.endsWith('?')) return message.reply('That does not look like a question, (hint, end your question with a `?`.)');
      const msg = await message.channel.send('`Thinking...`');
      setTimeout( async () => {
        await msg.edit(`${answers[Math.floor(Math.random() * answers.length)]}`);
      }, Math.random() * (1 - 5) + 1 * 2000);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Magic8;