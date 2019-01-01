const express = require('express');

const Persons = require('../models/person');

var service = {
    getPersonsList: getPersonsList,
    addPerson: addPerson,
    updatePersonDetails: updatePersonDetails,
    deletePerson: deletePerson,
    getPersonDetails: getPersonDetails
}

module.exports = service;

function getPersonsList(req, res, next){
    Persons.getPersonsList((err, persons) => {
        if(err){
            res.json({success: false, msg: "something went wrong",error: err});
        }else{
            if(persons){
                res.json({success: true, data: persons});
            }else{
                res.json({success:false, msg:"No persons in db"});
            }
        }
    })
}

function addPerson(req, res, next){
    let newPerson = new Persons({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        mobileNumber: req.body.mobileNumber
    });
    Persons.addPerson(newPerson, (err, isInserted) => {
        if(err){
            res.json({success: false, msg: "something went wrong",error: err});
        }else{
            if(isInserted){
                res.json({success: true, msg: "Person Details added Successfully"});
            }else{
                res.json({success:false, msg:"Failed to insert person..Please try again"});
            }
        }
    })
}

function getPersonDetails(req, res, next){
    let personId = req.params.id;
    Persons.getPersonDetails(personId, (err, person) => {
        if(err){
            res.json({success: false, msg: "something went wrong",error: err});
        }else{
            if(person){
                res.json({success: true, data: person});
            }else{
                res.json({success:false, msg:"No persons matched with that id"});
            }
        }
    })
}

function updatePersonDetails(req, res, next){
    let updatedInfo = {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        mobileNumber: req.body.mobileNumber
    }

    let personId = req.params.id;
    Persons.updatePersonDetails(personId ,updatedInfo, (err, isUpdated) => {
        if(err){
            res.json({success: false, msg: "something went wrong",error: err});
        }else{
            if(isUpdated){
                res.json({success: true, msg: "Person Details Updated Successfully"});
            }else{
                res.json({success:false, msg:"Failed to Update Details..Please try again"});
            }
        }
    })
}

function deletePerson(req, res, next){
    let personId = req.params.id;
    console.log("coming into delete person and id is: ",personId);
    
    Persons.deletePerson(personId, (err, isDeleted) => {
        if(err){
            res.json({success: false, msg: "something went wrong",error: err});
        }else{
            if(isDeleted){
                res.json({success: true, msg: "Person Deleted Successfully"});
            }else{
                res.json({success:false, msg:"Failed to Delete..Please try again"});
            }
        }
    })
}
