const Sequelize = require('sequelize');
const db = require('../config/db');

const Caption = db.sequelize.define('caption', {
    
    caption: {
      type: Sequelize.STRING,
      allowNull: false
    },
    photo_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Caption;












   