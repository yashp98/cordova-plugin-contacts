import * as AndroidUtils from '../helpers/AndroidUtils';
import * as Context from '../helpers/Context';
import * as IosUtils from '../helpers/IOSUtils';

// APPLICATION DEFAULTS

export function getAppMenu(): WebdriverIO.Element {
    return Context.getElemBySelector('#b2-Menu');
}

export function getHomeScreenMenuEntry(): WebdriverIO.Element {
    return Context.getElemBySelector('#b1-b1-HomeScreen');
}

export function getBackButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#b2-Back');
}

// SETUP BUTTONS - ADD CONTACT

export function SetupContactAllParameters(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name1');
}

export function SetupContactDifferentPhone(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name1_changephone');
}

export function SetupContactDifferentEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name1_changeemail');
}

export function SetupContactDifferentPhoneEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name1_changephoneandemail');
}

export function SetupContactNoPhone(): WebdriverIO.Element {
    return Context.getElemBySelector('#Name2_nophone');
}

export function SetupContactOnlyPhone(): WebdriverIO.Element {
    return Context.getElemBySelector('#onlyphone');
}

export function SetupContactStrangeFormat(): WebdriverIO.Element {
    return Context.getElemBySelector('#strangeformat');
}

// SETUP BUTTONS - FIND CONTACT

export function SetupFindFirstName(): WebdriverIO.Element {
    return Context.getElemBySelector('#testapp_name1');
}

export function SetupFindLastName(): WebdriverIO.Element {
    return Context.getElemBySelector('#last1');
}

export function SetupFindCountryDigit(): WebdriverIO.Element {
    return Context.getElemBySelector('#phonenumber');
}

export function SetupFindEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#email3_outsystems_com');
}

export function SetupFindNumber1(): WebdriverIO.Element {
    return Context.getElemBySelector('#number1');
}

export function SetupFindContactCreatedOnPhone(): WebdriverIO.Element {
    return Context.getElemBySelector('#testapp_name3');
}

export function SetupFindIncompleteFirstName(): WebdriverIO.Element {
    return Context.getElemBySelector('#name2');
}

export function SetupFindIncompleteEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#email3');
}

export function SetupNonExistentContact(): WebdriverIO.Element {
    return Context.getElemBySelector('#nonexistentcontact');
}

export function getSwitchMultipleContacts(): WebdriverIO.Element {
    return Context.getElemBySelector('#switchMultipleContacts');
}

export function setupNameRemove(): WebdriverIO.Element {
    return Context.getElemBySelector('#findName1Button');
}

export function getContactList(): WebdriverIO.Element {
    return Context.getElemBySelector('#l1-0-ListItem1');
}

// SCREEN ELEMENTS

export function getTitle(): WebdriverIO.Element {
    return Context.getElemBySelector('#b1-Title');
}

export function getAddContactScreen(): WebdriverIO.Element {
    return Context.getElemBySelector('#addContactScreen');
}

export function getAddContactButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#addContactButton');
}

export function getFeedbackMessage(): WebdriverIO.Element {
    return Context.getElemBySelector('.feedback-message-text');
}

export function getFindContactScreen(): WebdriverIO.Element {
    return Context.getElemBySelector('#findContactScreen');
}

export function getFindContactButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#findContactButton');
}

export function getFindContactResultList(): WebdriverIO.Element {
    return Context.getElemBySelector('#l1-0-ListItem1');
}

export function getPickContactScreen(): WebdriverIO.Element {
    return Context.getElemBySelector('#pickContactScreen');
}

export function getPickContactButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#pickContactButton');
}

export function getRemoveContactScreen(): WebdriverIO.Element {
    return Context.getElemBySelector('#removeContactScreen');
}

export function getRemoveContactButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#removeContactButton');
}

// CONTACTS VALIDATION

export function getValidateFirstName(): WebdriverIO.Element {
    return Context.getElemBySelector('#firstname');
}

export function getValidateLastName(): WebdriverIO.Element {
    return Context.getElemBySelector('#lastName');
}

export function getValidateDisplayedName(): WebdriverIO.Element {
    return Context.getElemBySelector('#displayName');
}

export function getValidatePhoneNumber(): WebdriverIO.Element {
    return Context.getElemBySelector('#l1-0-phoneNumber');
}

export function getValidatePhoneNumber2(): WebdriverIO.Element {
    return Context.getElemBySelector('#l1-1-phoneNumber');
}

export function getValidateEmail(): WebdriverIO.Element {
    return Context.getElemBySelector('#l2-0-Email');
}

export function getValidateEmail2(): WebdriverIO.Element {
    return Context.getElemBySelector('#l2-1-Email');
}

export function getValidateCompanyName(): WebdriverIO.Element {
    return Context.getElemBySelector('#l5-0-companyName');
}

export function getValidateCompanyDepartment(): WebdriverIO.Element {
    return Context.getElemBySelector('#l5-0-companyDepartment');
}

export function getValidateJobTitle(): WebdriverIO.Element {
    return Context.getElemBySelector('#l5-0-jobTitle');
}

export function getValidateAddress(): WebdriverIO.Element {
    return Context.getElemBySelector('#l3-0-address');
}

export function getValidateBirthday(): WebdriverIO.Element {
    return Context.getElemBySelector('#birthday');
}

export function getValidateNotes(): WebdriverIO.Element {
    return Context.getElemBySelector('#note');
}

// Result Cards

export function getSuccessCard(): WebdriverIO.Element {
    return Context.getElemBySelector('#successCard');
}

export function getCloseSuccessCardButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#closeSuccessCard');
}

export function getSuccessMessage(): WebdriverIO.Element {
    return Context.getElemBySelector('#successMessage');
}

export function getFailureCard(): WebdriverIO.Element {
    return Context.getElemBySelector('#failureCard');
}

export function getCloseFailureCardButton(): WebdriverIO.Element {
    return Context.getElemBySelector('#closeFailureCard');
}

export function getErrorCode(): WebdriverIO.Element {
    return Context.getElemBySelector('#errorCode');
}

export function getErrorMessage(): WebdriverIO.Element {
    return Context.getElemBySelector('#errorMessage');
}

export function getMessagePopup(): WebdriverIO.Element {
    return Context.getElemBySelector('#feedbackMessageContainer');
}

// BOTTOM BAR

export function getAddContactBottomMenu(): WebdriverIO.Element {
    return Context.getElemBySelector('#b16-AddContactBottomBar');
}

export function getFindContactBottomMenu(): WebdriverIO.Element {
    return Context.getElemBySelector('#b16-FindContactBottomBar');
}

export function getPickContactBottomMenu(): WebdriverIO.Element {
    return Context.getElemBySelector('#b16-PickContactBottomBar');
}

export function getRemoveContactBottomMenu(): WebdriverIO.Element {
    return Context.getElemBySelector('#b16-RemoveContactBottomBar');
}

export function getHomescreenBottomMenu(): WebdriverIO.Element {
    return Context.getElemBySelector('#b16-HomescreenBottomBar');
}

// SCREEN NAMES

export const SCREENTITLES = {
    HOME_SCREEN: 'Contacts plugin',
    // tslint:disable-next-line: object-literal-sort-keys
    ADD_CONTACT: 'Add',
    FIND_CONTACT: 'Find',
    PICK_CONTACT: 'Pick',
    DETAIL_SCREEN: 'Contact details',
    REMOVE_SCREEN: 'Remove Contact',
};

// PICK CONTACTS: NATIVE LIST OF CONTACTS

const SELECTORS = {
    ANDROID: {
        ContactItem: 'Test app - Name1',
        ListContacts : 'id/toolbar',
        SearchInputBox : 'id/search_view',
        SearchIcon : 'id/menu_search',
    },

    IOS: {
        ContactItem: 'Test app - Name1 Last1',
        ListContacts: 'Contacts',
        // LABEL: Contacts (header)
        // text: Test app - Name1 Last1
        PERMISSION_ALLOW_BUTTON: '*//XCUIElementTypeButton[@name="OK"]',
        PERMISSION_DENY_BUTTON: '*//XCUIElementTypeButton[@name="Don’t Allow"]',
        SearchInputBox : '',
        SearchIcon : '',
    },
};

class NativeContactList {

 public static findNativeContactList(driver): WebdriverIO.Element {
     const listSelector = driver.isAndroid ? SELECTORS.ANDROID.ListContacts : SELECTORS.IOS.ListContacts;
     return driver.isAndroid ?
         AndroidUtils.getElemByPartialId(listSelector, false) :
         IosUtils.getElemByLabel(listSelector, false);
 }

 public static nativeContact(driver): WebdriverIO.Element {
    const listSelector = driver.isAndroid ? SELECTORS.ANDROID.ContactItem : SELECTORS.IOS.ContactItem;
    return driver.isAndroid ?
        AndroidUtils.getElemByContainsText(listSelector, false) :
        IosUtils.getElemByLabel(listSelector, false);
}

 public static clickNativeContact(driver): void {
    this.nativeContact(driver).click();
}

public static searchIcon(driver): WebdriverIO.Element {
    const listSelector = driver.isAndroid ? SELECTORS.ANDROID.SearchIcon : SELECTORS.IOS.SearchIcon;
    return driver.isAndroid ?
        AndroidUtils.getElemByPartialId(listSelector, false) :
        IosUtils.getElemByLabel(listSelector, false);
}

public static searchInputBox(driver): WebdriverIO.Element {
    const listSelector = driver.isAndroid ? SELECTORS.ANDROID.SearchInputBox : SELECTORS.IOS.SearchInputBox;
    return driver.isAndroid ?
        AndroidUtils.getElemByPartialId(listSelector, false) :
        IosUtils.getElemByLabel(listSelector, false);
}

public static writeSearchIcon(driver): void {
    // this.searchIcon(driver).waitForDisplayed();
    this.searchIcon(driver).click();
    this.searchInputBox(driver).click();
    this.searchInputBox(driver).setValue('Test app-');
}

 public static text(driver): string {
    return driver.getAlertText();
}
}
export default NativeContactList;
