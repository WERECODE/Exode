const { Client,WebhookClient } = require("discord.js-selfbot-v13");
const dotenv = require('dotenv');
const webhookClient = new WebhookClient({ id: '1083215260913258607', token: 'r7FOLZUe5mlf6DIecNA_XflBXzaz5fJjuiYTL2YKMjcFdGb9sP5BWqT1zpX-5TkCce8R' });
const user = "NA";
let verticalBars = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||​||";
let content;
const deletedMessages = new Map();
const snipedEdits = new Map();
const snipeQueue = new Map();
let embedColor = '255255255';
require('dotenv').config();
const client = new Client({
    checkUpdate: false,
});

client.on('ready', () => {
  console.log("Logged in as " + client.user.username);
});


client.on('message', message => {
    if (message.content.startsWith('.color')) {
      const newColor = message.content.split(' ')[1];
      if (newColor) {
        if (newColor.includes('#')) {
            const color = newColor.replace('#', '');
            embedColor = color;
        }
        message.channel.send("||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||https://rauf.wtf/embed/?title=.color&description=New%20Embed%20Color%20SET!&color=" + embedColor + "&redirect=https%253A%252F%252Fembed.vip%252Fembed%252F");
      } else {
        message.channel.send('Please provide a new color.');
      }
      console.log('Command used: color');
      message.delete()
    }
  });

  client.on('message', async (message) => {
    if (message.content === "ping") {
      await message.delete(); // delete the original message
      message.channel.send("pong");
      console.log('Command used: ping');
    }
  });  

// Snipe edited messages

client.on('messageUpdate', (oldMessage, newMessage) => {

  const snipe = {
    oldContent: oldMessage.content,
    newContent: newMessage.content,
    author: oldMessage.author ? oldMessage.author.username : 'Unknown User',
    avatarURL: oldMessage.author ? oldMessage.author.avatarURL({ format: 'png', dynamic: true, size: 2048 }) : '',
    channelName: oldMessage.channel.name,
    createdAt: oldMessage.createdAt
  };

  snipeQueue.set(oldMessage.channel.id, snipe);
});

// Snipe Deleted
client.on('messageDelete', async message => {
    if (message.author === client.user) {
  return;
}
  try {
    deletedMessages.set(message.channel.id, message);
    console.log(`${message.author.username} Deleted: ${message.content}`);
    let content = message.content ? message.content.replace(/ /g, '%20') : '';
    let user = message.author ? message.author.username.replace(/ /g, '%20') : "Unknown%20User";
    const embedURL = `https://rauf.wtf/embed/?author=.Snipe&title=Deleted%20Message&description=Channel%3A%20${message.channel.name}%0AUser%3A%20${user}%0AContent%3A%20${content}&color=${embedColor}&image=${message.author ? message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 }) : ''}&redirect=embed.vip`;
    await webhookClient.send(`${verticalBars}\n${embedURL}`);
  } catch (error) {
    console.error(error);
  }
});

client.on('message', async message => {
  if (message.content === '.snipe') {
    try {
      const deletedMessage = deletedMessages.get(message.channel.id);
      if (!deletedMessage) {
        return message.channel.send('There are no deleted messages in this channel.');
      }

      if (message.author.id !== client.user.id) {
        return;
      }

      let content = deletedMessage.content ? deletedMessage.content.replace(/ /g, '%20') : '';
      let user = deletedMessage.author ? deletedMessage.author.username.replace(/ /g, '%20') : "Unknown%20User";
      let channel = deletedMessage.channel.name ? deletedMessage.channel.name.replace(/ /g, '%20') : "Unknown%20Channel";
      const embedURL = `https://rauf.wtf/embed/?author=.Snipe&title=Deleted%20Message&description=Channel%3A%20${channel}%0AUser%3A%20${user}%0AContent%3A%20${content}&color=${embedColor}&image=${deletedMessage.author ? deletedMessage.author.avatarURL({ format: 'png', dynamic: true, size: 2048 }) : ''}&redirect=embed.vip`;
      await message.channel.send(`${verticalBars}\n${embedURL}`);
      await message.delete();

      await webhookClient.send(`${verticalBars}\n${embedURL}`);
      console.log('Command used: snipe');
    } catch (error) {
      await webhookClient.send(`Message too large`)
    }
  }
});

client.on('message', message => {
  if (message.content === '.snipeedit') {
    const snipedEdit = snipeQueue.get(message.channel.id);
    if (!snipedEdit) {
      return message.channel.send('There are no sniped edits in this channel.');
    }

    const embedURL = `https://embed.rauf.workers.dev/?author=.snipeedit&title=Edited%2520Message&description=Old%3A%20${snipedEdit.oldContent}%0AEdited%3A%20${snipedEdit.newContent}%0A%0AAuthor%3A%20${snipedEdit.author}%0AChannel%3A%20${snipedEdit.channelName}&color=${embedColor}&image=${snipedEdit.avatarURL}`

    message.channel.send(verticalBars + embedURL);
    message.delete()
    console.log('Command used: edit');
  }
});

client.on('message', message => {
  if (message.content.startsWith('.avatar')) {
    const user = message.mentions.users.first() || message.author;
    const avatarURL = user.avatarURL({ format: 'png', dynamic: true, size: 2048 });
    const embedURL = `https://rauf.wtf/embed/?author=${user.username}&color=${embedColor}&image=${avatarURL}&redirect=embed.vip`
    if (avatarURL) {
      message.channel.send(verticalBars + 
          `${String.fromCharCode(8203)}||${embedURL}`);
          message.delete();
    } else {
      message.channel.send(`User ${user.username} has no avatar`);
    }
    console.log('Command used: avatar');
  }
});

  client.on('message', async message => {
    if (message.content.startsWith('.ban')) {
      if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply(`${verticalBars}https://rauf.wtf/embed/?description=You%2520do%2520not%2520have%2520permission%2520to%2520use%2520this%2520command%21&color=${embedColor}&redirect=embed.vip`);
      }
  
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply(`${verticalBars}https://rauf.wtf/embed/?description=Please%2520mention%2520the%2520user%2520you%2520want%2520to%2520ban.&color=${embedColor}}&redirect=embed.vip`);
      }
  
      const member = message.guild.member(user);
      if (!member) {
        return message.reply(`${verticalBars}https://rauf.wtf/embed/?description=That%2520user%2520is%2520not%2520a%2520member%2520of%2520this%2520server.&color=${embedColor}&redirect=embed.vip`);
      }
  
      try {
        await member.ban();
        message.channel.send(`${verticalBars}https://rauf.wtf/embed/?description=Successfully%2520banned%2520${user.tag}&color=ffffff&redirect=embed.vip`);
      } catch (error) {
        console.error(error);
        message.reply(`https://rauf.wtf/embed/?description=An%2520error%2520occurred%2520while%2520trying%2520to%2520ban%2520the%2520user.&color=${embedColor}&redirect=embed.vip`);
      }
      message.delete()
      console.log('Command used: ban');
    }
  });

  client.on('messageCreate', message => {
    if (message.author.bot) return;
    
    if (message.content.startsWith('.changeavatar')) {
      const newAvatarUrl = message.content.split(' ')[1];
      if (!newAvatarUrl) {
        return message.reply('Please provide a valid URL for the new avatar.');
      }
    
      client.user.setAvatar(newAvatarUrl)
        .then(() => {
          const avatarURL = client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 });
          message.reply(`${verticalBars}https://rauf.wtf/embed/?description=Avatar%2520Changed%21&color=${embedColor}&image=${avatarURL}`);
        })
        .catch(error => {
          console.error('Error updating avatar:', error);
          message.reply('There was an error updating the avatar. Please try again later.');
        });
    }
  });  
  
  

client.login(process.env.TOKEN)
