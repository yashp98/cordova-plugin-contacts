import { DEFAULT_TIMEOUT } from '../constants';
import { waitForElement } from './context';

export function getByTextSelector (val: string): string {
    return 'new UiSelector().text("' + val + '")';
}

export function getByTextContainsSelector (val: string): string {
    return 'new UiSelector().textContains("' + val + '")';
}

export function getByPartialIdSelector (val: string): string {
    return 'new UiSelector().resourceIdMatches(".*' + val + '")';
}

export function getByIdSelector (val: string): string {
    return 'new UiSelector().resourceId("' + val + '")';
}

export function getByClassNameSelector (val: string): string {
    return 'new UiSelector().className("' + val + '")';
}

export function getByClassNameMatchesSelector (val: string): string {
    return 'new UiSelector().classNameMatches("' + val + '")';
}

export function getByPackageNameSelector (val: string): string {
    return 'new UiSelector().packageName("' + val + '")';
}

export function getElemInScrollSelector (selector: string): string {
    return 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(' + selector + ')';
}

export function getElemByText (text: string, throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    let sel = 'android=' + getByTextSelector(text);
    return waitForElement(sel, throwError, waitTime);
}

export function getElemByContainsText (text: string, throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    let sel = 'android=' + getByTextContainsSelector(text);
    return waitForElement(sel, throwError, waitTime);
}

export function getElemByPartialId (id: string, throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    let sel = 'android=' + getByPartialIdSelector(id);
    return waitForElement(sel, throwError, waitTime);
}

export function getElemById (id: string, throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    let sel = 'android=' + getByIdSelector(id);
    return waitForElement(sel, throwError, waitTime);
}

export function getElemByClassNameMatches (className: string, throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    let sel = 'android=' + getByClassNameMatchesSelector(className);
    return waitForElement(sel, throwError, waitTime);
}

export function getElemByClassName (className: string, throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    let sel = 'android=' + getByClassNameSelector(className);
    return waitForElement(sel, throwError, waitTime);
}

export function getElemByPackageName (className: string, throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    let sel = 'android=' + getByPackageNameSelector(className);
    return waitForElement(sel, throwError, waitTime);
}

export function getElemInScroll (selector: string, throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    const sel = 'android=' + getElemInScrollSelector(selector);
    return waitForElement(sel, throwError, waitTime);
}

export function getPermissionAlertAllow (throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    // TODO Review if selector works for other android versions
    const sel = 'android=' + getByPartialIdSelector('permission_allow_button');
    return waitForElement(sel, throwError, waitTime);
}

export function getPermissionAlertDeny (throwError: boolean = true, waitTime: number = DEFAULT_TIMEOUT): WebdriverIO.Element | undefined {
    // TODO Review if selector works for other android versions
    let sel = 'android=' + getByPartialIdSelector('permission_deny_button');
    return waitForElement(sel, throwError, waitTime);
}

