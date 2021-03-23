const express = require('express');
const {  validationResult } = require('express-validator');
const { body } = require('express-validator/check')
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const User=require('./../models/User');
const Video=require('./../models/Video');

exports.addVideo = async (req , res)=>{
    
        try {
            const video=await Video.create(req.body);
            res.status(200).json({
                success:true , 
                data:video 
            });

        } catch (err) {
            console.log(err.message);
            res.status(500).send(" Server error");
        }
        

}

exports.getVideos = async (req ,res)=>{
    
    try {
        const videos=await Video.find();
        res.status(200).json({
            success:true , 
            data:videos 
        });

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success:false });
    }
    

}

exports.getVideo = async (req ,res)=>{
    
    try {
        const video=await Video.findById(req.params.id);
        res.status(200).json({
            success:true , 
            data:video 
        });

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success:false });
    }
    

}

exports.updateVideo = async (req ,res)=>{
    
    try {
        const video=await Video.findByIdAndUpdate(
            req.params.id, 
            req.body ,{
                new: true,
                runValidators: true
            },

           );
            if (!video){
                res.status(400).json({
                    success:false });
            }
        res.status(200).json({
            success:true , 
            data:video 
        });

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success:false });
    }
    

}

exports.deleteVideo = async (req ,res)=>{
    
    try {
        const video=await Video.findByIdAndDelete(req.params.id);
        if (!video){
            res.status(400).json({
                success:false });
        }
        res.status(200).json({
            success:true , 
            data:{} 
        });

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success:false });
    }
    

}