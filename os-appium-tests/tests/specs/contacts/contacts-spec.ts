// Import constants and classes needed
import 'jasmine';
import { DEFAULT_TIMEOUT, DEFAULT_TIMEOUT_INTERVAL } from '../../constants';
import * as Context from '../../helpers/context';
import PermissionAlert from '../../helpers/permission-alert';
import nativeContactList, * as ContactsScreen from '../../screen-objects/contacts-screen';

describe('[TestSuite, Description("Add Contact and find it")]', () => {

    let originalTimeOut;

    beforeAll(() => {

        // change the default timeout of Jasmine
        originalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;

        // Wait for webview to load
        Context.waitForNativeContextLoaded();
        Context.waitForWebViewContextLoaded();

        // Switch the context to WEBVIEW
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // Wait for Home Screen
        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);

        // If the app has inspector, click to allow notifications
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        if (browser.isIOS) {
            browser.pause(3000);
            allowPermissionIfNeeded(true);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
    });

    it('[Test, Description("3. Add contact with all parameters and Remove contact"), Priority="P0", ID="CO0005"]', () => {
        backToHomeScreen();

        // Add contact
        addContact();

        // In case an alert message appears to allow permissions to the phone, it clicks ALLOW
        allowOkPermissionIfNeeded(true);

        // Expect a success message
        const successAddCard = ContactsScreen.getSuccessCard();
        successAddCard.waitForDisplayed(DEFAULT_TIMEOUT);

        const successMessageAddText = ContactsScreen.getSuccessMessage().getText();
        expect(successMessageAddText).toEqual('Contact successfully added.');

        // Go back to home screen
        backToHomeScreen();

        // Remove contact
        removeContact(true);

        const successMessageRemove = ContactsScreen.getSuccessMessage();
        const successMessageRemoveText = ContactsScreen.getSuccessMessage().getText();
        successMessageRemove.waitForDisplayed(DEFAULT_TIMEOUT);

        expect(successMessageRemoveText).toEqual('Removed successfully!');
    });

    it('[Test, Description("4. Find Contact"), Priority="P0", ID="CO0012"]', () => {
        // Back To Home Screen
        backToHomeScreen();

        // Add contact
        addContact();

        allowOkPermissionIfNeeded(true);

        const successAddCard = ContactsScreen.getSuccessCard();
        successAddCard.waitForDisplayed(DEFAULT_TIMEOUT);

        const successMessageAddText = ContactsScreen.getSuccessMessage().getText();
        expect(successMessageAddText).toEqual('Contact successfully added.');

        backToHomeScreen();

        // Enter Find Contact Screen
        const findContactScreenButton = ContactsScreen.getFindContactScreen();
        findContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        findContactScreenButton.click();

        waitForScreen(ContactsScreen.SCREENTITLES.FIND_CONTACT);

        // Setup the test
        const setupContactButton = ContactsScreen.SetupFindFirstName();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();

        // Test: click to find the contact
        const findContactButton = ContactsScreen.getFindContactButton();
        findContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        findContactButton.click();

        allowOkPermissionIfNeeded(true);

        // Wait for the list to be displayed and click in the first result
        const findContactResultList = ContactsScreen.getFindContactResultList();
        findContactResultList.waitForDisplayed(DEFAULT_TIMEOUT);
        findContactResultList.click();

        // Validate all the information in the contact
        waitForScreen(ContactsScreen.SCREENTITLES.DETAIL_SCREEN);

        const findFirstName = ContactsScreen.getValidateFirstName();
        const findLastName = ContactsScreen.getValidateLastName();
        const findPhone = ContactsScreen.getValidatePhoneNumber();
        const findEmail = ContactsScreen.getValidateEmail();

        findFirstName.waitForDisplayed(DEFAULT_TIMEOUT);
        expect(findFirstName.getText()).toEqual('Test app - Name1');
        expect(findLastName.getText()).toEqual('Last1');
        expect(findPhone.getText()).toEqual('+351000000000');
        expect(findEmail.getText()).toEqual('email1@outsystems.com');

        // Teardown: remove contact created
        removeContact(false);

        const successCardRemove = ContactsScreen.getSuccessCard();
        const successCardRemoveText = ContactsScreen.getSuccessCard().getText();
        successCardRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        expect(successCardRemoveText).toContain('Removed successfully!');

        // Go back to Find Contact screen
        const backButton = ContactsScreen.getBackButton();
        backButton.waitForDisplayed(DEFAULT_TIMEOUT);
        backButton.click();
        waitForScreen(ContactsScreen.SCREENTITLES.FIND_CONTACT);

    });

    it('[Test, Description("5. Pick Contact"), Priority="P0", ID="CO0017"]', () => {
        // Back To Home Screen
        backToHomeScreen();

        // Add contact
        addContact();

        allowOkPermissionIfNeeded(true);

        const successAddCard = ContactsScreen.getSuccessCard();
        successAddCard.waitForDisplayed(DEFAULT_TIMEOUT);

        const successMessageAddText = ContactsScreen.getSuccessMessage().getText();
        expect(successMessageAddText).toEqual('Contact successfully added.');

        backToHomeScreen();

        // Enter Pick Contact Screen
        const pickContactScreenButton = ContactsScreen.getPickContactScreen();
        pickContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        pickContactScreenButton.click();

        waitForScreen(ContactsScreen.SCREENTITLES.PICK_CONTACT);

        // Test: click to pick the contact
        const pickContactButton = ContactsScreen.getPickContactButton();
        pickContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        pickContactButton.click();

        allowOkPermissionIfNeeded(true);

        // Verify if the native contact list appears
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        nativeContactList.findNativeContactListWaitForDisplayed();
        expect(nativeContactList.findNativeContactListIsDisplayed());

        // Find the contact created and click on it
        nativeContactList.clickNativeContact();
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        // Validate all the information in the contact
        waitForScreen(ContactsScreen.SCREENTITLES.DETAIL_SCREEN);

        const findFirstName = ContactsScreen.getValidateFirstName();
        const findLastName = ContactsScreen.getValidateLastName();
        const findPhone = ContactsScreen.getValidatePhoneNumber();
        const findEmail = ContactsScreen.getValidateEmail();

        findFirstName.waitForDisplayed(DEFAULT_TIMEOUT);
        expect(findFirstName.getText()).toEqual('Test app - Name1');
        expect(findLastName.getText()).toEqual('Last1');
        expect(findPhone.getText()).toEqual('+351000000000');
        expect(findEmail.getText()).toEqual('email1@outsystems.com');

        // Teardown: remove the contact created
        removeContact(false);

        const successCardRemove = ContactsScreen.getSuccessCard();
        const successCardRemoveText = ContactsScreen.getSuccessCard().getText();
        successCardRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        expect(successCardRemoveText).toContain('Removed successfully!');

        // Go back to Pick Contact screen
        const backButton = ContactsScreen.getBackButton();
        backButton.waitForDisplayed(DEFAULT_TIMEOUT);
        backButton.click();
        waitForScreen(ContactsScreen.SCREENTITLES.PICK_CONTACT);
    });

    afterAll(() => {
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);
        browser.closeApp();

        // Change Jasmine timeout to the default
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeOut;
    });

    /**
     * UTILS
     */

    const allowPermissionIfNeeded = (allow: boolean) => {
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (PermissionAlert.isShown()) {
            PermissionAlert.clickAllowPermission(allow);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
    };

    const allowOkPermissionIfNeeded = (allow: boolean) => {
        Context.switchToContext(Context.CONTEXT_REF.NATIVE);

        if (PermissionAlert.isShown()) {
            PermissionAlert.clickOkPermission(allow);
        }
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);
    };

    const addContact = () => {
        // Starting from Homepage, enter Contact Screen
        const addContactScreenButton = ContactsScreen.getAddContactScreen();
        addContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactScreenButton.click();

        // Wait for Add Contact Screen
        waitForScreen(ContactsScreen.SCREENTITLES.ADD_CONTACT);

        // Fill the contact parameters
        const setupContactButton = ContactsScreen.SetupContactAllParameters();
        setupContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        setupContactButton.click();

        // Click to create the contact
        const addContactButton = ContactsScreen.getAddContactButton();
        addContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        addContactButton.click();
    };

    const removeContact = (Homepage: boolean) => {

        // Homepage = true, if the user is in the Homepage and wants to go to Remove Contact Screen
        // Homepage = false, if the user is in Contact Details Screen, where the contact is already selected

        if (Homepage) {

        // Enter remove contact screen
        const removeContactScreenButton = ContactsScreen.getRemoveContactScreen();
        removeContactScreenButton.waitForDisplayed(DEFAULT_TIMEOUT);
        removeContactScreenButton.click();

        waitForScreen(ContactsScreen.SCREENTITLES.REMOVE_SCREEN);

        // Find contact to remove
        const setupFindContactToRemove = ContactsScreen.setupNameRemove();
        setupFindContactToRemove.waitForDisplayed(DEFAULT_TIMEOUT);
        setupFindContactToRemove.click();

        const findContactButton = ContactsScreen.getFindContactButton();
        findContactButton.waitForDisplayed(DEFAULT_TIMEOUT);
        findContactButton.click();

        // Click in the contact, on the finding list
        const contactListItem = ContactsScreen.getContactList();
        const contactListItemText = ContactsScreen.getContactList().getText();
        contactListItem.waitForDisplayed(DEFAULT_TIMEOUT);
        expect(contactListItemText).toContain('Test app - Name1 Last1');
        contactListItem.click();

        // Remove contact
        const removeButton = ContactsScreen.getRemoveContactButton();
        removeButton.waitForDisplayed(DEFAULT_TIMEOUT);
        removeButton.click();

        } else {
            const removeButton = ContactsScreen.getRemoveContactButton();
            removeButton.waitForDisplayed(DEFAULT_TIMEOUT);
            removeButton.click();
        }

    };

    const waitForScreen = (title: string) => {
        ContactsScreen.getTitle().waitForDisplayed(DEFAULT_TIMEOUT);
        const screenTitle: string = ContactsScreen.getTitle().getText();
        expect(screenTitle).toContain(title);
    };

    const backPreviousScreen = () => {
        const backButton = ContactsScreen.getBackButton();
        backButton.waitForDisplayed(DEFAULT_TIMEOUT);
        backButton.click();
    };

    const backToHomeScreen = () => {
        Context.switchToContext(Context.CONTEXT_REF.WEBVIEW);

        const menuButton = ContactsScreen.getAppMenu();
        menuButton.waitForDisplayed(DEFAULT_TIMEOUT);
        menuButton.click();

        const menuList = ContactsScreen.getHomeScreenMenuEntry();
        menuList.waitForDisplayed(DEFAULT_TIMEOUT);
        menuList.click();

        waitForScreen(ContactsScreen.SCREENTITLES.HOME_SCREEN);
    };
});

// Galaxy A7 & Meizo 6th
