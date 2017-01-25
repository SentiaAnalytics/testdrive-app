require('babel-register')
global.atob = string => Buffer.from(b64string, 'base64').toString('utf-8')
