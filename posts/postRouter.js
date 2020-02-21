const express = require('express');
const data = require('./postDb');

const router = express.Router();



router.get('/', (req, res) => {
  data.get()
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({message: 'There was a problem getting the posts.',error: err})
  })
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  data.getById(id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err=> {
    res.status(500).json({
      message: 'This post does not exist.',
      error: err
    })
  })

});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
 data.remove(id)
 .then(response => {
   res.status(204).json({message: 'Post was removed.'})
 })
});

router.use(validatePost)

router.put('/:id', (req, res) => {
  const {id} = req.params;
    data.update(id, req.body)
    .then(response => {
      if(response === 1) {
        res.status(201).json(req.body)
      }
    })
    .catch(err => {
      res.status(500).json({
        message:'There was an error editing your post.',
        error: err,
      })
    })

  
  
});

// custom middleware

function validatePost(req, res, next) {
  const {text} = req.body;
  if(!text) {
    res.status(400).json({message:'Your post needs text dawg!'})
  }
  next();
}


module.exports = router;
