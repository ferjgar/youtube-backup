#!/usr/bin/env node

// we don´t want cache for this
delete require.cache[require.resolve('./google_credentials')];
const googleCredentials = require('./google_credentials');

console.log('CREDENTIALS', googleCredentials);
