const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('Photo_Caption', 'andrewpenny', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

module.exports = {
    sequelize,
    User
}