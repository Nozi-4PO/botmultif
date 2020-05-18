module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(guild) {
    await this.client.guilds.get("358098380729221133").channels.get('358928336401203200').send(`I just left the server **${guild.name}**`).catch(e => console.error(e));
    await this.client.user.setGame(`${this.client.config.setting.prefix}help | ${this.client.guilds.size} Servers`);
    this.client.serverConfig[message.guild.id] = {
        "servername" : message.guild.name,
        "prefix" : "!",
        "welcomeLog" : false,
        "logChannelId" : "",
        "logType" : 0,
        "noUsageChannels" : "",
        "blacklist" : ""
        }
  }
};