const express = require('express');
const router = express.Router();
const Caption = require('../models/Caption');
const cache = require( '../routeCache' );

router.get('/', cache(300), async (req, res, next) => {
    if (!req.user) {
        res.redirect('/login')
    } else {    
        const captions = await Caption.findAll({where: { user_id: req.user.dataValues.id}})
        
        if (!captions[0]) {
            await Caption.create({
                caption: '',
                photo_id: 1,
                user_id: req.user.dataValues.id
            });
            await Caption.create({
                caption: '',
                photo_id: 2,
                user_id: req.user.dataValues.id
            });
            await Caption.create({
                caption: '',
                photo_id: 3,
                user_id: req.user.dataValues.id
            });
            await Caption.create({
                caption: '',
                photo_id: 4,
                user_id: req.user.dataValues.id
            })
            res.render('profile', { user: req.user})
        } else {
            let caption1 = await Caption.findOne({where: { user_id: req.user.dataValues.id, photo_id: 1}});
            let caption2 = await Caption.findOne({where: { user_id: req.user.dataValues.id, photo_id: 2}});
            let caption3 = await Caption.findOne({where: { user_id: req.user.dataValues.id, photo_id: 3}});
            let caption4 = await Caption.findOne({where: { user_id: req.user.dataValues.id, photo_id: 4}});
            res.render('profile', { user: req.user, caption1: caption1.dataValues.caption, caption2: caption2.dataValues.caption, caption3: caption3.dataValues.caption, caption4: caption4.dataValues.caption});
        }};   
})

router.post('/pic1', async (req, res, next) => {
    const caption1 = req.body.caption1;
    const previousCaption = await Caption.findOne({where: {photo_id: 1, user_id:req.user.dataValues.id}})
    try {
        if (previousCaption) {
        const result = await Caption.update(
          { caption: caption1 },
          { where: { photo_id: 1, user_id: req.user.dataValues.id  } }
        )} else {
           const newCaption = Caption.create({ caption: caption1, photo_id: 1, user_id: req.user.dataValues.id})
        }
      } catch (err) {
        console.log(err)
      }
    res.redirect('/profile')
});

router.post('/pic2', async (req, res, next) => {
    const caption2 = req.body.caption2;
    const previousCaption = await Caption.findOne({where: {photo_id: 2, user_id:req.user.dataValues.id}})
    try {
        if (previousCaption) {
        const result = await Caption.update(
          { caption: caption2 },
          { where: { photo_id: 2, user_id: req.user.dataValues.id  } }
        )} else {
           const newCaption = Caption.create({ caption: caption2, photo_id: 2, user_id: req.user.dataValues.id})
        }
      } catch (err) {
        console.log(err)
      }
    res.redirect('/profile')
});

router.post('/pic3', async (req, res, next) => {
    const caption3 = req.body.caption3;
    const previousCaption = await Caption.findOne({where: {photo_id: 3, user_id:req.user.dataValues.id}})
    try {
        if (previousCaption) {
        const result = await Caption.update(
          { caption: caption3 },
          { where: { photo_id: 3, user_id: req.user.dataValues.id  } }
        )} else {
           const newCaption = Caption.create({ caption: caption3, photo_id: 3, user_id: req.user.dataValues.id})
        }
      } catch (err) {
        console.log(err)
      }
    res.redirect('/profile')
});

router.post('/pic4', async (req, res, next) => {
    const caption4 = req.body.caption4;
    const previousCaption = await Caption.findOne({where: {photo_id: 4, user_id:req.user.dataValues.id}})
    try {
        if (previousCaption) {
        const result = await Caption.update(
          { caption: caption4 },
          { where: { photo_id: 4, user_id: req.user.dataValues.id  } }
        )} else {
           const newCaption = Caption.create({ caption: caption4, photo_id: 4, user_id: req.user.dataValues.id})
        }
      } catch (err) {
        console.log(err)
      }
    res.redirect('/profile')
})

module.exports = router;