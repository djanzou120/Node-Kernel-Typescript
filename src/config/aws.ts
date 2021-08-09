import config from './config';
const AWS  = require("aws-sdk");




// Basic aws configuration

const AWS_CONFIG = {
    secretAccessKey: config.S3_ACCESS_SECRET,
    accessKeyId: config.S3_ACCESS_KEY,
    region: config.S3_REGION,
}

AWS.config.update({
    ...AWS_CONFIG
})


// SNS instance
export const SNS = new AWS.SNS({apiVersion: '2010-03-31'});


// S3 instance

export const S3 = new AWS.S3({})

export const AWS_S3_CONFIG = {
    s3: S3,
    bucket: config.S3_BUCKET,
    // Set public read permissions
    acl: 'public-read',
    // Auto detect content type
}