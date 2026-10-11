// controllers/userController.js
const { estNonVide, estEmailValide } = require('../utils/validators');
let users = [
  { id: 1, name: 'Yakine', email: 'yakine@example.com', role: 'admin' },
  { id: 2, name: 'Aya', email: 'aya@example.com', role: 'user' }
];
let prochainId = 3;

// 1. Tous les utilisateurs (filtre optionnel ?role=...)
const getAllUsers = (req, res) => {
  const { role } = req.query;
  let resultat = users;
  if (role) {
    resultat = users.filter(u => u.role === role);
  }
  res.status(200).json({ total: resultat.length, users: resultat });
};

// 2. Un utilisateur par ID
const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  res.status(200).json(user);
};

// 3. Créer un utilisateur
// 3. Créer un utilisateur
const createUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!estNonVide(name)) {
    return res.status(400).json({ error: 'Le nom est obligatoire et ne doit pas être vide' });
  }
  if (!estEmailValide(email)) {
    return res.status(400).json({ error: "L'email est invalide (il doit contenir @ et .)" });
  }

  const nouvelUser = { id: prochainId++, name: name.trim(), email, role: role || 'user' };
  users.push(nouvelUser);
  res.status(201).json({ message: 'Utilisateur créé', user: nouvelUser });
};

// 4. Supprimer un utilisateur
const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const existe = users.some(u => u.id === id);
  if (!existe) {
    return res.status(404).json({ error: `Impossible de supprimer : utilisateur ${id} introuvable` });
  }
  users = users.filter(u => u.id !== id);
  res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès` });
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser };