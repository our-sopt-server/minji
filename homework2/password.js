const fs = require('fs');
const crypto = require('crypto');

fs.readFile(`${__dirname}/password.txt`, (err, data) => {
    if (err) return console.log(err.message);

    const salt = crypto.randomBytes(32).toString('hex');
    const password = data.toString();

    const encrypt = (salt, password) => {
        crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            const hashed = derivedKey.toString('hex');

            fs.writeFile(`${__dirname}/hashed.txt`, hashed, (err, hashed) => {
                if (err) return console.log(err.message);
            });
        });
    }

    encrypt(salt, password);

});