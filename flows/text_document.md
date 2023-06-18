Events about files and their content.

These commands don't have response as they are like notifications/events, they define context of completions requests. We don't wait for any response from them.

`didOpen`, `didClose`, and `didFocus` are important because basic Github Copilot method to detect file's context - is by opened tabs(aka opened files). So these methods directly affect file's context and the quality of completions.

# File opened

command = "textDocument/didOpen"

## Request

Type:
```javascript
{
  "textDocument": {
    "uri": "String",          // VirtualFileUri uri
    "languageId": "String",   // languageId
    "version": "Integer",     // version
    "text": "String"          // text
  } // TextDocumentItem textDocument
}
```

Example:
```javascript
{
    "textDocument": {
        "uri": "file:///home/username/my_project/my_file.js",
        "languageId": "javascript",
        "version": 120,
        "text": "function addTwo(a, b) {\n\n}"
    }
}
```

## Details

* `languageId` should be from https://code.visualstudio.com/docs/languages/identifiers (or https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/). Otherwise Github Copilot will return completions, but they will be much worse(it will not take into account files, opened in tabs)


# File closed

E.g. close tab in IDEA.

command = "textDocument/didClose"

## Request

Type:
```javascript
{
  "textDocument": {
    "uri": "String"  // VirtualFileUri uri
  }  // TextDocumentIdentifier textDocument
}
```

Example:
```javascript
{
    "textDocument": {
        "uri": "file:///home/username/my_project/my_file.js"
    }
}
```

# File changed


After text is updated in a file. While typing in JetBrains it sent on every keypress.

command = "textDocument/didChange"

## Request

Type:
```javascript
{
  "textDocument": {
    "uri": "String",         // VirtualFileUri uri
    "version": "Integer"     // version
  }, // VersionedTextDocumentIdentifier textDocument
  "contentChanges": [
    {
      "range": {
        "start": {
          "line": "Integer",      // line
          "character": "Integer"  // character
        }, // Position start
        "end": {
          "line": "Integer",      // line
          "character": "Integer"  // character
        }    // Position end
      },  // Range range
      "text": "String"    // String text
    }
  ] // List<TextDocumentContentChangeEvent> contentChanges
}
```

Example for addition(paste):
```javascript
{
    "textDocument": {
        "uri": "file:///home/username/my_project/my_file.js",
        "version": 124
    },
    "contentChanges": [
        {
            "range": {
                "start": {
                    "line": 1,
                    "character": 1
                },
                "end": {
                    "line": 1,
                    "character": 1
                }
            },
            "text": "return 1+1"
        }
    ]
}
```


Example for delete selection:
```javascript
{
    "textDocument": {
        "uri": "file:///home/username/my_project/my_file.js",
        "version": 123
    },
    "contentChanges": [
        {
            "range": {
                "start": {
                    "line": 1,
                    "character": 1
                },
                "end": {
                    "line": 1,
                    "character": 8
                }
            },
            "text": ""
        }
    ]
}
```

## Details

* range.start / range.end - much likely for editing a selection.


# File focused

When a tab with file is changed. It affects which files will be included in the context, as only the last 20 are selected. And from these 20 - not all of their content will be included to the prompt(maybe it also takes access times into account?)
Neighbor files are selected based on access times count, which is incremented when the file is focused.

command = "textDocument/didFocus"

## Request

Type:
```javascript
{
  "uri": "String"   // VirtualFileUri uri
}
```

Example:
```javascript
{
    "uri": "file:///home/username/my_project/my_file.js"
}
```
