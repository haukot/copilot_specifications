* [Initialize](#initialize)
* [Set editor info](#set-editor-info)
* [Change settings](#change-settings)


# Initialize

First command after the editor starts

## Request

Type:
```javascript
{
  "capabilities": {
    "text_document": {
      "synchronization": {
        "dynamic_registration": "Boolean", // dynamicRegistration
        "will_save": "Boolean",            // willSave
        "will_save_wait_until": "Boolean", // willSaveWaitUntil
        "did_save": "Boolean"              // didSave
      }  // TextDocumentSyncClientCapabilities synchronization
    },  // TextDocumentClientCapabilities textDocument
    "workspace": {
      "workspaceFolders": "Boolean" // boolean workspaceFolders
    }       // WorkspaceCapabilities workspace
  }, // ClientCapabilities capabilities
  "workspaceFolders": [
    {
      "uri": "String"  // VirtualFileUri uri
    }
  ] // List<WorkspaceFolder> workspaceFolders (optional)
}
```

Example:
```javascript
{
    "capabilities": {
        "textDocument": {
            "synchronization": {
                "dynamicRegistration": true
            }
        },
        "workspace": {
            "workspaceFolders": true
        }
    },
    "workspaceFolders": [
        {
            "uri": "file:///home/username/my_project"
        }
    ]
}
```


# Set editor info

## Request

Type:
```javascript
Type.Object({
    editorInfo: Type.Object({
      name: Type.String(),
      version: Type.String()
    }),
    editorPluginInfo: Type.Object({
      name: Type.String(),
      version: Type.String()
    }),
    editorConfiguration: Type.Optional(Type.Object({
      showEditorCompletions: Type.Optional(Type.Boolean()),  // in JetBrains version - option "Show ide completions side-by-side"
      enableAutoCompletions: Type.Optional(Type.Boolean()),
      delayCompletions: Type.Optional(Type.Boolean()),
      filterCompletions: Type.Optional(Type.Boolean()),
      disabledLanguages: Type.Optional(Type.Array(Type.Object({
          languageId: Type.String()
      })))
    })),
    networkProxy: Type.Optional(Type.Object({
      host: Type.String(),
      port: Type.Number(),
      username: Type.Optional(Type.String()),
      password: Type.Optional(Type.String()),
      rejectUnauthorized: Type.Optional(Type.Boolean())
    })),
    authProvider:  Type.Optional(Type.Object({
      url: Type.Optional(Type.String())
    })),
    options: Type.Optional(Type.Object({}))
})
```

Example:
```javascript
{
    "editorInfo": {
        "name": "JetBrains-IC",
        "version": "231.9011.34"
    },
    "editorPluginInfo": {
        "name": "copilot-intellij",
        "version": "1.2.8.2631"
    },
    "editorConfiguration": {
        "showEditorCompletions": true,
        "enableAutoCompletions": true,
        "disabledLanguages": []
    }
}
```

## Response

Example:
```javascript
'OK'
```


# Change settings

Despite the command name, these are not actually workspace settings - they are editor settings, and they are shared among Copilot's workspaces. In IDEA, these settings are configured in the editor settings in the GitHub Copilot section.

`showEditorCompletions` and `enableAutoCompletions` doesn't look very useful atm, as we can do the same functionality on the plugin's side.
Maybe some telemetry will be there in the future?

command = "workspace/didChangeConfiguration"

## Request

Type:
```javascript
Type.Object({
    settings: Type.Optional(Type.Object({
      showEditorCompletions: Type.Optional(Type.Boolean()),
      enableAutoCompletions: Type.Optional(Type.Boolean()),
      delayCompletions: Type.Optional(Type.Boolean()),
      filterCompletions: Type.Optional(Type.Boolean()),
      disabledLanguages: Type.Optional(Type.Array(Type.Object({
          languageId: Type.String()
      })))
    })),
    networkProxy: Type.Union([Type.Optional(Type.Object({
      host: Type.String(),
      port: Type.Number(),
      username: Type.Optional(Type.String()),
      password: Type.Optional(Type.String()),
      rejectUnauthorized: Type.Optional(Type.Boolean())
    }), Type.Null()])),
    authProvider:  Type.Optional(Type.Object({
      url: Type.Optional(Type.String())
    })),
    options: Type.Optional(TestingOptions)
})
```

Example(disable completions):
```javascript
{
    "settings": {
        "showEditorCompletions": false,
        "enableAutoCompletions": false,
        "disabledLanguages": []
    }
}
```

Example(enable completions):
```javascript
{
    "settings": {
        "showEditorCompletions": false,
        "enableAutoCompletions": true,
        "disabledLanguages": []
    }
}
```

## Details

* showEditorCompletions doesn't do anything on Copilot side, even in extension.js
