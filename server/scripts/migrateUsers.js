const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

async function migrateUsers() {
  try {
    // Lấy tất cả users
    const users = await User.find({});
    console.log(`Found ${users.length} users to migrate`);

    for (const user of users) {
      // Kiểm tra xem password đã được hash chưa
      if (!user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
        // Hash password nếu chưa được hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        
        // Cập nhật user với password đã hash
        await User.updateOne(
          { _id: user._id },
          { $set: { password: hashedPassword } }
        );
        
        console.log(`Migrated user: ${user.email}`);
      } else {
        console.log(`User ${user.email} already has hashed password`);
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateUsers(); 