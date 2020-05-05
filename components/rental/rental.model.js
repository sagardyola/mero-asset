const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    message: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})


const rentalSchema = new Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        sparse: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: Number,
    negotiable: Boolean,
    dimension: Number,
    location: {
        type: String,
        required: true,
        trim: true
    },
    // city and country
    description: {
        type: String,
        trim: true
    },
    image: String,

    // adRunDays:Number,
    // adExpiryDate:

    itemFor: {
        type: String,
        enum: ['Rent',
            'Sale',
            'Homestay',
            'Roommate'
        ],

        //HOmestay and roommate ma only first 4 options
    },

    itemType: {
        type: String,
        enum: ['Room',
            'Flat',
            'Apartment',
            'House',
            'Land',
            'Office Space',
            'Shop Space',
            'Commercial Property'
        ]
    },

    // In land and Commercial Property dont show looking for, lifestyle and room details


    // Looking For
    gender: {
        type: String,
        enum: ['Male',
            'Female',
            'Any'
        ]
    },

    maritalStatus: {
        type: String,
        enum: ['Single',
            'In a Relationship',
            'Engaged',
            'Married'
        ]
    },

    //Lifestyle
    overnightGuests: {
        type: String,
        enum: ['Never',
            'Rarely',
            'Occasionally', 'Often'
        ]
    },

    partyHabits: {
        type: String,
        enum: ['Never',
            'Rarely',
            'Occasionally',
            'Weekends',
            'Daily'
        ]
    },

    smoker: {
        type: String,
        enum: ['Yes',
            'No',
            'Outside only'
        ]
    },

    petsFriendly: Boolean,

    // Room Details
    livingRoom: Boolean,
    bedRoom: Boolean,
    kitchen: Boolean,
    bathRoom: Boolean,
    balcony: Boolean,

    // Other Features
    garden: Boolean,
    parkingSpace: Boolean,
    garage: Boolean,
    securityGuard: Boolean,
    backupGenerator: Boolean,
    waterSupply: Boolean,
    internet: Boolean,
    gymnasium: Boolean,
    swimmingPool: Boolean,
    elevator: Boolean,

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    comments: [commentSchema]


}, {
    timestamps: true
});

const RentalModel = mongoose.model('rental', rentalSchema);
module.exports = RentalModel;