if(process.env.NODE_ENV === 'production'){
    module.exports = require('./configs_prod')
} else {
    module.exports = require('./configs_dev')
} 
