const { config } = require('./wdio-shared-conf');
// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // Saucelabs configurations
        // ID of the application version and API KEY of the application
        testobject_app_id: '',
        testobject_api_key: '',

        // Some default settings
        automationName: 'XCUITest',
        testobject_test_name: 'iOS-Contacts-Sample-App',
        platformName: 'iOS',
        platformVersion: '12',
        // idleTimeout: 180,
        orientation: 'PORTRAIT',
        newCommandTimeout: 180,
        privateDevicesOnly: false,
        enableAnimations: false,
        autoAcceptAlerts: false,
        maxInstances: 1,
        appiumVersion: '1.16.0',
        // deviceName: 'iPhone',
        // testobject_cache_device: true,
        noReset: false,
        fullReset: true,
        // phoneOnly: false,
        // tabletOnly: false,
        // useNewWDA: true,
        // usePrebuiltWDA: true
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
