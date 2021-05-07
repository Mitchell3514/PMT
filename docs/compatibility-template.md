## Compatibility Report Template

```
# Compatibility report
- Version: {version}
- Date: {date}
- Name: {name}

## Type
- [ ] Application
- [ ] Browser
- [ ] Plugin, tested on:
  - [ ] Chromium
  - [ ] Firefox

## Details
{notes}
```

------
# Compatibility report (EXAMPLE)
- Version: v0.1.2-alpha
- Date: 06 May 2021
- Name: LastPass

## Type
- [ ] Application
- [ ] Browser
- [x] Plugin, tested on:
  - [x] Chromium
  - [x] Firefox

## Details
  - `change` - both password fields seen as new-password.
  - `change` - new-password field not filled in by generator.
  - `reset` - password field not seen.
