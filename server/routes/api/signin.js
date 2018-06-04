const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      firstName,
      lastName,
      password
    } = body;

    let {
      email
    } = body;
    
    if (!firstName) {
      return res.send({
        success: false,
        message: 'Error: First name cannot be blank.'
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: 'Error: last name cannot be blank.'
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: email name cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: password name cannot be blank.'
      });
    }

    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {

        return res.send({
          success: false,
          message: 'Error: Server error'
        });

      } else if (previousUsers.length > 0) {
        return res.send({
          success: true,
          message: 'Error: Account Already register'
        });
      }

      //Save new User

      const newUser = new User();

      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Now you can login to your account!'
        })
      })
    });
    
  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      firstName,
      lastName,
      password
    } = body;
    let {
      email
    } = body;

    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: invalid'
        })
      }

      //Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }

        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        })
      })


    });
  });

  app.get('/api/account/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: 'Error: Invalid'
          });
        } else {
          return res.send({
            success: true,
            message: 'Good'
          })
        }
    })
  });

  app.get('/api/account/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    },{ $set: {
      isDeleted: true
        }
      } , (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
          success: true,
          message: 'Good'
        })

    })
  })


};



