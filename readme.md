![version] ![UR-status]
# Password Manager Test

PMT aims at mocking a modern site on which you require an account. 
That way, people can test their password managers in an easy, clean and secure manner.

For a list of currently supported (browser) password managers, see [this][compatibility] issue.

## Values
- Ease of use :: the design should guide users and not be an obstacle.
- Privacy :: any data should only be stored locally with transparancy.
- Simplicity :: stick to the main goal of teaching people how to use a pw manager. 

## Goals
- [ ] Translations  
Currently the site is only in Dutch, as that is what I will be using it for personally. But it would be nice if the site was available to anyone, and adding translations for the core features isn't that difficult.
- [ ] Interactive guides  
A more difficult project will be to add interactive pop-ups that guide a user on how to use the password manager of their choice. Even though it would be impossible to include all of them, it may be possible to dynamically generate instructions based on inserting the small differences per manager.

## Contributing
For details on contributing code view the [contribution file][contributing.md]. Or help keeping compatibility information up-to-date by reading the [testing information][compatibility-testing.md] first.

## Hosting
The website is currently hosted on my website at [login.mitchells.work][login-site].

Copyright © 2021 Mitchell Rademaker  


<!-- issues -->
[compatibility]: https://github.com/Mitchell3514/PMT/issues/7
[contributing.md]: docs/contributing.md
[compatibility-testing.md]: docs/compatibility-testing.md

<!-- shields(.io) -->
[version]: https://img.shields.io/badge/version-v0.1.2--alpha-blue
[UR-status]: https://img.shields.io/uptimerobot/status/m788016880-1a45a6df05ee28cdbbf024cf

<!-- site links -->
[miworks-site]: https://mitchells.work
[login-site]: https://login.mitchells.work