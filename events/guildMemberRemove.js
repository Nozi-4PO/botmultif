const { RichEmbed } = require('discord.js');
const { Canvas } = require('canvas-constructor');
const snek = require('snekfetch');
const { resolve, join } = require('path');
const fsn = require('fs-nextra');
Canvas.registerFont(resolve(join(__dirname, '../assets/fonts/Discord.ttf')), 'Discord');

const MakeLeaveImg = async (person, guildname) => {
  const png = person.displayAvatarURL.replace(/\.gif.+/g, '.png');
  const { body } = await snek.get(png);
  const pName = person.tag;
  let WelName = 'GOODBYE';
  let enjoyStay = `We hope you enjoyed here at ${guildname}`
  return new Canvas(1024, 450)
    .addImage(body, 384, 20, 256, 256, { type: 'round', radius: 128 })
    .restore()
    .setTextFont('80px Discord')
    .setColor('#FFFFFF')
    .setTextAlign('center')
    .addText(WelName, (512 - (WelName.length/2)), 350)
    .setTextFont('38px Discord')
    .addText(pName,(512-(pName.length/2)),388)
    .setTextFont('30px Discord')
    .addText(enjoyStay,(512-(enjoyStay.length/2)),440)
    .toBuffer();
};

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(member) {
    try{
    this.client.executeFewThing();
    let serverID = member.guild.id;
    if(this.client.serverConfig[serverID].welcomeLog === false) return;
    var byebyemsg = 
    [
        `**${member.user.tag}** is gone, Cries !!!`,
        `**${member.user.tag}** ran away seeing a :snake: :stuck_out_tongue_winking_eye:`,
        `We have lost our player **${member.user.tag}**!`,
        `We need a substitute for **${member.user.tag}**.`,
	    `Please say goodbye to **${member.user.tag}** we will miss you!`,
	    `**${member.user.tag}** left without telling bye :neutral_face: .`,
	    `I had sensed something wiered about **${member.user.tag}**`
    ] 
    var randomNumber = Math.floor(Math.random()*byebyemsg.length); 
    const embed = new RichEmbed()
    .setColor(0xE0082d)
    .setDescription(byebyemsg[randomNumber])
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter(this.client.user.username, this.client.user.avatarURL);

    //trying to send the log detail to log channel   
    let logChannelID = this.client.serverConfig[serverID].logChannelId;
    if (logChannelID === "") return;
    if(this.client.serverConfig[serverID].logType == 1){
        try{
        member.guild.channels.get(logChannelID).send(byebyemsg[randomNumber])
    }catch(errror) {
         console.log(errror)
        }
    } else if(this.client.serverConfig[serverID].logType == 2){
        try{
        member.guild.channels.get(logChannelID).send({embed}).catch(err => console.error(err));
        }catch(errror) {
         console.log(errror)
        }
    } else if(this.client.serverConfig[serverID].logType == 3){
        try{
          const person = member.user;
          const result = await MakeLeaveImg(person, member.guild.name);
          await member.guild.channels.get(logChannelID).send({files: [{attachment: result, name: `welcome${person.tag}.png`}]});
        }catch (error){
         console.log(error)
        }
    }
    } catch(error) {console.log(error)}
  }
};