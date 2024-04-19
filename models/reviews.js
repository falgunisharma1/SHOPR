const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    description:  { type: [String], required: false },
    productId:  { type: String, required: true },
    userId: {type: String, required: false},
    rating: {type: Number, required: false},
    content: {type: String, required: true},
    
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;