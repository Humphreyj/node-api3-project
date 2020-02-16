const express = require('express');
const data = require('./userDb');
const router = express.Router();


let userData;

router.post('/',validateUser, (req, res) => {
  data.insert(req.body.name)
    .then(response =>{
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Could not create User.',
        error: err,
      })
    })
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  const post = {
    text: req.body.text,
    user_id: req.params.id
  }

  data.insert(post)
  .then(response => {
    res.status(201).json(response);
  })
  .catch(err => {
    res.status(500).json({
      message:'User Could not be created.',
      error: err,
    })
  })
});

router.get('/', (req, res) => {
  data.get()
  .then(response => {
    res.status(200).json(response);
    userData=response;
    console.log(userData)
  })
  .catch(err => {
    res.status(500).json({
      message: 'There was a problem getting all the users.'
    })
  })
});

router.get('/:id',validateUserId, (req, res) => {
  const {id} = req.params;
  data.getById(id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({
      message:"This user does not exist",
      error: err,
    })
  })
});

router.get('/:id/posts',validateUserId,(req, res) => {
  const {id} = req.params;
  data.getUserPosts(id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({
      message:'The users posts could not be retrieved.',
      error: err,
    })
  })
});

router.delete('/:id',validateUserId,(req, res) => {
  const {id} = req.params;
  data.remove(id)
  .then(response => {
    res.status(204).json({message:'User has been deleted.'})
  })
  .catch(err =>{
    res.status(500).json({
      message: 'The user could not be deleted.',
      error: err
    })
  })
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const updatePost = {
    text: req.body.text,
    user_id: id
  }

  data.update(id,updatePost)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err=> {
    res.status(500).json({
      message:'The post could not be updated.',
      error: err,
    })
  })
});

//custom middleware

function validateUserId(req, res, next){
const {id} = req.params;

data.getById(id)
.then(user => {
  if(!user) {
    res.status(400).json({message: 'invalid user Id.'})
  }else {
    req.user = user;
    next();
  }
})
 
}

function validateUser(req, res, next) {
  if(!req.body.name){
    res.status(400).json({message: 'Missing User Name.'})
  }else{
    next();
  }
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({message:'Missing post data.'})
  }
  next();
}



module.exports = router;
