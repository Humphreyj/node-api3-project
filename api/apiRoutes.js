const express = require('express');

const router = express.Router();


const postRouter = require('../posts/postRouter');
const userRouter = require('../users/userRouter');


router.use('/posts',postRouter);
router.use('/users', userRouter);


module.exports = router;