const path = require('path');
const rootPath = __dirname;


module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
       url:"mongodb://127.0.0.1:27017/shop",
        options: {
           useUnifiedTopology: true,
        }
    },
   google: {
     clientId: process.env.GOOGLE_CLIENT_ID,
     googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
};