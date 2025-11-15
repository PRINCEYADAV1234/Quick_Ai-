// middle ware to check user id and has premium plan 

import { clerkClient } from "@clerk/express";


export const auth = async(req, res,next) =>{
    try {
         const {userId, has} = req.auth;
         
         if (!userId) {
            return res.status(401).json({success: false, message: 'Unauthorized - User ID not found'});
         }

         let hasPremiumPlan = false;
         if (has && typeof has === 'function') {
            hasPremiumPlan = await has({plan: 'premium'});
         }

         const user = await clerkClient.users.getUser(userId);
         
         if(!hasPremiumPlan && user.privateMetadata?.free_usage !== undefined){
            req.free_usage = user.privateMetadata.free_usage
         } else if (!hasPremiumPlan) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata:{
                    free_usage : 0
                }
            })
            req.free_usage = 0;
         } else {
            req.free_usage = 0;
         }
         req.plan = hasPremiumPlan ? 'premium' : 'free';
         next()
    }
    catch(error){
        console.error('Auth middleware error:', error);
        res.status(500).json({success : false, message:error.message })
    }
}