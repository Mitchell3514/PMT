# Testing guide

In order to assure compatability across different password managers, timely testing is necessary. To keep testing difficulty at a minimum, this document specifies how testing should be conducted and what should be noted down in a test report.

If you are testing multiple password managers, or versions of a password manager, you can simply add multiple reports to an issue.

## Preparation
Any non-browser password manager should be tested both in a Chromium and Firefox environment. Chromium browsers allowed are Google Chrome, Edge Chromium and the default Chromium. Partial testing (only one browser) is also possible.

### Browser preparation
1. Make sure your browser is up-to-date.
2. If you aren't testing the default browser's password manager, disable it.
3. Disable any other password manager plugins.
4. Make sure no other password manager programs are running on the computer.

### Installation
If you are testing a default browser's password manager, skip to [testing](#testing).

1. If you haven't already, install the password manager (plugin).
2. You can either login with your own or using a testing account.

## Testing
You are now ready to start testing the password manager on [password manager sandbox][pws].

### Things to note down
In all cases, note down the page on which it happened, the input type and what went wrong.
Input types are: `username`, `current password`, `new password`.

- A field not being recognized. (eg. the password manager's icon doesn't get added)
- A field wrongly being recognized. (eg. a `new password` field being filled in with the `current password`)
- A field not getting autofilled. (eg. it is recognized, but autofilling doesn't work)
- A button not being pressed (eg. a password manager usually clicks login, but doesn't)
- A wrong button being pressed (eg. password manager pseudo-clicks on 'login instead' instead of 'register')
- Anything else that differentiates from the default behaviour of the password manager.

For non-browser password managers: anything going wrong is assumed to be the case on both browser types, if not, explicitly mention so.

### Testing steps
For all steps: if a field is not recognized, at least not correctly, then fill it in manually.

1. `Register` an account using the password manager's password generation and save it.
2. With that account, `login` using autofill.
3. Then `change` the password using autofill and the password manager's generation feature.
4. Finally, `reset` the password, again using both autofill and generation.
5. Clear any relevant saved data before testing on another browser.


## The report
When you are done testing everything, make a new issue detailing your findings according to the [example][template].
Don't forget to add the compatibility report label.

[template]: compatibility-template.md
[pws]: https://login.mitchells.work