module.exports = {
	token: '',
	timeout: 30,
	limit: 100,
	triggers: {
		'можно': {
			action: 'simpleAnswer',
			options: {
				method: 'reply',
				text: 'У нас все можно!'
			}
		},
		'@ignatievbot': {
			action: 'greatingAnswer',
			options: {
				method: 'reply',
				text: 'Ничего, в следующем году пересдашь'
			}
		}
	}
};
