import Joi from 'joi';
import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';
import{v4 as uuid} from 'uuid';

const schema = Joi.object({
  name: Joi.string().required(),
  facebookId: Joi.string().required(),
  phone_number: Joi.string().optional(),
});

export const facebookRoute = {
  path: '/api/auth/facebook',
  method: 'post',
  handler: async (req, res) => {
    try {
      const { name, facebookId,emailVerified, phone_number } = req.body;
      console.log(name,facebookId);
      // Validate the input data
      const { error } = schema.validate({  name, facebookId, phone_number });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const db = getDbConnection('crm');
      let user = await db.collection('users').findOne({ name });

      if (user) {
        // Update phone number if necessary
        if (phone_number && user.phone_number !== phone_number) {
          user.phone_number = phone_number;
          await db.collection('users').updateOne({ _id: user._id }, { $set: { phone_number } });
        }

        return res.status(409).json({ message: "User already exists" });
      }
      const verificationString = uuid();

      const startingInfo = {
          field: '',
          profileImage: '',
          phone: '',
          address: '',
          skills: '',
          bio: '',
      };

      // If user doesn't exist, create a new user
      user = {
        name,
        facebookId,
        phone_number,
        info: startingInfo,
        verificationString,
        isVerified:emailVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await db.collection('users').insertOne(user);

      if (!result.acknowledged) {
        return res.status(500).json({ message: "Failed to create user" });
      }

      const token = jwt.sign(
        { id: result.insertedId, name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(201).json({ message: "Facebook login successful", token });
    } catch (error) {
      console.error("Error in Facebook login route:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
