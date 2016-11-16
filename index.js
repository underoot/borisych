const config = require('config');
const Telegraf = require('telegraf');
const _ = require('lodash');

const log = require('./log');

const bot = new Telegraf(
	process.env.BORISYCH_TOKEN || config.get('token')
);

const TRIGGER_WORDS = Object.keys(config.get('triggers'));

function triggerWord(message) {
	return _.find(TRIGGER_WORDS, word => {
		return ~message.toLowerCase().indexOf(word);
	});
}

const handlers = {
	simpleAnswer(ctx, options) {
		const answerOptions = [];

		answerOptions.push(options.text);

		ctx[options.method].apply(ctx, answerOptions);
	},

	greatingAnswer(ctx, options) {
		const answerOptions = [];
		let text = options.text;

		if (_.get(ctx, 'from.first_name')) {
			text += `, ${_.get(ctx, 'from.first_name')}!`;
		} else {
			text += '!';
		}

		answerOptions.push(text);

		ctx[options.method].apply(ctx, answerOptions);
	}
}

function processMessage(word, ctx) {
	const handler = config.get(`triggers.${word}`);

	const {
		apiMethod,
		action,
		options
	} = handler;

	handlers[action](ctx, options);
}

bot.on('text', ctx => {
	const word = triggerWord(_.get(ctx, 'message.text'));

	if (word) {
		log.info(`triggered word "${word}" from user ${_.get(ctx, 'from.id')}`)
		processMessage(word, ctx);
	}
});

bot.startPolling(
	config.get('timeout'),
	config.get('limit')
);

log.info('borisych started');
