const { config } = require('./wdio.shared.conf');
// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        deviceName: 'Samsung_Galaxy_S6_sjc_free',
        // The reference to the app
        testobject_app_id: '1',
        // The api key that has a reference to the app-project in the TO cloud
        testobject_api_key: 'BEC83017F9CD42008D3FC8594E741F2D',
        // The name of the test for in the cloud
        testobject_test_name: 'contactsSamsungS6',
        // Some default settings
        // You can find more info in the TO Appium Basic Setup section
        platformName: 'Android',
        platformVersion: '7.0',
        idleTimeout: 180,
        maxInstances: 2,
        testobject_cache_device: true,
        noReset: true,
        orientation: 'PORTRAIT',
        newCommandTimeout: 180,
        phoneOnly: true,
        tabletOnly: false,
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
config.region = 'us';
// and uncomment the below line of code
// config.region = 'us';

// This port was defined in the `wdio.shared.conf.js`
delete config.port;

exports.config = config;
