exports.seed = function(knex, Promise) {
	return knex('action').truncate().then(function() {
		return knex('action').insert([
			{
				description: 'Choose colors',
				notes: 'Black & white are not colors. They are shades & tints.',
				project_id: 1
			}
		]);
	});
};