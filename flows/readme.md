After then editor runs:

* Initialize ([configuration.md](configurations.md))
* Subscribe to window notifications ([notifications.md](notifications.md))
* Set editor info ([configurations.md](configurations.md))

Then auth: [auth flow](auth.md)

* Check auth status
* Sign in initiate
* Sign in confirm


After that you can send events(see [text_document.md](text_document.md)), and request completions(see [completions.md](completions.md))

You can also check [workspace.md](workspace.md), but it seems they are not enabled in plugins, and even in VS Code they work behind A/B tests.
