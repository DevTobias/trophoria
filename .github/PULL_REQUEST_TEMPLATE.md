By submitting a pull request (PR) to this repository, you agree to the terms within the [Code of Conduct](CODE_OF_CONDUCT.md). Please see the [Contributing Guidelines](CONTRIBUTING.md) for how to create and submit a high-quality PR for this repo.

## Description

> Describe the purpose of this PR along with any background information and the impacts of the proposed change. For the benefit of the community, please do not assume prior context.
>
> Provide details that support your chosen implementation, including: breaking changes, alternatives considered, changes to the API, etc.
>
> If the UI is being changed, please provide screenshots.

## References

> Include any links supporting this change such as a:
>
> - GitLab Issue/PR number addressed or fixed
> - Infotition Community post
> - StackOverflow post
> - Related pull requests/issues from other repos
>
> If there are no references, simply delete this section.

## Testing

> Describe how this can be tested by reviewers. Be specific about anything not tested and reasons why. If this library has unit and/or integration testing, tests should be added for new functionality and existing tests should complete without errors.
>
> Please include any manual steps for testing end-to-end or functionality not covered by unit/integration tests.
>
> Also include details of the environment this PR was developed in (language/platform/browser version).

- [ ] This change adds test coverage for new/changed/fixed functionality

## Checklist

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
