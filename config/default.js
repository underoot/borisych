module.exports = {
	token: '',
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