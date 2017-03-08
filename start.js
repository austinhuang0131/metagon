"use strict";
var Bot = require("telegram-api").default;
var Message = require("telegram-api/types/Message");
var File = require("telegram-api/types/File"); 
var Keyboard = require("telegram-api/types/Keyboard");
var BulkMessage = require("telegram-api/types/BulkMessage");
var fs = require("fs"); // Config
var setup = JSON.parse(fs.readFileSync("setup.json", "utf8"));
var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
var Kik = require('@kikinteractive/kik');
var restify = require('restify');
var request = require("request");
var accounting = require("accounting");
const Yelp = require('yelp-fusion');
const yelptoken = Yelp.accessToken(setup.yelp.clientId, setup.yelp.clientSecret).then(response => {
	fs.writeFile("yelp.txt", response.jsonBody.access_token, "utf8");
});
const yelp = Yelp.client(fs.readFileSync("yelp.txt", "utf8"));
const Pixiv = require('pixiv.js');
const pixiv = new Pixiv(setup.pixiv_username, setup.pixiv_password);
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
var session = [];

console.log("Metagon for Telegram/Kik, 1.0.7 by austinhuang.");
var server = restify.createServer({
	name : "Bot HTTP server"
});
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
if (setup.telegram !== "") {
	var bot = new Bot({
		token: setup.telegram,
	});
	bot.start().catch(err => {
		console.error(err);
	});
	bot.on('update', update => {
		if (update[0] !== undefined) {
			if (update[0].message !== undefined) {
				if (update[0].message.chat.title !== undefined) {
					console.log("TGM ["+update[0].message.chat.title+"] @"+update[0].message.from.username+": "+update[0].message.text);
				}
				else if (update[0].message.from.username !== "" && update[0].message.from.username !== undefined) {
					console.log("TGM @"+update[0].message.from.username+": "+update[0].message.text);
				}
			}
		}
	});
	bot.command('start', function(message) {
		if (message.chat.id < 0) {
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
	bot.command('bunny', function(message) {
		request('https://api.bunnies.io/v2/loop/random/?media=mp4', function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				var rep = new File().file(body.media.mp4).caption('').to(message.chat.id);
				bot.send(rep);
			} else {
				var err = new Message().text('An error occured. Please check whether https://api.bunnies.io/docs is online or not, and retry.').to(message.chat.id);
				bot.send(err);
			}
		});
	});
	bot.command('flickr ...query', function(message) {
		if (message.args.query === undefined) {
			request("https://api.flickr.com/services/rest?api_key="+setup.flickr+"&method=flickr.photos.getRecent&format=json&per_page=500&nojsoncallback=1", function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					photo = body.photos.photo[Math.floor(Math.random() * body.photos.photo.length)];
					request("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+setup.flickr+"&photo_id="+photo.id+"&format=json&nojsoncallback=1", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				bot.send(new File().file(body.sizes.size[body.sizes.size.length - 1].source).caption(photo.title).to(message.chat.id));
			}
			else {bot.send(new Message().text('An error occured. Please check whether Flickr is online or not, and retry.').to(message.chat.id));}
		});
				}
				else {
					bot.send(new Message().text('An error occured. Please check whether Flickr is online or not, and retry.').to(message.chat.id));
				}
			});
		}
		else {
			request("https://api.flickr.com/services/rest?api_key="+setup.flickr+"&method=flickr.photos.search&text="+message.args.query+"&format=json&per_page=500&nojsoncallback=1", function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					if (body.photos.total === 0 || body.photos.total === "0") {
						bot.send(new Message().text('No results.').to(message.chat.id));
					} else {
						var photo = body.photos.photo[Math.floor(Math.random() * body.photos.photo.length)];
						request("https://api.flickr.com/services/rest?method=flickr.photos.getSizes&api_key="+setup.flickr+"&photo_id="+photo.id+"&format=json&nojsoncallback=1", function(error, response, body) {
							if (!error && response.statusCode === 200) {
								body = JSON.parse(body);
								bot.send(new File().file(body.sizes.size[body.sizes.size.length - 1].source).caption(photo.title).to(message.chat.id));
							}
							else {bot.send(new Message().text('An error occured. Please check whether Flickr is online or not, and retry.').to(message.chat.id));}
						});
					}
				}
				else {
					bot.send(new Message().text('An error occured. Please check whether Flickr is online or not, and retry.').to(message.chat.id));
				}
			});
		}
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
		request({
				/*url: "http://unknowndeveloper.tk/truths.php",
				auth: {
					username: "username",
					password: setup.truthanddare
				}*/
				url: "https://lydia.jaren.co/api/truth",
				headers: {
					"Authorization": "%&*^&%&$^#%&*^%$#%^*&"
				}
			}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				/*body = JSON.parse(body);*/
				var rep = new Message().text(body/*[0].Dare*/).to(message.chat.id);
				bot.send(rep);
			} else {
				var err = new Message().text('An error occured. Please check whether http://unknowndeveloper.tk/ is online or not, and retry.').to(message.chat.id);
				bot.send(err);
			}
		});
	});
	bot.command('dare', function(message) {
		request({
				/*url: "http://unknowndeveloper.tk/dares.php",
				auth: {
					username: "username",
					password: setup.truthanddare
				}*/
				url: "https://lydia.jaren.co/api/dare",
				headers: {
					"Authorization": "%&*^&%&$^#%&*^%$#%^*&"
				}
			}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				/*body = JSON.parse(body);*/
				var rep = new Message().text(body/*[0].Dare*/).to(message.chat.id);
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
		var output = "Your current settings:\n* Not-Suitable-For-Work/18+ content (/nsfw): ";
		if (config.telegram.nsfw.indexOf(message.chat.id) > -1) {output += "Enabled\n";} else {output += "Disabled\n";}
		output += "\nTo change the config, use the links above.";
		var rep = new Message().text(output).to(message.chat.id);
		bot.send(rep);
	});
		bot.command('nsfw', function(message) {
			var index = config.telegram.nsfw.indexOf(message.chat.id);
			if (index > -1) {
				config.telegram.nsfw.splice(index, 1);
				var rep = new Message().text("NSFW has been disabled. To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id);
				bot.send(rep);
				fs.writeFile('config.json', JSON.stringify(config), 'utf8');
			}
			else if (index === -1) {
				config.telegram.nsfw.push(message.chat.id);
				var rep = new Message().text("NSFW has been enabled. Please make sure you are LEGAL to see NSFW content in your country. To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id);
				bot.send(rep);
				fs.writeFile('config.json', JSON.stringify(config), 'utf8');
			}
		});
	bot.command('yoda', function(message) {
		var rep = new Message().text(yodasaid[Math.floor(Math.random() * yodasaid.length)]).to(message.chat.id);
		bot.send(rep);
	});
	bot.command('gyazo', function(message) {
		var q = new Message().text('No longer available in command mode. Please open a private chat and use keyboard mode.').to(message.chat.id);
		bot.send(q);
	});
	bot.command('9gag [sec] [subsec]', function(message) {
		config = JSON.parse(fs.readFileSync("config.json", "utf8"));
		var gagsub = ["hot", "fresh"];
		if (message.args.sec !== undefined && message.args.subsec !== undefined) {
			if (gagbrds.indexOf(message.args.sec.toLowerCase()) > -1 && gagsub.indexOf(message.args.subsec.toLowerCase()) > -1) {
				gag.section(message.args.sec, message.args.subsec, function(err, res) {
					if (err || res === undefined) {
						bot.send(new Message().text("An error occured. Retry?").to(message.chat.id));
					}
					else {
						bot.send(new Message().text(res[Math.floor(Math.random() * res.length)].url).to(message.chat.id));
					}
				});
			}
			else if (message.args.sec.toLowerCase() === "nsfw" && gagsub.indexOf(message.args.subsec.toLowerCase()) > -1) {
				if (config.telegram.nsfw.indexOf(message.chat.id) > -1) {
					gag.section("nsfw", message.args.subsec, function(err, res) {
						if (err || res === undefined) {
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
					if (err || res === undefined) {
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
				if (err || res === undefined) {
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
		var site = "";
		if(message.args.opt === "shorten" && message.args.site !== undefined) {
			if (!message.args.site.startsWith("http")) {site = "http://"+message.args.site;} else {site = message.args.site;}
			request("https://api-ssl.bitly.com/v3/shorten?access_token="+setup.bitly_token+"&longUrl="+site+"&format=txt", function(error, response, body) {
				if (!error && response.statusCode === 200) {
					bot.send(new Message().text(body).to(message.chat.id));
				} else {
					bot.send(new Message().text("An error occured. Invalid address, or retry?").to(message.chat.id));
				}
			});
		}
		else if(message.args.opt === "expand" && message.args.site !== undefined) {
			if (!message.args.site.startsWith("http")) {site = "http://"+message.args.site;} else {site = message.args.site;}
			request("https://api-ssl.bitly.com/v3/expand?access_token="+setup.bitly_token+"&shortUrl="+site+"&format=txt", function(error, response, body) {
				if (!error && response.statusCode === 200) {
					bot.send(new Message().text(body).to(message.chat.id));
				} else {
					bot.send(new Message().text("An error occured. Invalid address, or retry?").to(message.chat.id));
				}
			});
		}
		else {bot.send(new Message().text("/bitly <shorten/expand> <Link>").to(message.chat.id));}
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
		bot.send(new Message().text("https://github.com/austinhuang0131/metagon/wiki").to(message.chat.id));
	});
	bot.command("ibsearch ...query", function(message) {
		if (config.telegram.nsfw.indexOf(message.chat.id) > -1) {
			if (message.args.query === undefined) {message.args.query = "";}
			request("https://ibsearch.xxx/api/v1/images.json?key="+setup.ibsearch+"&limit=1&q=random:+"+message.args.query, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					if (body !== "[]") {
						body = JSON.parse(body);
						bot.send(new File().file("https://"+body[0].server+".ibsearch.xxx/"+body[0].path).caption("https://ibsearch.xxx/images/"+body[0].id).to(message.chat.id));
					}
					else {
						bot.send(new Message().text("No result. Change your query?").to(message.chat.id));
					}
				}
				else {
					bot.send(new Message().text("Failed to connect to http://ibsearch.xxx").to(message.chat.id));
				}
			});
		}
		else {
			bot.send(new Message().text("You don't have /nsfw config enabled. Please enable it before using this function.").to(message.chat.id));
		}
	});
	bot.command("pixiv ...query", function(message) {
		if (setup.pixiv_username === "" || setup.pixiv_password === "") {return;}
		var q = message.args.query;
		if (q === undefined) {
			bot.send(new Message().text("Please input a query. /pixiv <Query>").to(message.chat.id));
			return;
		}
		if (config.telegram.nsfw.indexOf(message.chat.id) === -1) {q += "-R-18 -R-18G";}
		pixiv.search(q, {per_page: 100, mode: "tag"}).then(json => {
			var illust = json.response[Math.floor(Math.random() * json.response.length)];
			var msg = illust.image_urls.large;
			if (illust.is_manga === true) {msg += "\nThis is a multiple-page illustration, so only the first page is shown. View the full content at http://www.pixiv.net/member_illust.php?mode=medium&illust_id="+illust.id;}
			bot.send(new Message().text(msg).to(message.chat.id));
		});
	});
	bot.command("imgur ...query", function(message) {
		request({url:"https://api.imgur.com/3/gallery/search?q="+message.args.query, headers:{'Authorization': 'Client-ID '+setup.imgur}}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body);
				if (body.data === []) {bot.send(new Message().text("No results. Change your query?").to(message.chat.id));}
				else {bot.send(new Message().text(body.data[Math.floor(Math.random() * body.data.length)].link).to(message.chat.id));}
			}
			else {bot.send(new Message().text("Failed to connect to http://imgur.com").to(message.chat.id));}
		});
	});
	bot.command("yelp [id]", function(message) {
		if (message.args.id === undefined) {
			bot.send(new Message().text("/yelp <ID>. The business ID is retrievable from the yelp search function in private chat (Menu => Utiliy => Yelp).").to(message.chat.id));
			return;
		}
		yelp.business(message.args.id).then(response => {
			if (response.jsonBody.error !== undefined) {
				bot.send(new Message().text("Error: "+response.jsonBody.error.description+".\nRemember: The argument is the business ID. The ID is retrievable from the yelp search function in private chat (Menu => Utiliy => Yelp).").to(message.chat.id));
			}
			else {
				var business = response.jsonBody;
				var yelpmsg = business.name+"\n"+business.location.display_address.join(", ")+"\n"+business.display_phone+"\n";
				business.hours[0].open.forEach(function(open) {
					if (open.day === new Date().getDay()) {
						yelpmsg += "Today it opens from "+open.start+" to "+open.end;
						if (open.is_overnight === true) {
							yelpmsg += " the next day";
						}
						yelpmsg += ".\n";
					}
					else if (open.day - 1 === new Date().getDay()) {
						yelpmsg += "Tomorrow it opens from "+open.start+" to "+open.end;
						if (open.is_overnight === true) {
							yelpmsg += " the next day";
						}
						yelpmsg += ".\n";
					}
					else if (open.day === 0 && new Date().getDay() === 6) {
						yelpmsg += "Tomorrow it opens from "+open.start+" to "+open.end;
						if (open.is_overnight === true) {
							yelpmsg += " the next day";
						}
						yelpmsg += ".\n";
					}
				});
				yelpmsg += business.rating+"★ out of "+business.review_count+" reviews.\nPrice level: "+business.price+"\nRead reviews: "+business.url;
				bot.send(new Message().to(message.chat.id).text(yelpmsg));
			}
		});
	});
	bot.command("money [amount] [currency_from] [currency_to]", function(message) {
		if (message.args.amount === undefined || message.args.currency_from === undefined || message.args.currency_to === undefined) {
			bot.send(new Message().text("Missing arguments! /money <Amount> <Currency from> <Currency to>").to(message.chat.id));
		} else {
			request("http://free.currencyconverterapi.com/api/v3/convert?q="+message.args.currency_from+"_"+message.args.currency_to+"&compact=ultra", function(error, response, body) {
				if (!error && response.statusCode === 200) {
					if (body === "{}") {
						bot.send(new Message().text("Invalid currency. Make sure to use 3-character currency code (aka. ISO 4217).").to(message.chat.id));
					}
					else {
						body = JSON.parse(body);
						var to = body[Object.keys(body)[0]]*message.args.amount;
						bot.send(new Message().text("Result: "+accounting.formatMoney(to, { symbol: message.args.currency_to.toUpperCase(), precision: 2, format: "%v %s" })+"\n(1 "+message.args.currency_from.toUpperCase()+" = "+body[Object.keys(body)[0]]+" "+message.args.currency_to.toUpperCase()+")").to(message.chat.id));
					}
				}
				else {
					bot.send(new Message().text("Failed to connect to http://free.currencyconverterapi.com/").to(message.chat.id));
				}
			});
		}
	});

	const image = new Keyboard().keys([['Cat', 'Bunny', 'Snake'], ['Imgur', 'Flickr'], ["IbSearch", "Pixiv"], ['Back to Main Menu']]).force(true).oneTime(true).resize(true).selective(true);
	const BIM = new Keyboard().keys([["Back to Image Menu"]]).oneTime(true).resize(true).selective(true);
	bot.get(/Image/i, function(message) {
		if (message.text !== "Images" && message.text !== "Back to Image Menu") {return;}
		bot.send(new Message().text("Choose one of the following options.").to(message.chat.id).keyboard(image));
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
		bot.get(/Bunny/i, function(message) {
			if (message.text !== "Bunny") {return;}
			request('https://api.bunnies.io/v2/loop/random/?media=mp4', function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					var rep = new File().file(body.media.mp4).caption('').to(message.chat.id).keyboard(image);
					bot.send(rep);
				} else {
					var err = new Message().text('An error occured. Please check whether https://api.bunnies.io/docs is online or not, and retry.').to(message.chat.id).keyboard(image);
					bot.send(err);
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
		bot.get(/IbSearch/i, function(message) {
			if (message.text !== "IbSearch") {return;}
			if (config.telegram.nsfw.indexOf(message.chat.id) > -1) {
				bot.send(new Message().text("Input a query.").to(message.chat.id).keyboard(new Keyboard().keys([["Skip"],["Back to Image Menu"]]).oneTime(true).resize(true).selective(true))).then(answer => {
					if (answer.text !== "Back to Image Menu") {
						var q = "";
						if (answer.text !== "Skip") {q = answer.text;}
						request("https://ibsearch.xxx/api/v1/images.json?key="+setup.ibsearch+"&limit=1&q=random:+"+q, function(error, response, body) {
							if (!error && response.statusCode === 200) {
								if (body !== "[]") {
									body = JSON.parse(body);
									bot.send(new File().file("https://"+body[0].server+".ibsearch.xxx/"+body[0].path).caption("https://ibsearch.xxx/images/"+body[0].id).to(message.chat.id).keyboard(image));
								}
								else {
									bot.send(new Message().text("No result. Change your query?").to(message.chat.id).keyboard(image));
								}
							}
							else {
								bot.send(new Message().text("Failed to connect to http://ibsearch.xxx").to(message.chat.id).keyboard(image));
							}
						});
					}
				});
			}
			else {
				bot.send(new Message().text("You don't have /nsfw config enabled. Please enable it before using this function.").to(message.chat.id).keyboard(image));
			}
		});
		bot.get(/Imgur/i, function(message) {
			if (message.text !== "Imgur") {return;}
			bot.send(new Message().text("Input a query.").to(message.chat.id).keyboard(new Keyboard().keys([["Back to Image Menu"]]).oneTime(true).resize(true).selective(true))).then(answer => {
				if (answer.text !== "Back to Image Menu") {
					request({url:"https://api.imgur.com/3/gallery/search?q="+answer.text, headers:{'Authorization': 'Client-ID '+setup.imgur}}, function(error, response, body) {
						if (!error && response.statusCode === 200) {
							body = JSON.parse(body);
							if (body.data === []) {bot.send(new Message().text("No results. Change your query?").to(message.chat.id).keyboard(image));}
							else {bot.send(new Message().text(body.data[Math.floor(Math.random() * body.data.length)].link).to(message.chat.id).keyboard(image));}
						}
						else {bot.send(new Message().text("Failed to connect to http://imgur.com").to(message.chat.id).keyboard(image));}
					});
				}
			});
		});
		bot.get(/Pixiv/i, function(message) {
			if (message.text !== "Pixiv" || setup.pixiv_username === "" || setup.pixiv_password === "") {return;}
			bot.send(new Message().text("Input a query.").to(message.chat.id).keyboard(BIM)).then(answer => {
				if (answer.text !== "Back to Image Menu") {
					var q = answer.text;
					if (config.telegram.nsfw.indexOf(message.chat.id) === -1) {q += " -R-18 -R-18G";}
					pixiv.search(q, {per_page: 100, mode: "tag"}).then(json => {
						if (json.response.length === 0) {
							bot.send(new Message().text("No results.").to(message.chat.id).keyboard(image));
							return;
						}
						var illust = json.response[Math.floor(Math.random() * json.response.length)];
						var msg = illust.image_urls.large;
						if (illust.is_manga === true) {msg += "\nThis is a multiple-page illustration, so only the first page is shown. View the full content at http://www.pixiv.net/member_illust.php?mode=medium&illust_id="+illust.id;}
						bot.send(new Message().text(msg).to(message.chat.id).keyboard(image));
					});
				}
			});
		});
		bot.get(/Flickr/i, function(message) {
			bot.send(new Message().text("Input a query, or \"Skip\" to find global recent photos.\nPlease note that this command is slow to execute (≈10 seconds). Be patient.").to(message.chat.id).keyboard(new Keyboard().keys([["Skip"],["Back to Image Menu"]]).oneTime(true).resize(true).selective(true))).then(answer => {
				var photo = {};
				if (answer.text === "Skip") {
					request("https://api.flickr.com/services/rest?api_key="+setup.flickr+"&method=flickr.photos.getRecent&format=json&per_page=500&nojsoncallback=1", function(error, response, body) {
						if (!error && response.statusCode === 200) {
							body = JSON.parse(body);
							photo = body.photos.photo[Math.floor(Math.random() * body.photos.photo.length)];
							request("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+setup.flickr+"&photo_id="+photo.id+"&format=json&nojsoncallback=1", function(error, response, body) {
								if (!error && response.statusCode === 200) {
									body = JSON.parse(body);
									bot.send(new File().file(body.sizes.size[body.sizes.size.length - 1].source).caption(photo.title).to(message.chat.id).keyboard(image));
								}
								else {bot.send(new Message().text('An error occured. Please check whether Flickr is online or not, and retry.').to(message.chat.id).keyboard(image));}
							});
						}
						else {
							bot.send(new Message().text('An error occured. Please check whether Flickr is online or not, and retry.').to(message.chat.id).keyboard(image));
						}
					});
				}
				else if (answer.text !== "Back to Image Menu") {
					request("https://api.flickr.com/services/rest?api_key="+setup.flickr+"&method=flickr.photos.search&text="+answer.text+"&format=json&per_page=500&nojsoncallback=1", function(error, response, body) {
						if (!error && response.statusCode === 200) {
							body = JSON.parse(body);
							if (body.photos.total === 0 || body.photos.total === "0") {
								bot.send(new Message().text('No results.').to(message.chat.id).keyboard(image));
							} else {
								photo = body.photos.photo[Math.floor(Math.random() * body.photos.photo.length)];
								request("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+setup.flickr+"&photo_id="+photo.id+"&format=json&nojsoncallback=1", function(error, response, body) {
									if (!error && response.statusCode === 200) {
										body = JSON.parse(body);
										bot.send(new File().file(body.sizes.size[body.sizes.size.length - 1].source).caption(photo.title).to(message.chat.id).keyboard(image));
									}
									else {bot.send(new Message().text('An error occured. Please check whether Flickr is online or not, and retry.').to(message.chat.id).keyboard(image));}
								});
							}
						}
						else {
							bot.send(new Message().text('An error occured. Please check whether Flickr is online or not, and retry.').to(message.chat.id).keyboard(image));
						}
					});
				}
			});
		});
	const fun = new Keyboard().keys([['Truth', 'Dare'], ['Yoda Quote', 'Chuck Norris'], ['9gag', 'Back to Main Menu']]).force(true).oneTime(true).resize(true).selective(true);
	bot.get(/Fun/i, function(message) {
		if (message.text !== "Fun" && message.text !== "Back to Fun Menu") {return;}
		bot.send(new Message().text("Choose one of the following options.").to(message.chat.id).keyboard(fun));
	});
		bot.get(/Truth/i, function(message) {
			if (message.text !== "Truth") {return;}
			request({
				/*url: "http://unknowndeveloper.tk/truths.php",
				auth: {
					username: "username",
					password: setup.truthanddare
				}*/
				url: "https://lydia.jaren.co/api/truth",
				headers: {
					"Authorization": "%&*^&%&$^#%&*^%$#%^*&"
				}
			}, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					/*body = JSON.parse(body);*/
					var rep = new Message().text(body/*[0].Dare*/).to(message.chat.id).keyboard(fun);
					bot.send(rep);
				} else {
					bot.send(new Message().text("An error occured. Please check whether http://unknowndeveloper.tk/ is online or not, and retry.").to(message.chat.id).keyboard(fun));
				}
			});
		});
		bot.get(/Dare/i, function(message) {
			if (message.text !== "Dare") {return;}
			request({
				/*url: "http://unknowndeveloper.tk/dares.php",
				auth: {
					username: "username",
					password: setup.truthanddare
				}*/
				url: "https://lydia.jaren.co/api/dare",
				headers: {
					"Authorization": "%&*^&%&$^#%&*^%$#%^*&"
				}
			}, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					/*body = JSON.parse(body);*/
					bot.send(new Message().text(body/*[0].Dare*/).to(message.chat.id).keyboard(fun));
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
			const gagkb = new Keyboard()
								.keys([['Search', 'Back to Fun Menu', 'Trending'], ['Funny', 'WTF', 'GIF'], ['NSFW', 'Gaming', 'Anime-Manga'], ['Movie-TV', 'Cute', 'Girl'], ['Awesome', 'Cosplay', 'Sport'], ['Food', 'Ask9gag', 'Timely']])
								.force(true)
								.oneTime(true)
								.resize(true)
								.selective(true);
			var rep = new Message().text('If you want to search using a specific query, click "Search".\nIf you want to get a random gag in a specific category, click your prefered category.\nYou can also click "Back to Fun Menu".').to(message.chat.id).keyboard(gagkb);
			bot.send(rep).then(answer => {
				if (gagbrds.indexOf(answer.text) > -1) {
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
					if (config.telegram.nsfw.indexOf(message.chat.id) === -1) {
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
	const util = new Keyboard().keys([['Bitly', 'Gyazo'], ['Minecraft User', 'Minecraft Server'], ['Yelp', 'Back to Main Menu']]).force(true).oneTime(true).resize(true).selective(true);
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
						var bopt = ["shorten", "longUrl"];
						if (subanswer.text === "Expand a Bitly link") {bopt = ["expand", "shortUrl"];}
						var site = "";
						if (!answer.text.startsWith("http")) {site = "http://"+answer.text;} else {site = answer.text}
						request("https://api-ssl.bitly.com/v3/"+bopt[0]+"?access_token="+setup.bitly_token+"&"+bopt[1]+"="+site+"&format=txt", function(error, response, body) {
							if (!error && response.statusCode === 200) {
								bot.send(new Message().text(body).to(message.chat.id).keyboard(util));
							} else {
								bot.send(new Message().text("An error occured. Invalid address, or retry?").to(message.chat.id).keyboard(util));
							}
						});
					});
				}
			});
		});
		bot.get(/Gyazo/i, function(message) {
		var q = new Message().text('You can use the following methods to upload an image to gyazo...\n* Send me the direct URL to the image\n* Upload it here (PLEASE COMPRESS IT, or it\'ll upload as a document and it just won\'t work)').to(message.chat.id);
		bot.send(q).then(answer => {
			if (answer.photo !== undefined) {
				request("https://api.telegram.org/bot"+setup.telegram+"/getFile?file_id="+answer.photo[answer.photo.length -1].file_id, function(error, response, body) {
					if (!error && response.statusCode === 200) {
						body = JSON.parse(body);
						gyazo("https://api.telegram.org/file/bot"+setup.telegram+"/"+body.result.file_path).then(function (urls) {
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
		bot.get(/Yelp/i, function(message) {
			if (message.text !== "Yelp") {return;}
			bot.send(new Message().text("I need your location. You have these options:\n - Send me your location if you're on phone, or:\n - Type in your location, e.g. \"Montréal, QC\".\nTo protect your privacy, your location will NOT be recorded.").to(message.chat.id).keyboard(ukb)).then(answer => {
				if (answer.text !== "Back to Utility Menu") {
					var yelpobj = {};
					if (answer.location !== undefined) {
						yelpobj = answer.location;
					}
					else {
						yelpobj.location = answer.text;
					}
					bot.send(new Message().text("Now I need a query.").to(message.chat.id).keyboard(ukb)).then(subanswer => {
						if (subanswer.text !== "Back to Utility Menu") {
							yelpobj.term = subanswer.text;
							yelpobj.limit = 10;
							yelp.search(yelpobj).then(response => {
								if (response.jsonBody.businesses.length === 0) {
									bot.send(new Message().text("No results. Try again!").to(message.chat.id).keyboard(util));
									return;
								}
								var yelptext = "Use the /yelp command to retrieve details of the business.\n\n";
								response.jsonBody.businesses.forEach(function(business) {
									yelptext += business.name+": "+business.location.address1+", "+business.rating+"★ out of "+business.review_count+" reviews. `/yelp "+business.id+"`\n\n";
								});
								bot.send(new Message().text(yelptext).to(message.chat.id).keyboard(util));
							});
						}
					});
				}
			});
		});
	bot.get(/Settings/i, function(message) {
		if (message.text !== "Settings") {return;}
		var output = "Your current settings:\n* Not-Suitable-For-Work/18+ content: ";
		if (config.telegram.nsfw.indexOf(message.chat.id) > -1) {output += "Enabled";} else {output += "Disabled";}
		output += "\nTo change the config, use the buttons below. Replying anything other than the keyboard choices will exit this menu.";
		var kb = new Keyboard()
					.keys([['Toggle SFW/NSFW'], ['Back to Main Menu']])
					.force(true)
					.oneTime(true);
		var rep = new Message().text(output).to(message.chat.id).keyboard(kb);
		bot.send(rep).then(answer => {
			if (answer.text === "Toggle SFW/NSFW") {
				var index = config.telegram.nsfw.indexOf(message.chat.id);
				if (index > -1) {
					config.telegram.nsfw.splice(index, 1);
					var rep = new Message().text("Done! To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
					bot.send(rep);
					fs.writeFile('config.json', JSON.stringify(config), 'utf8');
				}
				else if (index === -1) {
					config.telegram.nsfw.push(message.chat.id);
					var rep = new Message().text("NSFW has been enabled. Please make sure you are LEGAL to see NSFW content in your country. To adjust another setting, or to check the current settings, please click /settings.").to(message.chat.id).keyboard(menu);
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
		var err = new Message().text('Metagon, Confidence in Usability.\n\nOriginally in Discord, I am a multifunction bot to suit your needs!\nIf you have any questions, feel free to ask my creator, @austinhuang.\nMy documentation, source, and bug report desk is at https://github.com/austinhuang0131/metagon.').to(message.chat.id).keyboard(menu);
		bot.send(err);
	})
	bot.get(/Feedback/i, function(message) {
		if (message.text !== "Feedback") {return;}
		if (setup.myid === undefined) {
			bot.send(new Message().text('Hmm...I don\'t know who is the owner. Tell the host of the bot to...\n - Go to setup.json and put his ID in the myid OR\n - Just paste 265228448 (@austinhuang) into myid').to(message.chat.id));
		}
		var rep = new Message().text('Hello, fellow user. If you\'d like to suggest a new feature, please type it here. Thank you!\n---@austinhuang\n\nWARNING: If you want to report a bug, go to https://github.com/austinhuang0131/metagon/issues').to(message.chat.id).keyboard(BMM);
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
}

if (setup.kik_token !== "") {
	var kik = new Kik({
		username: setup.kik_username,
		apiKey: setup.kik_token,
		baseUrl: "https://5be3dc12.ngrok.io",
	});
	server.listen(port, ipaddress, function () {
		console.log('%s listening to %s', server.name, server.url); 
	});
	server.post('/incoming', kik.incoming());
	kik.updateBotConfiguration();
	kik.onTextMessage((message,next) => {
  		console.log("KIK @"+message.from+": "+message.body);
		var arrayFound = session.find(function(item) {
			return item.chat === message.chatId;
		});
		if (arrayFound !== undefined) {
			if (arrayFound.session === "pixiv" && message.body !== "Back to Image menu") {
				var q = message.body;
				if (config.kik.nsfw.indexOf(message.chat.id) === -1) {q += " -R-18 -R-18G";}
				pixiv.search(q, {per_page: 100, mode: "tag"}).then(json => {
					console.log(arrayFound.session);
					/*if (json.response.length === 0) {*/
						message.reply(Kik.Message.text("No results.").addResponseKeyboard(["Cat", "Bunny", "Snake", "Back to Main Menu"]));
						/*return;
					}
					var illust = json.response[Math.floor(Math.random() * json.response.length)];
					message.reply(Kik.Message.picture(illust.image_urls.large));
					if (illust.is_manga === true) {message.reply(Kik.Message.text("\nThis is a multiple-page illustration, so only the first page is shown. View the full content at http://www.pixiv.net/member_illust.php?mode=medium&illust_id="+illust.id).addResponseKeyboard(["Cat", "Bunny", "Snake", "Back to Main Menu"]));}*/
				});
			}
			session = session.splice(i, 1);
		}
		if (message.body === "/help") {
			message.reply("https://github.com/austinhuang0131/metagon/wiki");
		}
		else if (message.body === "/start" || message.body === "Back to Main Menu" || message.body === "start") {
			message.reply(Kik.Message.text("What do you want to do now?").addResponseKeyboard(["Images", "Fun", "Utility", "Settings", "About/Support"]));
		}
		else if (message.body === "About/Support") {
			message.reply('Originally in Discord, I am a multifunction bot to suit your needs!\nIf you have any questions, feel free to ask my creator, @austinhuang.\nMy documentation, source, and bug report desk is at https://github.com/austinhuang0131/metagon.');
		}
		else if (message.body.toLowerCase() === "settings") {
			var output = "Your current settings:\n* Not-Suitable-For-Work/18+ content: ";
			if (config.kik.nsfw.indexOf(message.chatid) > -1) {output += "Enabled\n";} else {output += "Disabled\n";}
			output += "\nTo change the config, use the buttons below.";
			message.reply(Kik.Message.text(output).addResponseKeyboard(['Toggle SFW/NSFW', 'Back to Main Menu']));
		}
		else if (message.body.toLowerCase() === "nsfw" || message.body === "Toggle SFW/NSFW") {
					var index = config.kik.nsfw.indexOf(message.chatid);
					if (index > -1) {
						config.kik.nsfw.splice(index, 1);
						message.reply(Kik.Message.text("Done! To adjust another setting, or to check the current settings, please click Settings.").addResponseKeyboard(["Images", "Fun", "Utility", "Settings", "About/Support", "Feedback"]));
						fs.writeFile('config.json', JSON.stringify(config), 'utf8');
					}
					else if (index === -1) {
						config.kik.nsfw.push(message.chatid);
						message.reply(Kik.Message.text("NSFW has been enabled. Please make sure you are LEGAL to see NSFW content in your country. To adjust another setting, or to check the current settings, please click Settings.").addResponseKeyboard(["Images", "Fun", "Utility", "Settings", "About/Support", "Feedback"]));
						fs.writeFile('config.json', JSON.stringify(config), 'utf8');
					}
				}
		else if (message.body.toLowerCase() === "images" || message.body === "Back to Image menu") {
			message.reply(Kik.Message.text("What do you want to do now?").addResponseKeyboard(["Cat", "Bunny", "Snake", "Back to Main Menu"]));
		}
		else if (message.body.toLowerCase() === "cat") {
			request("http://random.cat/meow", function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					message.reply(Kik.Message.picture(body.file).addResponseKeyboard(["Cat", "Bunny", "Snake", "Back to Main Menu"]));
				} else {
					message.reply(Kik.Message.text("An error occured. Please check whether http://random.cat is online or not, and retry.").addResponseKeyboard(["Cat", "Bunny", "Snake", "Back to Main Menu"]));
				}
			});
		}
		else if (message.body.toLowerCase() === "snake") {
			request("http://fur.im/snek/snek.php", function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					message.reply(Kik.Message.picture(body.file).addResponseKeyboard(["Cat", "Bunny", "Snake", "Back to Main Menu"]));
				} else {
					message.reply(Kik.Message.text("An error occured. Please check whether http://fur.im/snek/snek.php is online or not, and retry.").addResponseKeyboard(["Cat", "Bunny", "Snake", "Back to Main Menu"]));
				}
			});
		}
		else if (message.body.toLowerCase() === "bunny") {
			request('https://api.bunnies.io/v2/loop/random/?media=gif', function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					message.reply(Kik.Message.video(body.media.gif));
				} else {
					message.reply(Kik.Message.text('An error occured. Please check whether https://api.bunnies.io/docs is online or not, and retry.'));
				}
			});
		}
		else if (message.body.toLowerCase() === "pixiv") {
			session[session.length] = {chat: message.chatId, session: "pixiv"};
			message.reply(Kik.Message.text("Input a query.").addResponseKeyboard(["Back to Image menu"]));
		}
		else if (message.body.toLowerCase() === "fun") {
			message.reply(Kik.Message.text("What do you want to do now?").addResponseKeyboard(["Truth", "Dare", "Yoda Quote", "Chuck Norris", "9gag", "Back to Main Menu"]));
		}
		else if (message.body.toLowerCase() === "truth") {
			request({
				url: "http://unknowndeveloper.tk/truths.php",
				auth: {
					username: "username",
					password: setup.truthanddare
				}
			}, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					message.reply(body[0].Truth);
				} else {
					message.reply('An error occured. Please check whether http://unknowndeveloper.tk/ is online or not, and retry.');
				}
			});
		}
		else if (message.body.toLowerCase() === "dare") {
			request({
				url: "http://unknowndeveloper.tk/dares.php",
				auth: {
					username: "username",
					password: setup.truthanddare
				}
			}, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					body = JSON.parse(body);
					message.reply(body[0].Dare);
				} else {
					message.reply('An error occured. Please check whether http://unknowndeveloper.tk/ is online or not, and retry.');
				}
			});
		}
		else if (message.body.toLowerCase() === "yoda quote" || message.body.toLowerCase() === "yoda") {
			message.reply(yodasaid[Math.floor(Math.random() * yodasaid.length)]);
		}
		else if (message.body.toLowerCase() === "gyazo") {
			message.reply("Please upload an image here. (Unlike Telegram/Discord version, using direct URL does not work here.)");
			kik.onPictureMessage((answer) => {
				gyazo(answer.picUrl).then((urls) => {
					answer.reply(urls[0]);
				});
			});
			kik.onLinkMessage((answer) => {
				gyazo(answer.url).then((urls) => {
					answer.reply(urls[0]);
				});
			});
		}
	});
	kik.onStartChattingMessage((message,next) => {
		console.log("KIK @"+message.from+" started to use this bot!");
		message.reply(Kik.Message.text("Hello. This is Metagon. Nice to meet you! You can type \"/start\" to begin, or \"@metagon start\" in group chats. If you have any questions, visit https://github.com/austinhuang0131/metagon/wiki or contact @austinhuang0131.").addResponseKeyboard(["Images", "Fun", "Utility", "Settings", "About/Support"]));
	});
}

process.on('unhandledRejection', (reason, p) => {
	console.error("Unhandled:"+p+" Reason: "+reason);
});
process.on('uncaughtException', (err) => {
	console.error(`Caught exception: ${err}`);
});
