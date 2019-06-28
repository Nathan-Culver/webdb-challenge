exports.up = function(knex, Promise) {
	return knex.schema.createTable('projects', (tbl) => {
		tbl.increments(); 
		tbl.string('name', 100).notNullable(); 
		tbl.text('description', 255).notNullable(); 
		tbl.boolean('completed').defaultTo(false); 
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('projects');
};