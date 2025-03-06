import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 📌 Registro de Usuario
export const register = async (req, res) => {
  const { documentType, document, password } = req.body;
  console.log("Hola",req.body);

  try {
    const existingUser = await User.findOne({ document });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ documentType: documentType, document: document, password: hashedPassword });
    
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// 📌 Login de Usuario
export const login = async (req, res) => {
  const { document, password } = req.body;

  try {
    const user = await User.findOne({ document });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: 'Login exitoso', token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
