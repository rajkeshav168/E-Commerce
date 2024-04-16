import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async(req,res)=>{
    try {
        const{name,email,password,phone,address}=req.body

        // validation
        if(!name){
            res.send({error:'Name is required'})
        }
        if(!email){
            res.send({error:'email is required'})
        }
        if(!password){
            res.send({error:'password is required'})
        }
        if(!phone){
            res.send({error:'phone is required'})
        }
        if(!address){
            res.send({error:'address is required'})
        }
        // check user
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(500).send({
                sucess:true,
                message:'user already exist,please login'
            })
        }
        // hash password
        const hashedPassword = await hashPassword(password)

        // save user
        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()
        res.status(201).send({
            sucess:true,
            message:'user registered sucessfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.send(500).send({
            sucess:false,
            message:'error in registration',
            error
        })
    }

};


// post login

export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        // validation

        if(!email || !password){
            res.status(404).send({
                sucess:false,
                message:"invalid email or password"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            res.status(404).send({
                sucess:false,
                message:"emailis not registered/user not exist",
            })
        }

        const match = await comparePassword(password, user.password);

        if(!match){
            res.status(200).send({
                sucess:false,
                message:"invalid password"
            });
        }

        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
        res.status(200).send({
            sucess:true,
            message:"login sucessfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });
        
    } catch (error) {
        console.log(error)
        res.status(501).send({
            sucess:false,
            message:"error in login",
            error
        })
    }
};

// test controller
export const testController = (req,res)=>{
    res.send('protected Route');
};