const router = require('express').Router();
const { User, Thought } = require('../../models');

// /api/thoughts
router.get("/", async (req, res) => {
    try {
        const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
        res.status(200).json(dbThoughtData);
    } catch (error) {
        res.status(404).json(error);
    }
});


router.post("/", async (req, res) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        const dbUserData = await User.findOneAndUpdate(
            {
            _id: req.body.userId,
            },
            {$push: { thoughts: dbThoughtData._id}},
            {new: true}
        );
        if(!dbUserData) {
            return res.status(404).json({message:"No user with this ID!"});
        }
        res.status(200).json({dbThoughtData,message: "Thought successfully created."});
    } catch (error) {
        res.status(404).json(error);
    }
})

// // /api/thoughts/:thoughtId

router.get("/:thoughtId", async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId});
        if(!dbThoughtData) {
            return res.status(404).json({message: "No thought with this ID!" });
        }
        res.status(200).json(dbThoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:thoughtId", async (req, res) => {
    try {
        const dbThoughtData = Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $set: req.body}, 
            { runValidators: true, new: true }
            );
            if(!dbThoughtData) {
                return res.status(404).json({ message:"No thought with this ID!" })
            }
            res.status(200).json(dbThoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:thoughtId", async (req, res) => {
    try {
       const dbThoughtData = Thought.findOneAndRemomve({
        _id: req.params.thoughtId,
       });
       if(!dbThoughtData) {
        return res.status(404).json({ message:"No thought with this ID!" })
    }
    const dbUserData = await User.findOneAndUpdate(
        {
            thoughts: req.params.thoughtId,
        },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
    );
    if(!dbUserData) {
        return res.status(404).json({message:"Thought created but no user with this ID!"});
    }
        res.status(200).json({dbThoughtData, message: "Thought successfully deleted."});
    } catch (error) {
        res.status(500).json(error);
    }
});

// /api/thoughts/:thoughtId/reactions
router.post("/:thoughtId/reactions", async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate(
            {
             _id: req.params.thoughtId,
            },
            { $addToSet: { reactions: req.body }
            },
            { runValidators: true, new: true }
        );
        if(!dbThoughtData) {
            return res.status(404).json({message: "No thought matches ID!"})
        }
        res.status(200).json(dbThoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:thoughtId/reactions", async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId,
            },
            { $pull: { reactions: {reactionId: req.params.reactionId } }
            },
            { runValidators: true, new: true }
        );
        if(!dbThoughtData) {
            return res.status(404).json({message: "No thought matches ID!"})
        }
        res.status(200).json(dbThoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
