const router = require('express').Router();
const { User, Thought } = require('../../models');

// /api/users

// GETS ALL USERS
router.get("/", async (req, res) => {
    try {
        const dbUserData = await User.find().select ("-__v");
        return res.status(200).json(dbUserData);
    }catch(err) {
        res.status(500).json(err);
    }
});

// CREATES A NEW USER
router.post("/", async (req, res) => {
    try { 
        const dbUserData = await User.create(req.body)
        return res.status(200).json(dbUserData);

    }catch(err) {
        res.status(500).json(err)
    }
});

// /api/users/:userId

// GETS A USER BY ID
router.get("/:userId", async(req, res) => {
    try {
        const dbUserData = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");
        if(!dbUserData) {
            return res.status(404).json({ message: "No matching User!" });
        }
        res.status(200).json(dbUserData);

    }catch(err) {
        res.status(500).json(err)
    }    
});

//UPDATES A USER BY ID
router.put("/:userId", async(req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate(
            {
                _id: req.params.userId,
            },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        );

        if(!dbUserData) {
            return res.status(404).json({ message: "No user matches this ID!"})
        }
        res.status(200).json(dbUserData)


    }catch(err) {
        res.status(500).json(err)
    }
});

//DELETES A USER BY ID
router.delete("/:userId", async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.userId})
        if(!dbUserData) {
            return res.status(404).json({ message: "No user matches this ID!"})
        }
        await Thought.deleteMany({ _id: { $in: dbUserData.thought }});

        res.status(200).json({message: "User and associated thoughts have been deleted."})

    }catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
});

// /api/users/:userId/friends/:friendId

// ADD A FRIEND
router.post("/:userId/friends/:friendId", async (req, res) => {
    try {
        const dbUserData = User.findOneAndUpdate( 
            { _id: req.params.userId }, 
            { 
                $addToSet: { friends: req.params.friendId },
            },
            {
                new: true
            }
    );
    if (!dbUserData) {
        return res.status(404).json({ message: "No user matches this ID!"})
    }
    res.status(200).json(dbUserData)
    }catch(error) {
        res.status(500).json(error)
    }
});

// DELETE A FRIEND 
router.delete("/:userId/friends/:friendId", async (req, res) => {
    try {
        const dbUserData = User.findOneAndDelete( 
            { _id: req.params.userId },
            {$pull: { friends: req.params.friendId}},
            { new: true}
        );
            
        if(!dbUserData) {
            return res.status(404).json({ message: "No user matches this ID!"})
        }
    res.status(200).json(dbUserData)
    }catch(error) {
        res.status(500).json(error)
    }
});

module.exports = router;
