// thoughtText: {
//     String
//     required
//     must be between 1 & 280 characters
// }
// createdAt: {
//     date:
//     set defalut value to the current timestamp
//     use a getter method to formate the timestampon the query
// }
// username (the user that created this thought) {
//     String
//     required
// }
// reactions (these are like replies) {
//     array of nested documents created with the 'reactionSchema'
// }

// Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

///////////////////// Reaction (SCHEMA ONLY) ////////////////

// reactionId

// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId
// reactionBody

// String
// Required
// 280 character maximum
// username

// String
// Required
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// Schema Settings

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

