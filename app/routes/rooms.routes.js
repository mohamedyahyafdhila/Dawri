const express = require('express');
const router = express.Router();
const Room = require('../models/room.model');
const mongoose = require('mongoose')
const User = require('../models/user.model');



/*router.get('/', (req,res,next) => {
    Room.find()
    .select("name category_name max_client duration")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            rooms: docs.map(doc => {
                return {
                    name: doc.name,
                    category_name: doc.category_name,
                    max_client: doc.max_client,
                    duration: doc.duration,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8081/rooms' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({error: err});
    });
});*/

router.get('/', (req,res,next) => {
    Room.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({error: err});
    });
});

router.post('/', (req,res,next) => {
    const room = new Room({
        id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        category_name : req.body.category_name,
        max_client : req.body.max_client,
        duration : req.body.duration,
        owner : req.body.id
    });
    room
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'Created room successfully',
            room: result
        });
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err});
    });

    
});
router.get('/:roomId', (req,res,next) => {
    const id = req.params.roomId;
    Room.findById(id)
    .select("name category_name max_client duration")
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json({
                room: doc,
                request:{
                    type: 'GET',
                    url: 'http://localhost:8081/rooms' 
                }
            });
        }else{
            res.status(404).json({message:"No valid entry found for this ID"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
});
/*
router.patch('/:name', (req,res,next) => {
    const name = req.params.name;
    const updateOps= {};
    for(const ops of req.body ){
        updateOps[ops.propName]= ops.value;
    }
    Room.update({name: name},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({error: err});
    });
});
*/
router.patch('/:name', (req,res,next) => {
    const name = req.params.name;
   
    Room.update({name: name},{$set: {max_client: req.body.newMax_client, duration: req.body.newDuration}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({error: err});
    });
});

router.delete('/:roomId', (req,res,next) => {
    const id = req.params.roomId;
    Room.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({error: err});
    });
});


router.post('/updateroom' ,(req,res,next) => {
    Room.findOne({
        name: req.body.name
      })
        .exec((err, room) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          room.name=req.body.name,
          room.max_client=req.body.max_client,
          room.duration=req.body.duration
          
    
          room.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            res.status(200).send({
            
            
                name: room.name,
                max_client:room.max_client,
                duration: room.duration,
              
            });      });
         // user.password= bcrypt.hashSync(req.body.password, 8)
        
        });
    });

    module.exports = router;
