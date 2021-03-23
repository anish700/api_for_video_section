const express = require('express');
const router = express.Router();
const {  validationResult } = require('express-validator');
const { check , body } = require('express-validator/check')
var VideoController = require('../controllers/videoController')


//@route   GET /video
//@desc    get all videos
//@access  public 
router.get('/' ,VideoController.getVideos );
  

//@route   GET /video/:id
//@desc    get single video
//@access  public 
router.get('/:id' ,VideoController.getVideo );

//@route   POST /video
//@desc    add new video
//@access  public 
router.post('/',[
    check('videoURL' , ' video is required').not().isEmpty() , 
  ] ,VideoController.addVideo );

//@route   UPDATE /video/:id
//@desc    update video
//@access  public 
router.put('/:id' ,VideoController.updateVideo );

//@route   DELETE /video/:id
//@desc    DELETE video
//@access  public 
router.delete('/:id' ,VideoController.deleteVideo );


module.exports = router;