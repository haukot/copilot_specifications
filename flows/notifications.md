These are notifications _from_ agent.js

# Show message


JetBrains' implementation runs it at the start of the editor, after initialization. Seems that it returns messages about Copilot state.

method = "window/showMessageRequest"

Type:
```javascript
{
    type: "int", // MessageType
    message: "string",
    actions: [{ title: 'String' }] // not very investigated that
}
```

MessageType {
  Error = 1,
  Warning = 2,
  Info = 3,
  Log = 4
}


# Other

They are exist in JetBrains implementation, but I didn't research them much.

"window/logMessage"
"LogMessage"

"statusNotification" (exist in Vim https://github.com/github/copilot.vim/blob/1358e8e45ecedc53daf971924a0541ddf6224faf/autoload/copilot.vim#L63)
probably
```javascript
{
    status: "",
    message: ""
}
```
