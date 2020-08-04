const fetch = require('node-fetch');

module.exports = async function() {
	let resp = await fetch('https://ddat-profession-capability-framework-role.register.gov.uk/records.json?page-size=5000');
	let roles = await resp.json();
	return Object.values(roles).map(entry => entry.item[0]);
};