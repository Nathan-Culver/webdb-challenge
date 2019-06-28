exports.seed = function(knex, Promise) {
	return knex('projects').truncate().then(function() {
		return knex('projects').insert([
			{
				name: 'The Website.',
				description: 'Info!'
			}
		]);
	});
};