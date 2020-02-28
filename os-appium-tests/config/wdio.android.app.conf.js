const { join } = require('path');
const { config } = require('./wdio.shared.conf');
// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The defaults you need to have in your config
        automationName: 'UiAutomator2',
        platformName: 'Android',
        deviceName: 'Android',
        app: join(process.cwd(), 'apps/6.1.apk'), // Path to your native app
        chromedriver: 'C:/Users/iso/Desktop/Chromedriver/chromedriver80.exe',
        noReset: false,
        fullReset: true,
        // appPackage: 'com.outsystemsenterprise.enmobiletst.ContactsSampleApp', // Path to your app package
        // appActivity: 'com.outsystemsenterprise.enmobiletst.ContactsSampleApp.MainActivity', // Path to your activity
    },
];

exports.config = config;
