"use strict";

var Bot = require('telegram-api').default;
var Message = require('telegram-api/types/Message');
var File = require('telegram-api/types/File'); 
var Keyboard = require('telegram-api/types/Keyboard'); 
var bot = new Bot({
  token: 'Put your token here'
});
var myid = 265228448; // Replace it with your token
var request = require('request');
var fs = require('fs'); // Config
var yoda_said = [
  '"Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering." -- Yoda \n',
  '"Confer on you, the level of Jedi Knight, the Council does. But, agree with your taking this boy as your Padawan Learner, I do not." -- Yoda to Obi-Wan Kenobi\n',
  '"Qui-Gon\'s defiance I sense in you. Need that you do not. Agree with you, the Council does. Your apprentice young Skywalker will be." -- Yoda to Obi-Wan Kenobi\n',
  '"Lost a planet, Master Obi-Wan has. How embarrassing, how embarrassing." -- Yoda\n',
  '"Go to the center of the gravity\'s pull, and find your planet you will." -- Yoda to Obi-Wan\n',
  '"Meditate on this, I will." -- Yoda\n',
  '"Clear, your mind must be if you are to discover the real villains behind the plot." -- Yoda to Obi-Wan\n',
  '"Pain. Suffering. Death, I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain." -- Yoda\n',
  '"Around the survivors, a perimeter create!" -- Yoda\n',
  '"Powerful you have become, Dooku. The dark side I sense in you." -- Yoda to Dooku\n',
  '"Master Obi-Wan, not victory. The shroud of the dark side has fallen. Begun, the Clone War has!" -- Yoda\n',
  '"Much to learn, you still have." -- Yoda to Dooku\n',
  '"Like fire across the galaxy, the Clone Wars spread. In league with the wicked Count Dooku more and more planets slip. Upon the Jedi Knights falls the duty to lead the newly formed Army of the Republic." -- Yoda\n',
  '"Death is a natural part of life. Rejoice for those who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealousy. The shadow of greed, that is." -- Yoda\n',
  '"Careful you must be when sensing the future, Anakin. The fear of loss is a path to the dark side." -- Yoda to Anakin Skywalker\n',
  '"Train yourself to let go of everything you fear to lose." -- Yoda to Anakin Skywalker\n',
  '"Go, I will. Good relations with the Wookiees, I have." -- Yoda\n',
  '"Too much under the sway of the Chancellor, he is. Much anger there is in him. Too much pride in his powers." -- Yoda\n',
  '"If a special session of Congress there is, easier for us to enter the Jedi Temple it will be." -- Yoda\n',
  '"If into the security recordings you go, only pain will you find." -- Yoda to Obi-Wan Kenobi\n',
  '"Destroy the Sith, we must." -- Yoda\n',
  '"To fight this Lord Sidious, strong enough, you are not." -- Yoda to Obi-Wan Kenobi\n',
  '"Twisted by the dark side, young Skywalker has become." -- Yoda to Obi-Wan Kenobi\n',
  '"The boy you trained, gone he is, consumed by Darth Vader." -- Yoda to Obi-Wan Kenobi\n',
  '"I hear a new apprentice you have, Emperor. Or should I call you Darth Sidious?" -- Yoda to Palpatine\n',
  '"At an end your rule is, and not short enough it was." -- Yoda to Palpatine\n',
  '"Not if anything to say about it, I have!" -- Yoda\n',
  '"Into exile I must go. Failed, I have." -- Yoda to Bail Organa\n',
  '"If so powerful you are, why leave?" -- Yoda\n',
  '"Faith in your new apprentice, misplaced may be. As is your faith in the dark side of the Force." -- Yoda\n',
  'Luke: "I feel like". Yoda: "Feel like what?" -- Luke Skywalker and Yoda\n',
  '"Looking? Found someone you have I would say, mm?" -- Yoda\n',
  '"Help you I can! Yes! Mm!" -- Yoda to Luke\n',
  '"Awww, cannot get your ship out, heh-heheheh!" -- Yoda to Luke\n',
  '"How you get so big, eating food of this kind?" -- Yoda to Luke\n',
  '"Mine! Or I will help you not!" -- Yoda to Luke\n',
  '"Mudhole? Slimy? My home this is!" -- Yoda to Luke\n',
  '"Mine! Mine! Mine! MINE!!!" -- Yoda to R2-D2\n',
  '"No, no no, stay and help you I will! Hehe! Find your friend, mm?" -- Yoda to Luke\n',
  '"Ohhh, Jedi Master! Yoda. You seek Yoda!" -- Yoda to Luke\n',
  '"No! Try not. Do, or do not. There is no try." -- Yoda to Luke\n',
  'Luke: "I\'m looking for a great warrior." Yoda: "Wars not make one great." -- Luke Skywalker and Yoda\n',
  '"Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained! A Jedi must have the deepest commitment, the most serious mind. This one a long time have I watched. All his life has he looked away, to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing. Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless!" -- Yoda\n',
  'Yoda: "I cannot teach him. The boy has no patience." Obi-Wan: "He will learn patience." Yoda: "Hmm. Much anger in him, like his father." Obi-Wan: "Was I any different, when you taught me?" -- Yoda and Obi-Wan Kenobi\n',
  'Luke: "I won\'t fail you. I\'m not afraid." Yoda: "You will be. You will be." -- Luke Skywalker and Yoda\n',
  '"Yes. A Jedi\'s strength flows from the Force. But beware the dark side. Anger, fear, aggression. The dark side of the Force are they. Easily they flow, quick to join you in a fight. If once you start down the dark path, forever will it dominate your destiny. Consume you it will, as it did Obi-Wan\'s apprentice." -- Yoda to Luke\n',
  'Luke: "Vader, Is the dark side stronger?"; Yoda: "No, no, no. Quicker, easier, more seductive.";Luke: "But how am I to know the good side from the bad?";Yoda: "You will know, when you are calm, at peace, passive. A Jedi uses the Force for knowledge and defense, never for attack." -- Yoda to Luke\n',
  '"So certain are you. Always with you it cannot be done. Hear you nothing that I say?" -- Yoda to Luke\n',
  '"No! No different! Only different in your mind. You must unlearn what you have learned." -- Yoda to Luke\n',
  'Luke: "I don\'t believe it"; Yoda: "That is why you fail." -- Yoda to Luke\n',
  '"No! Try not. Do. Or do not. There is no try." -- Yoda to Luke , \n',
  '"Size matters not. Look at me. Judge me by my size do you?" -- Yoda to Luke\n',
  '"And well you should not! For my ally is the Force. And a powerful ally it is. Life creates it, makes it grow. Its energy surrounds us, and binds us. Luminous beings are we, not this, [nudging Luke\'s arm] crude matter! You must feel the Force around you. Here, between you, me, the tree, the rock, everywhere! Even between the land and the ship." -- Yoda to Luke\n',
  '"Through the Force, things you will see. Other places. The future, the past, old friends long gone." -- Yoda to Luke\n',
  '"Hmm. Control, control. You must learn control." -- Yoda to Luke\n',
  '"Difficult to see. Always in motion is the future." -- Yoda to Luke\n',
  '"Decide you must how to serve them best. If you leave now, help them you could. But you would destroy all for which they have fought and suffered." -- Yoda to Luke\n',
  '"Strong is Vader. Mind what you have learned. Save you it can!" -- Yoda to Luke\n',
  '"No. There is another." -- Yoda to Obi-Wan\n',
  '"When nine hundred years old you reach, look as good, you will not, hm?" -- Yoda to Luke Skywalker\n',
  '"Strong am I with the Force, but not that strong. Twilight is upon me, and soon night must fall. That is the way of things, the way of the Force." -- Yoda to Luke Skywalker\n',
  '"No more training do you require. Already know you that which you need." -- Yoda to Luke Skywalker\n',
  '"No. Unfortunate that you rushed to face him, that incomplete was your training. Not ready for the burden were you." -- Yoda to Luke Skywalker\n',
  '"Remember, a Jedi\'s strength flows from the Force. But beware. Anger, fear, aggression. The dark side are they. Once you start down the dark path, forever will it dominate your destiny." -- Yoda to Luke Skywalker\n',
  '"Your father he is." -- Yoda to Luke Skywalker\n',
  '"Luke, Luke, Do not, Do not underestimate the powers of the Emperor, or suffer your father\'s fate, you will." -- Yoda to Luke Skywalker\n',
  '"Luke, when gone am I, the last of the Jedi will you be." -- Yoda to Luke Skywalker\n',
  '"Luke, there is another, Skywalker." -- Yoda to Luke Skywalker\n',
  '"Pity your new disciple I do; so lately an apprentice, so soon without a Master." -- Yoda\n',
  '"War does not make one great." -- Yoda\n',
  '"Proud I am, to stand by Wookiees in their hour of need." -- Yoda\n',
  '"Yoda I am, fight I will." -- Yoda\n',
  '"Tired I am, rest I must." -- Yoda\n',
  '"When all choices seem wrong, choose restraint." -- recalled by Mace Windu\n',
  '"If no mistake have you made, yet losing you are, a different game you should play." -- recalled by Mace Windu\n',
  '"A trial of being old is this: remembering which thing one has said into which young ears." -- Yoda\n',
  'Yoda: "Think you I have never felt the touch of the dark? Know you what a soul so great as Yoda can make, in eight hundred years?"; Dooku: "Master?"; Yoda: "Many mistakes!" -- Yoda and Dooku\n',
  '"Think you the relationship between Master and Padawan is only to help them? Oh, this is what we let them believe, yes! But when the day comes that even old Yoda does not learn something from his students-then truly, he shall be a teacher no more." -- Yoda\n',
  '"On many long journeys have I gone. And waited, too, for others to return from journeys of their own. Some return; some are broken; some come back so different only their names remain." -- Yoda\n',
  '"When you fall, apprentice, catch you I will." -- Yoda to Dooku\n',
  '"Secret, shall I tell you? Grand Master of Jedi Order am I. Won this job in a raffle I did, think you? "How did you know, how did you know, Master Yoda?" Master Yoda knows these things. His job it is." -- Master Yoda to Scout\n',
  '"Honor life by living, Padawan. Killing honors only death: only the dark side." -- Yoda\n',
  '"To be Jedi is to face the truth, and choose. Give off light, or darkness, Padawan. Be a candle, or the night, Padawan: but choose!" -- Yoda to Whie Malreaux\n',
  '"When you look at the dark side, careful you must be , for the dark side looks back." -- Yoda\n',
  '"You think Yoda stops teaching, just because his student does not want to hear? Yoda a teacher is. Yoda teaches like drunkards drink. Like killers kill." -- Yoda\n',
  '"Humility endless is." -- Yoda\n',
  '"A labyrinth of evil, this war has become." -- Yoda\n',
  '"Sworn by oath to uphold you, we are." -- Yoda to Palpatine\n',
  '"From the dark path, no returning there is. Forever, the direction of your life it dominates." -- Yoda\n',
  '"To the Force, look for guidance. Accept what fate has placed before us." -- Yoda\n',
  '"Yoda, you seek?" -- Yoda\n', '"My ally is the Force" -- Yoda\n'
]; // Yoda said, copied from a npm module
const menu = new Keyboard()
                .keys([['Images'], ['Utility'], ['Fun'], ['Settings'], ['About/Support'], ['Feedback']])
                .force(true)
				.oneTime(true)
                .resize(true)
                .selective(true); // Main Menu

bot.start();
console.log("Metagon for Telegram, Beta 0.0.1 by austinhuang.");

bot.command('start', function(message) {
	var rep = new Message().text('What do you want to do now?').to(message.chat.id).keyboard(menu);
	bot.send(rep);
	console.log(message);
});
bot.command('cat', function(message) {
	request('http://random.cat/meow', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			var rep = new File().file(body.file).caption('').to(message.chat.id);
			bot.send(rep);
		} else {
			var err = new Message().text('An error occured. Please check whether http://random.cat is online or not, and retry.').to(message.chat.id);
			bot.send(err);
		}
	});
});
bot.command('penguin', function(message) {
	request('http://penguin.wtf/', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var rep = new File().file(body).caption('').to(message.chat.id);
			bot.send(rep);
		} else {
			var err = new Message().text('An error occured. Please check whether http://penguin.wtf is online or not, and retry.').to(message.chat.id);
			bot.send(err);
		}
	});
});
bot.command('snake', function(message) {
	request('http://fur.im/snek/snek.php', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			var rep = new File().file(body.file).caption('').to(message.chat.id);
			bot.send(rep);
		} else {
			var err = new Message().text('An error occured. Please check whether http://penguin.wtf is online or not, and retry.').to(message.chat.id);
			bot.send(err);
		}
	});
});
bot.command('truth', function(message) {
	request('http://unknowndeveloper.tk/truths.php', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			var rep = new Message().text(body[0].Truth).to(message.chat.id);
			bot.send(rep);
		} else {
			var err = new Message().text('An error occured. Please check whether http://unknowndeveloper.tk/ is online or not, and retry.').to(message.chat.id);
			bot.send(err);
		}
	});
});
bot.command('dare', function(message) {
	request('http://unknowndeveloper.tk/dares.php', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			var rep = new Message().text(body[0].Dare).to(message.chat.id);
			bot.send(rep);
		} else {
			var err = new Message().text('An error occured. Please check whether http://unknowndeveloper.tk/ is online or not, and retry.').to(message.chat.id);
			bot.send(err);
		}
	});
});
bot.command('mcserver [ip]', function(message) {
	if (message.args.ip !== undefined) {
		request('https://mcapi.ca/query/'+message.args.ip+'/info', function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				if (body.status === false) {
					var err = new Message().text('Your input is invalid, or the server you requested is offline, or maybe you just need a retry.\nYour input is '+message.args.ip).to(message.chat.id);
					bot.send(err);
					return;
				}
				var mcrep = "Query: "+message.args.ip+"\nPlayers: "+body.players.online+"/"+body.players.max+"\nPing: "+body.ping+"ms";
				var rep = new Message().text(mcrep).to(message.chat.id);
				bot.send(rep);
				var icon = new Message().text("https://mcapi.ca/query/"+message.args.ip+"/icon").to(message.chat.id);
				setTimeout(function(){
					bot.send(icon);
				}, 50);
				return;
			} else {
				var err = new Message().text('An error occured. Please check your input, or retry.').to(message.chat.id);
				bot.send(err);
			}
		});
	}
	else {
		var err = new Message().text('/mcserver <Address>').to(message.chat.id);
		bot.send(err);
	}
});
bot.command('settings', function(message) {
	var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
	var output = "Your current settings:\n* NSFW Images in Booru commands: ";
	if (config.nsfw.indexOf(message.chat.id) > -1) {output += "Enabled\n* Notify me about updates: ";} else {output += "Disabled\n* Notify me about updates: ";}
	if (config.notif.indexOf(message.chat.id) > -1) {output += "Enabled";} else {output += "Disabled";}
	output += "\nTo change the config, use the buttons below. Replying anything other than the keyboard choices will exit this menu.";
	var kb = new Keyboard()
                .keys([['Toggle SFW/NSFW'], ['Toggle Updates Notification'], ['Back to Main Menu']])
                .force(true)
                .oneTime(true);
	var rep = new Message().text(output).to(message.chat.id).keyboard(kb);
	bot.send(rep).then(answer => {
		if (answer.text === "Toggle SFW/NSFW") {
			var index = config.nsfw.indexOf(message.chat.id);
			if (index > -1) {
				
				config.nsfw.splice(index, 1);
				var rep = new Message().text("Done! To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('./config.json', JSON.stringify(config), 'utf8');
			}
			else if (index === -1) {
				
				config.nsfw.push(message.chat.id);
				var rep = new Message().text("Done! To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('./config.json', JSON.stringify(config), 'utf8');
			}
		}
		else if (answer.text === "Toggle Updates Notification") {
			var index = config.notif.indexOf(message.chat.id);
			if (index> -1) {
				
				config.notif.splice(index, 1);
				var rep = new Message().text("Done! You will no longer receive update notifications.\nTo adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('./config.json', JSON.stringify(config), 'utf8');
			}
			else if (index === -1) {
				
				config.notif.push(message.chat.id);
				var rep = new Message().text("Done! You will now receive update notifications.\nTo adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('./config.json', JSON.stringify(config), 'utf8');
			}
		}
		else if (answer.text !== "Back to Main Menu"){
			
			var rep = new Message().text("Not a valid entry. I have bought you back to the menu.").to(message.chat.id).keyboard(menu);
			bot.send(rep);
		}
	});
});
bot.command('yoda', function(message) {
	var rep = new Message().text(yoda_said[Math.floor(Math.random() * yoda_said.length)]).to(message.chat.id);
	bot.send(rep);
});

const image = new Keyboard()
				.keys([['Cat'], ['Penguin'], ['Snake'], ['Anime'], ['Back to Main Menu']])
				.force(true)
				.oneTime(true)
				.resize(true)
				.selective(true);
bot.get(/Images/i, function(message) {
	if (message !== "Images") {return;}
	var answer = new Message().text('You\'ve chosen the Image category. Choose one of the following options, or click "Back to Main Menu". (You may need to scroll down)').to(message.chat.id).keyboard(image);
	bot.send(answer);
});
bot.get(/Cat/i, function(message) {
	if (message !== "Cat") {return;}
	request('http://random.cat/meow', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			var rep = new File().file(body.file).caption('').to(message.chat.id).keyboard(image);
			bot.send(rep);
		} else {
			var err = new Message().text('An error occured. Please check whether http://random.cat is online or not, and retry.').to(message.chat.id).keyboard(image);
			bot.send(err);
		}
	});
});
bot.get(/Penguin/i, function(message) {
	if (message !== "Penguin") {return;}
	request('http://penguin.wtf/', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var rep = new File().file(body).caption('').to(message.chat.id).keyboard(image);
			bot.send(rep);
		} else {
			var err = new Message().text('An error occured. Please check whether http://penguin.wtf is online or not, and retry.').to(message.chat.id).keyboard(image);
			bot.send(err);
		}
	});
});
bot.get(/Snake/i, function(message) {
	if (message !== "Snake") {return;}
	request('http://fur.im/snek/snek.php', function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			var rep = new File().file(body.file).caption('').to(message.chat.id).keyboard(image);
			bot.send(rep);
		} else {
			var err = new Message().text('An error occured. Please check whether http://penguin.wtf is online or not, and retry.').to(message.chat.id).keyboard(image);
			bot.send(err);
		}
	});
});

bot.get(/Settings/i, function(message) {
	if (message !== "Settings") {return;}
	var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
	var output = "Your current settings:\n* NSFW Images in Booru commands: ";
	if (config.nsfw.indexOf(message.chat.id) > -1) {output += "Enabled\n* Notify me about updates: ";} else {output += "Disabled\n* Notify me about updates: ";}
	if (config.notif.indexOf(message.chat.id) > -1) {output += "Enabled";} else {output += "Disabled";}
	output += "\nTo change the config, use the buttons below. Replying anything other than the keyboard choices will exit this menu.";
	var kb = new Keyboard()
                .keys([['Toggle SFW/NSFW'], ['Toggle Updates Notification'], ['Back to Main Menu']])
                .force(true)
                .oneTime(true);
	var rep = new Message().text(output).to(message.chat.id).keyboard(kb);
	bot.send(rep).then(answer => {
		if (answer.text === "Toggle SFW/NSFW") {
			var index = config.nsfw.indexOf(message.chat.id);
			if (index > -1) {
				
				config.nsfw.splice(index, 1);
				var rep = new Message().text("Done! To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('./config.json', JSON.stringify(config), 'utf8');
			}
			else if (index === -1) {
				
				config.nsfw.push(message.chat.id);
				var rep = new Message().text("Done! To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('./config.json', JSON.stringify(config), 'utf8');
			}
		}
		else if (answer.text === "Toggle Updates Notification") {
			var index = config.notif.indexOf(message.chat.id);
			if (index> -1) {
				
				config.notif.splice(index, 1);
				var rep = new Message().text("Done! You will no longer receive update notifications.\nTo adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('./config.json', JSON.stringify(config), 'utf8');
			}
			else if (index === -1) {
				
				config.notif.push(message.chat.id);
				var rep = new Message().text("Done! You will now receive update notifications.\nTo adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('./config.json', JSON.stringify(config), 'utf8');
			}
		}
		else if (answer.text !== "Back to Main Menu") {
			var rep = new Message().text("Not a valid entry. I have bought you back to the menu.").to(message.chat.id).keyboard(menu);
			
			bot.send(rep);
		}
	});
});

/*bot.get(/About\/Support/i, function(message) {
	if (message !== "About/Support") {return;}
	var err = new Message().text('Metagon, Confidence in Usability.\n\nThe bot is originally in Discord.').to(message.chat.id).keyboard(menu);
});*/

bot.get(/Back\sto\sMain\sMenu/i, function(message) {
	if (message !== "Back to Main Menu") {return;}
	var rep = new Message().text('What do you want to do now?').to(message.chat.id).keyboard(menu);
	bot.send(rep);
});
