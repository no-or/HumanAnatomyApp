const aws = require('aws-sdk');
const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.AWS_USER_SECRET_KEY,
    accessKeyId: process.env.AWS_USER_ACCESS_KEY_ID,
    region: 'ca-central-1'
});

const params = {
    Bucket: 'anatomy-bucket',
    Key: '',
};

const remove = function (params){
    s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
};