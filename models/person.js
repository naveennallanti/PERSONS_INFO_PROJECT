const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: String, required: true},
    gender: {type: String, required: true},
    mobileNumber: {type: String, required: true}
})

const Persons  = module.exports = mongoose.model("Persons",PersonSchema);

module.exports.getPersonsList = function(callback){
    Persons.find(callback);
}

module.exports.addPerson = function(newPerson, callback){
    newPerson.save(callback);
}

module.exports.getPersonDetails = function(personId, callback){
    var query = {_id: mongoose.Types.ObjectId(personId)};
    Persons.findById(query, callback);
}

module.exports.updatePersonDetails = function(personId, updatedPerson, callback){
    var query = {_id: mongoose.Types.ObjectId(personId)};
    Persons.findOneAndUpdate(
        query, 
        {$set: {
            name: updatedPerson.name,
            age: updatedPerson.age,
            gender: updatedPerson.gender,
            mobileNumber: updatedPerson.mobileNumber
        }},
        callback
    )    
}

module.exports.deletePerson = function(personId, callback){
    var query = {_id: mongoose.Types.ObjectId(personId)};    
    Persons.deleteOne(query, callback)
}