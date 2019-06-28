const express = require('express');
const knex = require('knex'); 
const morgan = require('morgan');
const knexConfig = require('./knexfile'); 
const db = knex(knexConfig.development); 
const server = express();
server.use(express.json());
server.use(morgan('short')); 

server.post('/api/projects', (req, res) => {
	const project = req.body;
	db('projects')
		.insert(project)
		.returning('id')
		.then((id) => {
			res.status(201).json(id);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Cannot create project' });
		});
}); 

server.post('/api/actions/', (req, res) => {
	const action = req.body;
	db('action')
		.insert(action)
		.returning('id')
		.then((ids) => {
			res.status(201).json(ids);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Cannot create action.', err });
		});
});

server.get('/api/projects/:id', (req, res) => {
	const { id } = req.params; 
	db('projects') 
		.where({ id }) 
		.first() 
		.then((projects) => {
			if (projects) {
				db('action')
					.where({ project_id: id }) 
					.then((actions) => {
						projects.actions = actions; 
						res.status(200).json(projects); 
					})
					.catch((err) => res.status(500).json({ message: 'Servers side error.', err })); //
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Servers side error.', err });
		});
});

server.listen(8000, () => console.log("Set server on localhost:8000"));