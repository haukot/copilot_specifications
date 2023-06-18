# Workspaces

Disclaimer: This is implemented in the JetBrains version, but it currently doesn't do anything. The Workspace feature could potentially be used as a method to detect neighbors, but as of now, it's not enabled.
In extension.js, whether it's enabled or not depends on the response from the Github experiments API, which likely involves A/B tests.
In agent.js, the experiments API is disabled.
It is understandable why it's only enabled in extension.js - as it provides a more controlled environment, and it's not proven yet whether the feature would work better.


To work with workspace methods you need to set workspace capabilities to true in the settings.

# Add / remove workspace

command = "workspace/didChangeWorkspaceFolders"

## Request

Type:
```javascript
{
  "event": {
    "added": [
      {
        "uri": "String"  // VirtualFileUri uri
      }
    ], // List<WorkspaceFolder> added
    "removed": [
      {
        "uri": "String"  // VirtualFileUri uri
      }
    ] // List<WorkspaceFolder> removed
  }  // WorkspaceFoldersChangeEvent event
}
```

Example(close folder):
```javascript
{
    "event": {
        "added": [],
        "removed": [
            {
                "uri": "file:///home/username/my_project"
            }
        ]
    }
}
```

Example(open folder):
```javascript
{
    "event": {
        "added": [
            {
                "uri": "file:///home/username/my_project2"
            }
        ],
        "removed": []
    }
}
```

## Details

* If you open folder in the same window, JetBrains Github Copilot version sends the close folder request first, then the open folder request. It seems to be a detail of the plugin's implementation, not a requirement.
