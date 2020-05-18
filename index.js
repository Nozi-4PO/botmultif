const { Client, Collection, RichEmbed } = require('discord.js');
const {readdir} = require('fs-nextra');
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');
var Database = require("firebase-admin");

// initializing the database with required things.
var serviceAccount = require('./database/BigB-service-account.json');
Database.initializeApp({
  credential: Database.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASEURL
});
var ref = Database.database();

// The LookerBot class
class LookerBOT extends Client{
    constructor(options) {
    super(options);
    this.config = require('./config.json');
    this.commands = new Collection();
    this.aliases = new Collection();
    this.blackListTable = {};
    this.blackList = ref.ref('/blacklist');
    this.pointTableG = {};
    this.pointsGlobal = ref.ref('/points/global');
    this.coinsTableG = {};
    this.coinsGlobal = ref.ref('/coins');
    this.serverConfig = {};
    this.serverData = ref.ref('/servers');    
  }

// permission level getting
permLvlCheck(message){
    let permLvl = 0;
    if (client.config.ownerID.includes(message.author.id)) return permLvl = 10;
    if (!message.guild || !message.member) return 0;
    if (message.author.id === message.guild.owner.id) permLvl = 5;
    return permLvl;
}

// Permission check for bot and user (Not sure if used)
botPermCheck(message, perms){
    if(message.channel.type !== "dm") return;
    return message.channel.permissionsFor(message.guild.me).missing(perms);
}

userPermCheck(message, perms){
    if(message.channel.type !== "dm") return;
    return message.channel.permissionsFor(message.guild.message.author).missing(perms);
}

// Captitalizes the first letter of the whole string
capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Used to log
log(type, message, title) {
    if (!title) title = 'Log';
    console.log(`[${type}] [${title}]${message}`);
  }

// The database updating and initializing things
databaseUpdate(reference, file){
    reference.update(file);
  }

executeFewThing(){
    client.pointsGlobal.on('value', function(snapshot){
        client.pointTableG = snapshot.val();
    }, function(error){
        console.log(error);
    })

    client.serverData.on('value', function(snapshot){
        client.serverConfig = snapshot.val();
    }, function(error){
        console.log(error);
    })

    client.coinsGlobal.on('value', function(snapshot){
        client.coinsTableG = snapshot.val();
    }, function(error){
        console.log(error);
    })

    client.blackList.on('value', function(snapshot){
        client.blackListTable = snapshot.val();
    }, function(error){
        console.log(error);
    })

  }

pushInitial(){
    let initialData = {
            "points" : 1
    }
    if(client.pointTableG === {}){
        client.pointsGlobal.push(initialData);
    }
    if(client.serverConfig === {}){
        client.serverData.push(initialData);
    }
    if(client.coinsTableG === {}){
        client.coinsGlobal.push(initialData);
    }
  }

}

// making the global client be client
const client = new LookerBOT();

const handler = async() => {

    //event handler
  const evtFiles = await readdir('./events/');
  client.log('log', `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0];
    const event = new (require(`./events/${file}`))(client);
    client.on(eventName, (...args) => event.execute(...args));
    client.log('log', `Loading Event: ${eventName}. ✔`);
    delete require.cache[require.resolve(`./events/${file}`)];
  });

    //command handler
    const cmdFiles = await readdir('./commands/');
    client.log('log', `Loading a total of ${cmdFiles.length} commands.`);

    cmdFiles.forEach(f => {
    try {
        const props = new (require(`./commands/${f}`))(client);
        if (f.split('.').slice(-1)[0] !== 'js') return;
        client.log('log', `Loading Command: ${props.help.name}. ✔`);
        client.commands.set(props.help.name.toLowerCase(), props);
        if (props.init) props.init(client);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    } catch (e) {
        client.log(`Unable to load command ${f}: ${e}`);
    }
  });
  client.login(process.env.TOKEN);
};

handler();