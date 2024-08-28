const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const routeAuth = require('./routes/AuthRoutes');
const userRoute = require('./routes/UserRoute');
const User = require('./models/User');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',routeAuth );
app.use('/api/users', userRoute );

const port = 5000;

mongoose.connect(process.env.MONGO_URI, {

})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));
app.listen(port, () => {
    console.log('app is running on port')
})
const createSuperAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ email: 'superadmin@example.com' });
        if (!existingAdmin) {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash('password', 10);

            const admin = new User({
                email: 'superadmin@example.com',
                password: hashedPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('Super admin created');
        }
    } catch (err) {
        console.error(err);
    }
};

createSuperAdmin();

createSuperAdmin()