* [Check auth status](#check-auth-status)
* [Sign in initiate](#sign-in-initiate)
* [Sign in confirm](#sign-in-confirm)
* [Sign out](#sign-out)

# Check auth status

To check the current auth status. This runs first after the editor starts.

command = "checkStatus"

## Request

Type:
```javascript
Type.Object({
    options: Type.Optional(Type.Intersect([Type.Object({
        localChecksOnly: Type.Optional(Type.Boolean())
    }), TestingOptions]))
})
```

Example:
```javascript
{
    "localChecksOnly": false
}
```

## Response

Type:
```javascript
{
    "status": "string" // Status status,
    "user": "string" // Optional String user
}
```

Example:
```javascript
{
    "status": "OK",
    "user": "your_github_user"
}
```

# Sign in initiate

Starts sign-in process. The user needs to go to the verificationUri and enter the UserCode there.

command = "signInInitiate"

## Request

No fields

## Response

Type(for new login):
```javascript
{
    "status": "string", // "PromptUserDeviceFlow" or "AlreadySignedIn"
    "userCode": "string",
    "verificationUri": "string",
    "expiresIn": "long",
    "interval": "long"
}
```

Example(new login):
```javascript
{
    "status": "PromptUserDeviceFlow",
    "userCode": "1AE7-3F5D",
    "verificationUri": "https://github.com/login/device",
    "expiresIn": 899,
    "interval": 5
}
```

Example(user already signed in):
```javascript
{
    "status": "AlreadySignedIn",
    "user": "your_github_user"
}
```


# Sign in confirm

This command is waiting for the user to authenticate the application on the Github side.

command = "signInConfirm"

## Request

No fields

## Response

Type:
```javascript
{
    "status": "string" // Status status,
    "user": "string" // String user
}
```

Example:
```javascript
{
    "status": "OK",
    "user": "your_github_user"
}
```

# Sign out

command = "signOut"

## Request

Not fields

## Response

Type:
```javascript
{
    "status": "string" // AuthStatus status
}
```

Example:
```javascript
{
    "status": "NotSignedIn"
}
```

# AuthStatus

```javascript
enum Status {
  Ok("OK"),
  MaybeOk("MaybeOK"), // if localCheckOnly = true
  NotSignedIn("NotSignedIn"),
  NotAuthorized("NotAuthorized"),
  FailedToGetToken("FailedToGetToken"),
  TokenInvalid("TokenInvalid") // not existing in agent.js
}
```
