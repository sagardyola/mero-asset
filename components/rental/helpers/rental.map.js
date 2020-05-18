function map_rental_req(rental, rentalDetails) {
    if (rentalDetails.code)
        rental.code = rentalDetails.code;

    if (rentalDetails.price)
        rental.price = rentalDetails.price;

    if (rentalDetails.negotiable)
        rental.negotiable = rentalDetails.negotiable;

    if (rentalDetails.dimension)
        rental.dimension = rentalDetails.dimension;

    if (rentalDetails.location)
        rental.location = rentalDetails.location;

    if (rentalDetails.description)
        rental.description = rentalDetails.description;

    if (rentalDetails.image)
        rental.image = rentalDetails.image;

    if (rentalDetails.itemFor)
        rental.itemFor = rentalDetails.itemFor;

    if (rentalDetails.itemType)
        rental.itemType = rentalDetails.itemType;

    if (rentalDetails.gender)
        rental.gender = rentalDetails.gender;

    if (rentalDetails.maritalStatus)
        rental.maritalStatus = rentalDetails.maritalStatus;

    if (rentalDetails.overnightGuests)
        rental.overnightGuests = rentalDetails.overnightGuests;

    if (rentalDetails.partyHabits)
        rental.partyHabits = rentalDetails.partyHabits;

    if (rentalDetails.smoker)
        rental.smoker = rentalDetails.smoker;

    if (rentalDetails.petsFriendly)
        rental.petsFriendly = rentalDetails.petsFriendly;

    if (rentalDetails.livingRoom)
        rental.livingRoom = rentalDetails.livingRoom;

    if (rentalDetails.bedRoom)
        rental.bedRoom = rentalDetails.bedRoom;

    if (rentalDetails.kitchen)
        rental.kitchen = rentalDetails.kitchen;

    if (rentalDetails.bathRoom)
        rental.bathRoom = rentalDetails.bathRoom;

    if (rentalDetails.balcony)
        rental.balcony = rentalDetails.balcony;

    if (rentalDetails.garden)
        rental.garden = rentalDetails.garden;

    if (rentalDetails.parkingSpace)
        rental.parkingSpace = rentalDetails.parkingSpace;

    if (rentalDetails.garage)
        rental.garage = rentalDetails.garage;

    if (rentalDetails.securityGuard)
        rental.securityGuard = rentalDetails.securityGuard;

    if (rentalDetails.backupGenerator)
        rental.backupGenerator = rentalDetails.backupGenerator;

    if (rentalDetails.waterSupply)
        rental.waterSupply = rentalDetails.waterSupply;

    if (rentalDetails.internet)
        rental.internet = rentalDetails.internet;

    if (rentalDetails.gymnasium)
        rental.gymnasium = rentalDetails.gymnasium;

    if (rentalDetails.swimmingPool)
        rental.swimmingPool = rentalDetails.swimmingPool;

    if (rentalDetails.elevator)
        rental.elevator = rentalDetails.elevator;

    if (rentalDetails.user)
        rental.user = rentalDetails.user;

    return rental;
}

module.exports = map_rental_req;