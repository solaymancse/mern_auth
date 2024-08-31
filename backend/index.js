const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routeAuth = require('./routes/AuthRoutes');
const roleRoute = require('./routes/RoleRoute');
const userRoute = require('./routes/UserRoute');
const User = require('./models/User');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Role routes
app.use('/api/roles', roleRoute);
app.use('/api/auth', routeAuth);
app.use('/api/users', userRoute);

const port = 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

const createSuperAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ email: 'superadmin@gmail.com' });
        if (!existingAdmin) {
            // Hash the password before saving
            const plainPassword = '123456';
            const hashedPassword = await bcrypt.hash(plainPassword, 10);
            
            const admin = new User({
                email: 'superadmin@gmail.com',
                password: hashedPassword,
                role: 'super admin'
            });
            await admin.save();
            console.log('Super admin created');
        } else {
            console.log('Super admin already exists');
        }
    } catch (err) {
        console.error('Error creating super admin:', err);
    }
};

createSuperAdmin();

