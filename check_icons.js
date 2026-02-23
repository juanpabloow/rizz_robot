const icons = require('simple-icons');

const keys = Object.keys(icons);
console.log('Total icons:', keys.length);

const check = (term) => {
    const matches = keys.filter(k => k.toLowerCase().includes(term.toLowerCase()));
    console.log(`Matches for "${term}":`, matches);
};

check('teams');
check('slack');
check('outlook');
check('salesforce');
check('messenger');
