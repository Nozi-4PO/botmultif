class Command {
    constructor(client, {
        name = null,
        description = 'No description available',
        category = 'General',
        usage = 'No information provided',
        extended = 'No detailed information provided',
        guildOnly = false,
        aliases = [],
        permLevel = 0,
        cost = 0,
        botPermNeeded = ['READ_MESSAGES', 'SEND_MESSAGES'],
        userPermNeeded = ['READ_MESSAGES', 'SEND_MESSAGES']
    }) {
        this.client = client;
        this.conf = {guildOnly, aliases, permLevel, botPermNeeded, userPermNeeded};
        this.help = {name, description, category, usage, extended, cost};
    }

// this peice of code below is copied directly as I dont even know what it does :P
    async verifyUser(user) {
    const match = /(?:<@!?)?([0-9]{17,20})>?/gi.exec(user);
    if (!match) throw 'Invalid user';
    const id = match[1];
    const check = await this.client.fetchUser(id);
    if (check.username !== undefined) return id;
  }
}
module.exports = Command;