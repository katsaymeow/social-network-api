const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  deleteFriendFromUser
} = require('../../controllers/user-controller');
 // api/users
router.route('/')
.get(getAllUsers)
.post(createUser);
 // api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)
 // api/users/:friendsId
router.route('/:friendsId')
.put(addFriendToUser)
.delete(deleteFriendFromUser)

module.exports = router;
