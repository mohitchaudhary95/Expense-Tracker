const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const cookieparser=require('cookie-parser');
const Connectdb=require('./database/db.js')
const userRoute=require('./routes/user.route.js');
const expenseRoute=require('./routes/expense.route.js');

dotenv.config({});

const app=express();
const PORT=8000;
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

const corsOptions={
    origin:'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/expense",expenseRoute);

app.listen(PORT,()=>{
    Connectdb();
    console.log(`Server is running on http://localhost:${PORT}`);
});