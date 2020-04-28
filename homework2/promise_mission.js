let isMomHappy = true;
let phone = {
    brand: 'Samsung',
    color: 'black'
};

var willIGetNewPhone = new Promise((resolve, reject) => {
    if (isMomHappy) {
        console.log(' ', phone);
        resolve(phone);
    } else {
        setTimeout(() => {
            reject(new Error('mom is not happy'));
        }, 500);
    }
});