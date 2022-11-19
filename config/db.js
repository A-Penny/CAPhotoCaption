const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = new Sequelize('Photo_Caption', 'andrewpenny', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  storage: './session.postgres'
});

const myStore = new SequelizeStore({
  db: sequelize
});

session({
  secret: 'keyboard cat',
  store: new SequelizeStore({
      db: sequelize,
  }),
  cookie: {
      maxAge: 1000 * 60 * 60 * 24
  },
  saveUninitialized: true,
  resave: false
});






module.exports = {
    session,
    sequelize,
    SequelizeStore
}