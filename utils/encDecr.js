const bcrypt = require('bcrypt');

module.exports = {
    encrypt: (password) => {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    decrypt: (encryptPassword, hash) => {
        const bcryptPassword = bcrypt.compareSync(encryptPassword, hash);
        return bcryptPassword;
    }
}