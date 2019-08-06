/*
After each test scenario (or each suite of tests), the test should have a teardown where all contacts created are deleted
However, this one doesn't have teardown, because the plugin can't delete contacts and, with appium, we can't access the native contacts and delete them
*/

// Import constants and classes needed
import 'jasmine';
import { DEFAULT_TIMEOUT, DEFAULT_TIMEOUT_INTERVAL } from '../../constants';
import * as Context from '../../helpers/Context';
import * as ContactsScreen from '../../screenobjects/ContactsScreen';
import PermissionAlert from '../../helpers/PermissionAlert';

describe('[TestSuite, Description("Add Contact and find it")]', () => {

    const allowPermissionIfNeeded = (allow: boolean) => {
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (PermissionAlert.isShown(true, browser)) {
            PermissionAlert.allowPermission(allow, browser);
            PermissionAlert.isShown(false, browser);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
    }

    const waitForScreen = (title: string) => {
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT);
        const screenTitle: string = ContactsScreen.getTitle().getText();
        expect(screenTitle).toContain(title);
    }

    const clickOnDiv = (element: WebdriverIO.Element) => {
        const runInBrowser = function(argument) {             
            argument.click();
        };        
        browser.execute(runInBrowser, element);                
    }

    const backToHomeScreen = () => {
        const menuButton = ContactsScreen.getAppMenu();
        menuButton.waitForDisplayed(DEFAULT_TIMEOUT);
        if(!menuButton.isDisplayedInViewport()){
            menuButton.scrollIntoView();
        }
        menuButton.click();

        const menuList = ContactsScreen.getHomeScreenMenuEntry();
        menuList.waitForDisplayed(DEFAULT_TIMEOUT);
        menuList.click();        

        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);
    }

    // One contact created - it's used for all tests
    beforeAll(() => {

        // Wait for webview to load
        Context.waitForWebViewContextLoaded();

        // Switch the context to WEBVIEW
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // Wait for Home Screen
        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);

    });

    it('[Test, Description("Add contact with all parameters"), Priority="P0"]', () => {

        // Enter Add Contact Screen
        const addContactScreenButton = ContactsScreen.getAddContactScreen();
        addContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactScreenButton.click();

        // Wait for Add Contact Screen
        waitForScreen(ContactsScreen.SCREENTITLES.ADD_CONTACT);

        // Setup of the test
        const setupContactButton = ContactsScreen.SetupContactAllParameters();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();

        // Test: click to create the contact
        const addContactButton = ContactsScreen.getAddContactButton();
        addContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactButton.click();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowPermissionIfNeeded(true);

        // The expected result is for the contact to be created (message text = true)        
        const feedbackMessage = ContactsScreen.getFeedbackMessage();
        feedbackMessage.waitForDisplayed(DEFAULT_TIMEOUT);
        const feedbackMessageText = feedbackMessage.getText();
        expect(feedbackMessageText).toEqual('Success: True');        
        feedbackMessage.click();

        // discover a way to validate the number in the contacts
    });

    it('[Test, Description("Add contact with same number"), Priority="P2"]', () => {

        // Back To Home Screen
        backToHomeScreen();

        // Enter Add Contact Screen
        const addContactScreenButton = ContactsScreen.getAddContactScreen();
        addContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactScreenButton.click();

        // Wait for Add Contact Screen
        waitForScreen(ContactsScreen.SCREENTITLES.ADD_CONTACT);

        // Setup of the test
        const setupContactButton = ContactsScreen.SetupContactDifferentPhone();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();        

        // Test: click to create the contact
        const addContactButton = ContactsScreen.getAddContactButton();
        addContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactButton.click();
    
        // The expected result is for the contact to be created (message text = true)
        const feedbackMessage = ContactsScreen.getFeedbackMessage();
        feedbackMessage.waitForDisplayed(DEFAULT_TIMEOUT);
        const feedbackMessageText = feedbackMessage.getText();
        expect(feedbackMessageText).toEqual('Success: True');        
        feedbackMessage.click();
    });
    
    it('[Test, Description("Find Contact by First Name"), Priority="P0"]', () => {

        // Back To Home Screen
        backToHomeScreen();

        // Enter Find Contact Screen
        const findContactScreenButton = ContactsScreen.getFindContactScreen();
        findContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        findContactScreenButton.click();

        // Go to Find Contact screen
        waitForScreen(ContactsScreen.SCREENTITLES.FIND_CONTACT);

        // Setup of the test
        const setupContactButton = ContactsScreen.SetupFindFirstName();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();

        // Test: click to find the contact
        const findContactButton = ContactsScreen.getFindContactButton();
        findContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        findContactButton.click();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowPermissionIfNeeded(true);

        // Wait for the list to be displayed and click in the first result
        const findContactResultList = ContactsScreen.getFindContactResultList();
        findContactResultList.waitForDisplayed(DEFAULT_TIMEOUT);
        findContactResultList.click();

        // Validate all the information in the contact
        ContactsScreen.getValidateFirstName().waitForDisplayed(DEFAULT_TIMEOUT);
        expect(ContactsScreen.getValidateFirstName().getText()).toEqual('Test app - Name1');
        expect(ContactsScreen.getValidateLastName().getText()).toEqual('Last1');
        expect(ContactsScreen.getValidatePhoneNumber().getText()).toEqual('+351000000000');
        expect(ContactsScreen.getValidateEmail().getText()).toEqual('email1@outsystems.com');
    });

});
