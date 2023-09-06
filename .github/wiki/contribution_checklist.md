# Contributing to TrophyApp Community Projects

A big welcome and thank you for considering contributing to our open source projects! Your help is essential for keeping it great.

Before contributing to this repository please make sure you read the [Contribution Guidelines](../CONTRIBUTING.md).

## Contribution Checklist

The following checklist contains our common rules and practices regarding code quality and testing. This checklist must be checked for every merge request and every element of the list must be manually checked for your technologies in order to get reviewed. This significantly reduces the review time because this list contains of recurring errors which easily can be avoided.

### General

- [ ] All active GitHub checks for tests, formatting and security are passing (CI Pipeline)
- [ ] The correct base branch is being used.
- [ ] Documentation for new / changed functionality is added or updated (if documentation is present)
- [ ] Test for reproducing the bug / new business logic (e.g. viewmodels, services and so on) are implemented
- [ ] Errors are handled and/or least logged
- [ ] Log messages and comments are written in english
- [ ] There are no (debug) console logs or _useless_ / _trivial_ comments
- [ ] Disabled linter rules are explained via comment
- [ ] Variables, method, classes and so on should have meaningful names (longer is better that meaningless)
- [ ] No ambiguous code was implemented - code intent is clear upon initial reading (if not possible, it should get properly documented)
- [ ] DRY principle (no duplicate without a good reason) is followed
- [ ] Methods can handle unexpected input properly
- [ ] Each feature has its corresponding feature / subfeature folder with corresponding widgets, viewmodel and so on
- [ ] The folder structure stays consisted as described in the tech stack
- [ ] Hard coded / static values (magic numbers) are avoided (add the static values to forseen files)

### Typescript / Javascript

- [ ] All files are written in typescript
- [ ] There is a blank line between module imports and own file imports
- [ ] Arrow functions are preferred over normal functions
- [ ] User inputs are being validated properly (with error messages if needed)
- [ ] The code sticks to the prettier and eslint code standards
- [ ] Await/async is preferred over chaining then callbacks
- [ ] TypeScript code compiles without any warnings / errors
- [ ] Everything should get type (no any -> use things like unknown instead and map the type)
