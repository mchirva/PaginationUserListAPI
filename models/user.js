var UserSchema = {
    users: {
        firstName: {type: 'string', nullable: false, primary: true},
        lastName: {type: 'string', maxlength: 50, nullable: true},
        email: {type: 'string', maxlength: 100, nullable: false},
        gender: {type: 'string', maxlength: 20, nullable: false},
        ipAddress: {type: 'string', maxlength: 20, nullable: true}
    }
};

module.exports = UserSchema
