const fetch = require('node-fetch');

module.exports = async function() {
	let resp = await fetch('https://ddat-profession-capability-framework-skill.register.gov.uk/records.json?page-size=5000');
	let results = await resp.json();
	return Object.values(results).map(entry => entry.item[0]);
};