const { config } = require('./wdio.shared.conf');
// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The reference to the app
        testobject_app_id: '4',
        // The api key that has a reference to the app-project in the TO cloud
        testobject_api_key: 'AED746D07F25481CBDAF1398DA162081',
        // Some default settings
        platformName: 'Android',
        platformVersion: '10',
        idleTimeout: 180,
        maxInstances: 2,
        testobject_test_name: 'Contacts-Sample-App',
        // deviceName: 'Google Pixel 4',
        // testobject_cache_device: true,
        // noReset: true,
        orientation: 'PORTRAIT',
        newCommandTimeout: 180,
        // phoneOnly: false,
        // tabletOnly: false,
        privateDevicesOnly: false,
        enableAnimations: false,
        autoAcceptAlerts: true
    },
];

// =========================
// Sauce RDC specific config
// =========================
// The new version of WebdriverIO will:
// - automatically update the job status in the RDC cloud
// - automatically default to the US RDC cloud
config.services = [ 'sauce' ];
// If you need to connect to the US RDC cloud comment the below line of code
config.region = 'eu';
// and uncomment the below line of code
// config.region = 'us';
config.protocol = 'https';
config.host = 'appium.testobject.com';
config.port = 443;
config.path = '/wd/hub';

// This port was defined in the `wdio.shared.conf.js` for appium
// delete config.port;

exports.config = config;
