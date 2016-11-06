"use strict";
var Bot = require("telegram-api").default;
var Message = require("telegram-api/types/Message");
var File = require("telegram-api/types/File"); 
var Keyboard = require("telegram-api/types/Keyboard");
var BulkMessage = require("telegram-api/types/BulkMessage");
var fs = require("fs"); // Config
var setup = JSON.parse(fs.readFileSync("setup.json", "utf8"));
var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
var bot = new Bot({
  token: setup.bot_token
});
var bitlytoken = setup.bitly_token;
var request = require("request");
var yodasaid = [
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
                .keys([["Images","Utility"], ["Fun","Settings"], ["About/Support","Feedback"]])
                .force(true)
				.oneTime(true)
                .resize(true)
                .selective(true); // Main Menu
const BMM = new Keyboard().keys([["Back to Main Menu"]]).oneTime(true).resize(true).selective(true);
var gyazo = require("gyazo-upload"); // Gyazo
var gag = require("node-9gag");
var gagbrds = ["funny", "wtf", "gif", "gaming", "anime-manga", "movie-tv", "cute", "girl", "awesome", "cosplay", "sport", "food", "ask9gag", "timely"];
var gagsubs = ["Hot", "Fresh"];

bot.start();
console.log("Metagon for Telegram, Beta 0.0.1 by austinhuang.");

bot.command('start', function(message) {
	if (message.chat.id !== message.from.id) {
		var rep = new Message().text('Keyboard mode is NOT available in group chats.').to(message.chat.id);
		bot.send(rep);
		return;
	}
	var rep = new Message().text('What do you want to do now?').to(message.chat.id).keyboard(menu);
	bot.send(rep);
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
	var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
	var output = "Your current settings:\n* NSFW Images in Booru commands (/nsfw): ";
	if (config.nsfw.indexOf(message.chat.id) > -1) {output += "Enabled\n* Notify me about updates (/notif): ";} else {output += "Disabled\n* Notify me about updates (/notif): ";}
	if (config.notif.indexOf(message.chat.id) > -1) {output += "Enabled";} else {output += "Disabled";}
	output += "\nTo change the config, use the links above.";
	var rep = new Message().text(output).to(message.chat.id);
	bot.send(rep);
});
	bot.command('nsfw', function(message) {
		config = JSON.parse(fs.readFileSync("config.json", "utf8"));
		var index = config.nsfw.indexOf(message.chat.id);
		if (index > -1) {
			config.nsfw.splice(index, 1);
			var rep = new Message().text("NSFW has been disabled. To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id);
			bot.send(rep);
			fs.writeFile('config.json', JSON.stringify(config), 'utf8');
		}
		else if (index === -1) {
			config.nsfw.push(message.chat.id);
			var rep = new Message().text("NSFW has been enabled. Please make sure you are LEGAL to see NSFW content in your country. To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id);
			bot.send(rep);
			fs.writeFile('config.json', JSON.stringify(config), 'utf8');
		}
	});
	bot.command('notif', function(message) {
		var index = config.notif.indexOf(message.chat.id);
		if (index> -1) {
			config.notif.splice(index, 1);
			var rep = new Message().text("You will no longer receive update notifications.\nTo adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id);
			bot.send(rep);
			fs.writeFile('config.json', JSON.stringify(config), 'utf8');
		}
		else if (index === -1) {
			config.notif.push(message.chat.id);
			var rep = new Message().text("You will now receive update notifications.\nTo adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id);
			bot.send(rep);
			fs.writeFile('config.json', JSON.stringify(config), 'utf8');
		}
	});
bot.command('yoda', function(message) {
	var rep = new Message().text(yodasaid[Math.floor(Math.random() * yodasaid.length)]).to(message.chat.id);
	bot.send(rep);
});
bot.command('gyazo', function(message) {
	var q = new Message().text('You can use the following methods to upload an image to gyazo...\n* Send me the direct URL to the image\n* Upload it here (PLEASE COMPRESS IT, or it\'ll upload as a document and it just won\'t work)\nType anything else to exit this menu.').to(message.chat.id);
	bot.send(q).then(answer => {
		if (answer.photo !== undefined) {
			request("https://api.telegram.org/bot"+setup.bot_token+"/getFile?file_id="+answer.photo[answer.photo.length -1].file_id, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					gyazo("https://api.telegram.org/file/bot"+setup.bot_token+"/"+body.result.file_path).then(function (urls) {
						var rep = new Message().text(urls[0]).to(message.chat.id);
						bot.send(rep);
					});
				}
			});
		}
		else if (answer.document !== undefined) {
			var rep = new Message().text("I TOLD you to COMPRESS it but you didn't!").to(message.chat.id);
			bot.send(rep);
		}
		else if (answer.text.startsWith("http")) {
			gyazo(answer.text).then(function (urls) {
				var rep = new Message().text(urls[0]).to(message.chat.id);
				bot.send(rep);
			});
		}
		else {
			var rep = new Message().text("Exited.").to(message.chat.id);
			bot.send(rep);
		}
	});
});
bot.command('9gag [sec] [subsec]', function(message) {
	config = JSON.parse(fs.readFileSync("config.json", "utf8"));
	var gagsub = ["hot", "fresh"];
	if (message.args.sec !== undefined && message.args.subsec !== undefined) {
		if (gagbrds.indexOf(message.args.sec.toLowerCase()) > -1 && gagsub.indexOf(message.args.subsec.toLowerCase()) > -1) {
			gag.section(message.args.sec, message.args.subsec, function(err, res) {
				if (err) {
					bot.send(new Message().text("An error occured. Retry?").to(message.chat.id));
				}
				else {
					bot.send(new Message().text(res[Math.floor(Math.random() * res.length)].url).to(message.chat.id));
				}
			});
		}
		else if (message.args.sec.toLowerCase() === "nsfw" && gagsub.indexOf(message.args.subsec.toLowerCase()) > -1) {
			if (config.nsfw.indexOf(message.chat.id) > -1) {
				gag.section("nsfw", message.args.subsec, function(err, res) {
					if (err) {
						bot.send(new Message().text("An error occured. Retry?").to(message.chat.id));
					}
					else {
						bot.send(new Message().text(res[Math.floor(Math.random() * res.length)].url).to(message.chat.id));
					}
				});
			}
			else {
				bot.send(new Message().text("Hmm...You didn't enable your NSFW config. Go to /settings to enable it. (Or you actually enabled it? Then retry.)").to(message.chat.id));
			}
		}
		else if (message.args.sec === "search" && message.args.subsec !== undefined) {
			gag.find(message.args.subsec, function(err, res) {
				if (err) {
					bot.send(new Message().text("An error occured. Retry?").to(message.chat.id));
				}
				else if (res.result.length === 0) {
					bot.send(new Message().text("No results.").to(message.chat.id));
				}
				else {
					bot.send(new Message().text(res.result[Math.floor(Math.random() * res.result.length)].url).to(message.chat.id));
				}
			});
		}
		else {
			var rep = new Message().text("/9gag trending\n/9gag <Section> <Hot/Fresh> (Get a list of <Section>s using \"/9gag list\")\n/9gag search <Query>").to(message.chat.id);
			bot.send(rep);
		}
	}
	else if (message.args.sec === "trending") {
		gag.section('Trending', function (err, res) {
			if (err) {
				var rep = new Message().text("An error occured. Retry?").to(message.chat.id).keyboard(fun);
				bot.send(rep);
			}
			else {
				var rep = new Message().text(res[Math.floor(Math.random() * res.length)].url).to(message.chat.id).keyboard(fun);
				bot.send(rep);
			}
		});
	}
	else if (message.args.sec === "list") {
		bot.send(new Message().text("Accepted sections: "+gagbrds+",nsfw\nNSFW section require /nsfw config.").to(message.chat.id));
	}
	else {
		bot.send(new Message().text("/9gag trending\n/9gag <Section> <Hot/Fresh> (Get a list of <Section>s using \"/9gag list\")\n/9gag search <Query>").to(message.chat.id));
	}
});
bot.command('joke [opt]', function(message) {
	var opt = "exclude=[nerdy,explicit]";
	if (message.args.opt === "-n") {opt = "exclude=[nerdy]";}
	else if (message.args.opt === "-e") {opt = "exclude=[explicit]";}
	else if (message.args.opt === "+e+n") {opt = "limitTo=[nerdy,explicit]";}
	else if (message.args.opt === "+e") {opt = "limitTo=[explicit]";}
	else if (message.args.opt === "+n") {opt = "limitTo=[nerdy]";}
	var url = "http://api.icndb.com/jokes/random?escape=javascript&" + opt;
	request(url, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			bot.send(Message().text(body.value.joke).to(message.chat.id));
		}
		else {
			bot.send(new Message().text("An error occured. Please check whether http://www.icndb.com/api/ is online or not, and retry.").to(message.chat.id));
		}
	});
});
bot.command("bitly [opt] [site]", function(message) {
	if(message.args.opt === "shorten" && message.args.site !== undefined) {
		request("https://api-ssl.bitly.com/v3/shorten?access_token="+bitlytoken+"&longUrl="+message.args.site+"&format=txt", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				bot.send(new Message().text(body).to(message.chat.id));
			} else {
				bot.send(new Message().text("An error occured. Invalid address, or retry?").to(message.chat.id));
			}
		});
	}
	else if(message.args.opt === "expand" && message.args.site !== undefined) {
		request("https://api-ssl.bitly.com/v3/expand?access_token="+bitlytoken+"&shortUrl="+message.args.site+"&format=txt", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				bot.send(new Message().text(body).to(message.chat.id));
			} else {
				bot.send(new Message().text("An error occured. Invalid address, or retry?").to(message.chat.id));
			}
		});
	}
	else {bot.send(new Message().text("/bitly <shorten/expand> <Link>").to(message.chat.id));}
});
bot.command("kill", function(message) {
	if (message.chat.id === setup.myid) {
		process.exit();
	}
});
bot.command("announce ...text", function(message) {
	if (message.chat.id === setup.myid) {
		config = JSON.parse(fs.readFileSync("config.json", "utf8"));
		bot.send(new BulkMessage().to(config.notif).text(message.args.text));
	}
});
bot.command("mcuser [username]", function(message) {
	var mcuser = message.args.username;
	if (mcuser !== undefined) {
		request('https://mcapi.de/api/user/' + mcuser, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var mcapi = JSON.parse(body);
				if (mcapi.result.status !== "Error") {
					var mcuserout = "Username: "+mcapi.username+"\nUUID: "+mcapi.uuid+"\n2D Body: http://mcapi.de/api/image/user/body/"+mcapi.username+".png\n2D Head: http://mcapi.de/api/image/user/head/"+mcapi.username+".png\nHelm: http://mcapi.de/api/image/user/helm/"+mcapi.username+".png\n3D Head: http://mcapi.de/api/image/user/isometric/"+mcapi.username+".png";
					bot.send(new Message().text(mcuserout).to(message.chat.id));
				} else {
					bot.send(new Message().text("An error occurred. The requested user may be cracked, or you typed in a wrong username/UUID.").to(message.chat.id));
				}
			}
			else {
				bot.send(new Message().text("An error occurred! Retry?").to(message.chat.id)); 
			}
		});
	}
	else {
		bot.send(new Message().text("Your input is invalid. +mcserver [UUID or Username]").to(message.chat.id));
	}
});
bot.command("help", function(message) {
	bot.send(new Message().text("https://github.com/austinhuang0131/metagon-telegram/wiki").to(message.chat.id));
});

const image = new Keyboard()
					.keys([['Cat', 'Penguin'], ['Snake', 'Anime (Unavailable)'], ['Back to Main Menu']])
					.force(true)
					.oneTime(true)
					.resize(true)
					.selective(true);
bot.get(/Images/i, function(message) {
	if (message.text !== "Images") {return;}
	bot.send(new Message().text("You've chosen the Image category. Choose one of the following options, or click \"Back to Main Menu\".").to(message.chat.id).keyboard(image));
});
	bot.get(/Cat/i, function(message) {
		if (message.text !== "Cat") {return;}
		request("http://random.cat/meow", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				bot.send(new File().file(body.file).caption("").to(message.chat.id).keyboard(image));
			} else {
				bot.send(new Message().text("An error occured. Please check whether http://random.cat is online or not, and retry.").to(message.chat.id).keyboard(image));
			}
		});
	});
	bot.get(/Penguin/i, function(message) {
		if (message.text !== "Penguin") {return;}
		request("http://penguin.wtf/", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				bot.send(new File().file(body).caption("").to(message.chat.id).keyboard(image));
			} else {
				bot.send(new Message().text("An error occured. Please check whether http://penguin.wtf is online or not, and retry.").to(message.chat.id).keyboard(image));
			}
		});
	});
	bot.get(/Snake/i, function(message) {
		if (message.text !== "Snake") {return;}
		request("http://fur.im/snek/snek.php", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				bot.send(new File().file(body.file).caption("").to(message.chat.id).keyboard(image));
			} else {
				bot.send(new Message().text("An error occured. Please check whether http://penguin.wtf is online or not, and retry.").to(message.chat.id).keyboard(image));
			}
		});
	});
	
const fun = new Keyboard()
					.keys([['Truth', 'Dare'], ['Yoda Quote', 'Chuck Norris'], ['9gag', 'Back to Main Menu']])
					.force(true)
					.oneTime(true)
					.resize(true)
					.selective(true);
bot.get(/Fun/i, function(message) {
	if (message.text !== "Fun" && message.text !== "Back to Fun Menu") {return;}
	bot.send(new Message().text("Choose one of the following options.").to(message.chat.id).keyboard(fun));
});
	bot.get(/Truth/i, function(message) {
		if (message.text !== "Truth") {return;}
		request("http://unknowndeveloper.tk/truths.php", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				bot.send(new Message().text(body[0].Truth).to(message.chat.id).keyboard(fun));
			} else {
				bot.send(new Message().text("An error occured. Please check whether http://unknowndeveloper.tk/ is online or not, and retry.").to(message.chat.id).keyboard(fun));
			}
		});
	});
	bot.get(/Dare/i, function(message) {
		if (message.text !== "Dare") {return;}
		request("http://unknowndeveloper.tk/dares.php", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				bot.send(new Message().text(body[0].Dare).to(message.chat.id).keyboard(fun));
			} else {
				bot.send(new Message().text("An error occured. Please check whether http://unknowndeveloper.tk/ is online or not, and retry.").to(message.chat.id).keyboard(fun));
			}
		});
	});
	bot.get(/Yoda\sQuote/i, function(message) {
		if (message.text !== "Yoda Quote") {return;}
		bot.send(new Message().text(yodasaid[Math.floor(Math.random() * yodasaid.length)]).to(message.chat.id).keyboard(fun));
	});
	bot.get(/Chuck\sNorris/i, function(message) {
		if (message.text !== "Chuck Norris") {return;}
		const cn = new Keyboard()
							.keys([["Nerdy & Explicit Only", "Exclude Nerdy & Explicit"], ["Nerdy Only", "Exclude Nerdy"], ["Explicit Only", "Exclude Explicit"] , ["Nah, any joke is fine."]])
							.force(true)
							.oneTime(true)
							.resize(true)
							.selective(true);
		bot.send(new Message().text("Choose an option for filter.").to(message.chat.id).keyboard(cn)).then(answer => {
			var url = "http://api.icndb.com/jokes/random?escape=javascript"
			if (answer.text === "Nerdy & Explicit Only") {url += "&limitTo=[nerdy,explicit]";}
			if (answer.text === "Explicit Only") {url += "&limitTo=[explicit]";}
			if (answer.text === "Nerdy Only") {url += "&limitTo=[nerdy]";}
			if (answer.text === "Exclude Nerdy & Explicit") {url += "&exclude=[nerdy,explicit]";}
			if (answer.text === "Exclude Nerdy") {url += "&exclude=[nerdy]";}
			if (answer.text === "Exclude Explicit") {url += "&exclude=[explicit]";}
			request(url, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					var res = new Message().text(body.value.joke).to(message.chat.id).keyboard(fun);
					bot.send(res);
				}
				else {
					var res = new Message().text("An error occured. Please check whether http://www.icndb.com/api/ is online or not, and retry.").to(message.chat.id).keyboard(fun);
					bot.send(res);
				}
			});
		});
	});
	bot.get(/9gag/i, function(message) {
		if (message.text !== "9gag" && message.text !== "Back to 9gag Menu") {return;}
		var gagbrd = ['Funny', 'WTF', 'GIF', 'Trending', 'Gaming', 'Anime-Manga', 'Movie-TV', 'Cute', 'Girl', 'Awesome', 'Cosplay', 'Sport', 'Food', 'Ask9gag', 'Timely'];
		const gagkb = new Keyboard()
							.keys([['Search', 'Back to Fun Menu', 'Trending'], ['Funny', 'WTF', 'GIF'], ['NSFW', 'Gaming', 'Anime-Manga'], ['Movie-TV', 'Cute', 'Girl'], ['Awesome', 'Cosplay', 'Sport'], ['Food', 'Ask9gag', 'Timely']])
							.force(true)
							.oneTime(true)
							.resize(true)
							.selective(true);
		var rep = new Message().text('If you want to search using a specific query, click "Search".\nIf you want to get a random gag in a specific category, click your prefered category.\nYou can also click "Back to Fun Menu".').to(message.chat.id).keyboard(gagkb);
		bot.send(rep).then(answer => {
			if (gagbrd.indexOf(answer.text) > -1) {
				const subs = new Keyboard()
									.keys([['Hot', 'Fresh'], ['Back to 9gag Menu']])
									.force(true)
									.oneTime(true)
									.resize(true)
									.selective(true);
				var rep = new Message().text("Choose a subsection.").to(message.chat.id).keyboard(subs);
				bot.send(rep).then(subanswer => {
					if (gagsubs.indexOf(subanswer.text) > -1) {
						gag.section(answer.text, subanswer.text, function(err, res) {
							if (err) {
								var rep = new Message().text("An error occured. Retry?").to(message.chat.id).keyboard(fun);
								bot.send(rep);
							}
							else {
								var rep = new Message().text(res[Math.floor(Math.random() * res.length)].url).to(message.chat.id).keyboard(fun);
								bot.send(rep);
							}
						});
					}
				});
			}
			else if (answer.text === "NSFW") {
				config = JSON.parse(fs.readFileSync("config.json", "utf8"));
				if (config.nsfw.indexOf(message.chat.id) === -1) {
					bot.send(new Message().text("Hmm...You didn't enable your NSFW config. Go to /settings to enable it. (Or you actually enabled it? Then retry.)").to(message.chat.id).keyboard(fun));
				}
				else {
					const subs = new Keyboard()
										.keys([['Hot', 'Fresh'], ['Back to 9gag Menu']])
										.force(true)
										.oneTime(true)
										.resize(true)
										.selective(true);
					var rep = new Message().text("Choose a subsection.").to(message.chat.id).keyboard(subs);
					bot.send(rep).then(subanswer => {
						if (gagsubs.indexOf(subanswer.text) > -1) {
							gag.section("nsfw", subanswer.text, function(err, res) {
								if (err) {
									var rep = new Message().text("An error occured. Retry?").to(message.chat.id).keyboard(fun);
									bot.send(rep);
								}
								else {
									var rep = new Message().text(res[Math.floor(Math.random() * res.length)].url).to(message.chat.id).keyboard(fun);
									bot.send(rep);
								}
							});
						}
					});
				}
			}
			else if (answer.text === "Search") {
				var rep = new Message().text("Enter your query.").to(message.chat.id).keyboard(new Keyboard().keys([['Back to 9gag Menu']]).oneTime(true).resize(true).selective(true));
				bot.send(rep).then(answer => {
					if (answer.text === "Back to Main Menu"){return;}
					gag.find(answer.text, function(err, res) {
						if (err) {
							var rep = new Message().text("An error occured. Retry?").to(message.chat.id).keyboard(fun);
							bot.send(rep);
						}
						else if (res.result.length === 0) {
							var rep = new Message().text("No results.").to(message.chat.id).keyboard(fun);
							bot.send(rep);
						}
						else {
							var rep = new Message().text(res.result[Math.floor(Math.random() * res.result.length)].url).to(message.chat.id).keyboard(fun);
							bot.send(rep);
						}
					});
				});
			}
			else if (answer.text === "Trending") {
				gag.section('Trending', function (err, res) {
					if (err) {
						var rep = new Message().text("An error occured. Retry?").to(message.chat.id).keyboard(fun);
						bot.send(rep);
					}
					else {
						var rep = new Message().text(res[Math.floor(Math.random() * res.length)].url).to(message.chat.id).keyboard(fun);
						bot.send(rep);
					}
				});
			}
		});
	});
	
const util = new Keyboard()
					.keys([['Bitly', 'Gyazo'], ['Minecraft User', 'Minecraft Server'], /*['Currency', 'QR Code Utility'],*/ ['Back to Main Menu']])
					.force(true)
					.oneTime(true)
					.resize(true)
					.selective(true);
const ukb = new Keyboard().keys([["Back to Utility Menu"]]).oneTime(true).resize(true).selective(true);
bot.get(/Utility/i, function(message) {
	if (message.text !== "Utility" && message.text !== "Back to Utility Menu") {return;}
	bot.send(new Message().text("Choose one of the following options.").to(message.chat.id).keyboard(util));
});
	bot.get(/Bitly/i, function(message) {
		if (message.text !== "Bitly") {return;}
		const bkb = new Keyboard()
						.keys([["Make a Bitly Link"], ["Expand a Bitly link"], ["Back to Utility Menu"]])
						.force(true)
						.oneTime(true)
						.resize(true)
						.selective(true);
		bot.send(new Message().text("Choose one of the following options.").to(message.chat.id).keyboard(bkb)).then(subanswer => {
			if (subanswer.text === "Make a Bitly Link" || subanswer.text === "Expand a Bitly link") {
				bot.send(new Message().text("Enter the URL you wish to be processed, or click \"Back to Utility Menu\".").to(message.chat.id).keyboard(ukb)).then(answer => {
					if (answer.text.startsWith("http")) {
						var bopt = ["shorten", "longUrl"];
						if (subanswer.text === "Expand a Bitly link") {bopt = ["expand", "shortUrl"];}
						request("https://api-ssl.bitly.com/v3/"+bopt[0]+"?access_token="+bitlytoken+"&"+bopt[1]+"="+answer.text+"&format=txt", function(error, response, body) {
							if (!error && response.statusCode === 200) {
								bot.send(new Message().text(body).to(message.chat.id).keyboard(util));
							} else {
								bot.send(new Message().text("An error occured. Invalid address, or retry?").to(message.chat.id).keyboard(util));
							}
						});
					}
					else {bot.send(new Message().text("Invalid URL. Sending back to utility menu...").to(message.chat.id).keyboard(util));}
				});
			}
		});
	});
	bot.get(/Gyazo/i, function(message) {
		if (message.text !== "Gyazo") {return;}
		var q = new Message().text('You can use the following methods to upload an image to gyazo...\n* Send me the direct URL to the image\n* Upload it here (PLEASE COMPRESS IT, or it\'ll upload as a document and it just won\'t work)').to(message.chat.id).keyboard(ukb);
		bot.send(q).then(answer => {
			if (answer.photo !== undefined) {
				request("https://api.telegram.org/bot"+setup.bot_token+"/getFile?file_id="+answer.photo[answer.photo.length -1].file_id, function(error, response, body) {
					if (!error && response.statusCode === 200) {
						body = JSON.parse(body);
						gyazo("https://api.telegram.org/file/bot"+setup.bot_token+"/"+body.result.file_path).then(function (urls) {
							var rep = new Message().text(urls[0]).to(message.chat.id).keyboard(util);
							bot.send(rep);
						});
					}
				});
			}
			else if (answer.document !== undefined) {
				var rep = new Message().text("I TOLD you to COMPRESS it but you didn't!").to(message.chat.id).keyboard(util);
				bot.send(rep);
			}
			else if (answer.text.startsWith("http")) {
				gyazo(answer.text).then(function (urls) {
					var rep = new Message().text(urls[0]).to(message.chat.id).keyboard(util);
					bot.send(rep);
				});
			}
		});
	});
	bot.get(/Minecraft Server/i, function(message) {
		if (message.text !== "Minecraft Server") {return;}
		bot.send(new Message().text("Please enter the address of the server you want to check.").to(message.chat.id).keyboard(ukb)).then(answer => {
			if (answer.text !== "Back to Utility Menu") {
				request('https://mcapi.ca/query/'+answer.text+'/info', function(error, response, body) {
					if (!error && response.statusCode === 200) {
						body = JSON.parse(body);
						if (body.status === false) {
							var err = new Message().text('Your input is invalid, or the server you requested is offline, or maybe you just need a retry.\nYour input is '+message.args.ip).to(message.chat.id).keyboard(util);
							bot.send(err);
							return;
						}
						var mcrep = "Query: "+answer.text+"\nPlayers: "+body.players.online+"/"+body.players.max+"\nPing: "+body.ping+"ms";
						var rep = new Message().text(mcrep).to(message.chat.id);
						bot.send(rep);
						var icon = new Message().text("https://mcapi.ca/query/"+answer.text+"/icon").to(message.chat.id).keyboard(util);
						setTimeout(function(){
							bot.send(icon);
						}, 50);
						return;
					} else {
						var err = new Message().text('An error occured. Please check your input, or retry.').to(message.chat.id).keyboard(util);
						bot.send(err);
					}
				});
			}
		});
	});
	bot.get(/Minecraft User/i, function(message) {
		if (message.text !== "Minecraft User") {return;}
		bot.send(new Message().text("Please enter the username or UUID you want to check.").to(message.chat.id).keyboard(ukb)).then(answer => {
			if (answer.text !== "Back to Utility Menu") {
				var mcuser = answer.text;
				request('https://mcapi.de/api/user/' + mcuser, function(error, response, body) {
					if (!error && response.statusCode === 200) {
						var mcapi = JSON.parse(body);
						if (mcapi.result.status !== "Error") {
							var mcuserout = "Username: "+mcapi.username+"\nUUID: "+mcapi.uuid+"\n2D Body: http://mcapi.de/api/image/user/body/"+mcapi.username+".png\n2D Head: http://mcapi.de/api/image/user/head/"+mcapi.username+".png\nHelm: http://mcapi.de/api/image/user/helm/"+mcapi.username+".png\n3D Head: http://mcapi.de/api/image/user/isometric/"+mcapi.username+".png";
							bot.send(new Message().text(mcuserout).to(message.chat.id).keyboard(util));
						} else {
							bot.send(new Message().text("An error occurred. The requested user may be cracked, or you typed in a wrong username/UUID.").to(message.chat.id).keyboard(util));
						}
					}
					else {
						bot.send(new Message().text("An error occurred! Retry?").to(message.chat.id).keyboard(util)); 
					}
				});
			}
		});
	});

bot.get(/Settings/i, function(message) {
	if (message.text !== "Settings") {return;}
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
				fs.writeFile('config.json', JSON.stringify(config), 'utf8');
			}
			else if (index === -1) {
				config.nsfw.push(message.chat.id);
				var rep = new Message().text("Done! To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('config.json', JSON.stringify(config), 'utf8');
			}
		}
		else if (answer.text === "Toggle Updates Notification") {
			var index = config.notif.indexOf(message.chat.id);
			if (index> -1) {
				config.notif.splice(index, 1);
				var rep = new Message().text("Done! You will no longer receive update notifications.\nTo adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('config.json', JSON.stringify(config), 'utf8');
			}
			else if (index === -1) {
				config.notif.push(message.chat.id);
				var rep = new Message().text("Done! You will now receive update notifications.\nTo adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
				bot.send(rep);
				fs.writeFile('config.json', JSON.stringify(config), 'utf8');
			}
		}
		else if (answer.text !== "Back to Main Menu") {
			var rep = new Message().text("Not a valid entry. I have bought you back to the menu.").to(message.chat.id).keyboard(menu);
			bot.send(rep);
		}
	});
});

bot.get(/About\/Support/i, function(message) {
	if (message.text !== "About/Support") {return;}
	var err = new Message().text('Metagon, Confidence in Usability.\n\nOriginally in Discord, I am a multifunction bot to suit your needs!\nIf you have any questions, feel free to ask my creator, @austinhuang.\nMy documentation, source, and bug report desk is at https://github.com/austinhuang0131/metagon-telegram.').to(message.chat.id).keyboard(menu);
	bot.send(err);
});

bot.get(/Feedback/i, function(message) {
	if (message.text !== "Feedback") {return;}
	if (setup.myid === undefined) {
		bot.send(new Message().text('Hmm...I don\'t know who is the owner. Tell the host of the bot to...\n - Go to setup.json and put his ID in the myid OR\n - Just paste 265228448 (@austinhuang) into myid').to(message.chat.id));
	}
	var rep = new Message().text('Hello, fellow user. If you\'d like to suggest a new feature, please type it here. Thank you!\n---@austinhuang\n\nWARNING: If you want to report a bug, go to https://github.com/austinhuang0131/metagon-telegram/issues').to(message.chat.id).keyboard(BMM);
	bot.send(rep).then(answer => {
		if (answer.text === "Back to Main Menu"){return;}
		var get = new Message().text('Feedback from @'+message.from.username+': '+answer.text).to(setup.myid);
		bot.send(get);
		var rep = new Message().text('Thank you for your feedback! I\'ll read it carefully.\n---@austinhuang').to(message.chat.id).keyboard(menu);
		bot.send(rep);
	});
});

bot.get(/Back\sto\sMain\sMenu/i, function(message) {
	if (message.text !== "Back to Main Menu") {return;}
	var rep = new Message().text('What do you want to do now?').to(message.chat.id).keyboard(menu);
	bot.send(rep);
});

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
  console.log("Unhandled:"+p+" Reason: "+reason);
});
