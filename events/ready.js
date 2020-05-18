module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async execute() {
        this.client.log('log', `Logged in as ${this.client.user.username} and I'm ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`, 'Ready!');
        this.client.user.setGame(`${this.client.config.prefix}help | ${this.client.guilds.size} Servers`);
        this.client.executeFewThing();
        this.client.pushInitial();
    }
}