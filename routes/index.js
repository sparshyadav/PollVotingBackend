import express from 'express';
import userRoutes from './user.routes.js'
import pollRoutes from './poll.routes.js'

const router=express.Router();

const routes=()=>{
    router.get('/', (req, res)=>{
        res.json("WELCOME");
    });
    router.use('/users', userRoutes);   
    router.use('/poll', pollRoutes);   

    return router
}

export default routes 