* [Completions and cycling completions](#completions-and-cycling-completions)
* [Panel completions](#panel-completions)
* [Notification when completion is shown](#notification-when-completion-is-shown)
* [Notification when completion is accepted](#notification-when-completion-is-accepted)
* [Notification when completion is rejected](#notification-when-completion-is-rejected)


# Completions and cycling completions

## Request

Get completions for the current point
command = "getCompletions"

Get more variants of completions from the same point
command = "getCompletionsCycling"

Type:

```javascript
Type.Object({
    doc: Type.Object({
        position: Type.Object({
            line: Type.Number({
                minimum: 0
            }),
            character: Type.Number({
                minimum: 0
            })
        }),
        uri: Type.String(),
        version: Type.Number(),
        insertSpaces: Type.Optional(Type.Boolean()),
        tabSize: Type.Optional(Type.Number()),
        source: Type.Optional(Type.String()),
        languageId: Type.Optional(Type.String()),
        relativePath: Type.Optional(Type.String()),
        ifInserted: Type.Optional(Type.Object({
            text: Type.String(),
            end: Type.Optional(Type.Object({
                line: Type.Number({
                    minimum: 0
                }),
                character: Type.Number({
                    minimum: 0
                })
            }))
        }))
    }),
    options: Type.Optional(TestingOptions)
})
```

Example:

```javascript
{
    "doc": {
        "position": {
            "line": 13,
            "character": 12
        },
        "insertSpaces": true,
        "tabSize": 4,
        "uri": "file:///home/username/project/my_file.js",
        "version": 10
    }
}
```

### Details
* `ifInserted` is not used in JetBrains version. Seems it's probably to exec completions right after a text is inserted - seems like it's updating document in the same request.

## Response

Type:
```javascript
{
  "completions": [
    {
      "uuid": "String", // String uuid
      "text": "String", // String text
      "range": {
        "start": {
          "line": "Integer",
          "character": "Integer"
        },
        "end": {
          "line": "Integer",
          "character": "Integer"
        }
      }, // Range range
      "displayText": "String", // String displayText
      "position": {
        "line": "Integer",
        "character": "Integer"
      }, // Position position
      "docVersion": "int" // int docVersion
    }
  ]
} // List<Completion> completions
```

Example:
```javascript
{
    "completions": [
        {
            "uuid": "320db4b4-1b8c-442d-a72a-5963278b29ae",
            "text": "  function myGreatFun() {",
            "range": {
                "start": {
                    "line": 13,
                    "character": 0
                },
                "end": {
                    "line": 13,
                    "character": 12
                }
            },
            "displayText": " function myGreatFun() {",
            "position": {
                "line": 13,
                "character": 12
            },
            "docVersion": 15
        },
        {
            "uuid": "29a8d1c1-de07-4680-8cfb-52625547377d",
            "text": "  function anotherVariant() {",
            "range": {
                "start": {
                    "line": 13,
                    "character": 0
                },
                "end": {
                    "line": 13,
                    "character": 12
                }
            },
            "displayText": " function anotherVariant() {",
            "position": {
                "line": 13,
                "character": 12
            },
            "docVersion": 15
        }
    ]
```

## Details

* `displayText` is text after the current cursor position, `text` is full line.
* `docVersion` of last sent `textDocument` should be the same as docVersion of the completions request.


# Panel completions

Get several variants (up to 10 by default) and display them in the panel.

command = "getPanelCompletions"

## Request

Type:
```javascript
Type.Object({
    doc: Type.Object({
        position: Type.Object({
            line: Type.Number({
                minimum: 0
            }),
            character: Type.Number({
                minimum: 0
            })
        }),
        uri: Type.String(),
        version: Type.Number(),
        source: Type.Optional(Type.String()),
        languageId: Type.Optional(Type.String()),
        relativePath: Type.Optional(Type.String())
    }),
    panelId: Type.String(),
    options: Type.Optional(TestingOptions)
})
```

Example:
```javascript
{
    "panelId": "47e7e6a0-cdb7-420f-9914-f517f81a8a38",
    "doc": {
        "position": {
            "line": 0,
            "character": 23
        },
        "insertSpaces": true,
        "tabSize": 4,
        "uri": "file:///home/username/my_project/my_file.js",
        "version": 41
    }
}
```

### Details
* `source` is not used in JetBrains' version. It seems like it could contain the full document text for checking.

## Response

Type:
```javascript
{
  "panelId": "String", // String panelId
  "solutionCountTarget": "int" // int solutionCountTarget
}
```

Example:
```javascript
{
    // seems like in real world panelId isn't returned?
    "solutionCountTarget": 10
}
```

## Response in jsonrpc notification

### Solution ( jsonrpc method "PanelSolution" )

Type:
```javascript
{
  "panelId": "String", // String panelId
  "range": {
    "start": {
      "line": "Integer",
      "character": "Integer"
    },
    "end": {
      "line": "Integer",
      "character": "Integer"
    }
  }, // Range range
  "completionText": "String", // String completionText
  "displayText": "String", // String displayText
  "score": "int", // int score
  "solutionId": "String" // String solutionId
}
```

Example:
```javascript
{
    "panelId": "47e7e6a0-cdb7-420f-9914-f517f81a8a38",
    "range": {
        "start": {
            "line": 0,
            "character": 23
        },
        "end": {
            "line": 0,
            "character": 23
        }
    },
    "completionText": " {\n  // ...\n}",
    "displayText": "function calculateAdd() {\n  // ...\n}",
    "score": 0,
    "solutionId": "4f60d85a9dcd5a5228b80f23c111e0b15ac2c56ab895b6217647718d4252c7dd",
    "docVersion": 41
}
```

### FinishedNormally ( jsonrpc method "PanelSolutionsDone" )
status: "OK",

Type:
```javascript
{
  "panelId": "String", // String panelId
  "status": "String", // String status
}
```

Example:
```javascript
{
    "status": "OK",
    "panelId": "7ded6899-8aed-45c3-b188-64aa3166ed91"
}
```

### FinishedWithError ( jsonrpc method "PanelSolutionsDone" )
status = "Error"

Type:
```javascript
{
  "panelId": "String", // String panelId
  "status": "String", // String status
  "message": "String" // String errorMessage
}
```

## Details

* The first request returns only the count of results, you need to subscribe to notifications to get other results
https://github.com/zerolfx/copilot.el/blob/main/copilot.el#L153
https://github.com/github/copilot.vim/blob/1358e8e45ecedc53daf971924a0541ddf6224faf/autoload/copilot.vim#LL64C1-L64C1


# Notification when completion is shown

## Request

command = "notifyShown"

Type:
```javascript
Type.Object({
    uuid: Type.String({
        minLength: 1
    }),
    options: Type.Optional(TestingOptions)
})
```

Example:
```javascript
{
    uuid: 'de2dd2a6-e96c-4843-a80f-28e615699209'
}
```

## Details

* it's not sent about panel completions(but maybe it's JetBrains implementation?)

# Notification when completion is accepted

## Request

command = "notifyAccepted"

Type:
```javascript
Type.Object({
    uuid: Type.String({
        minLength: 1
    }),
    options: Type.Optional(TestingOptions)
})
```

Example for getCompletions:
```javascript
{
    uuid: 'de2dd2a6-e96c-4843-a80f-28e615699209'
}
```

Example for panel completions:
```javascript
{
  uuid: 'cd09d4af1503c9f17b8b43bc5e4994efd40f64cd47a9c31884728a33f46c870e'}
}
```

## Details

* is sent about all completions (base, cycling and panel)


# Notification when completion is rejected

## Request

command = "notifyRejected"

Type:
```javascript
Type.Object({
    uuids: Type.Array(Type.String()),
    options: Type.Optional(TestingOptions)
})
```

Example:
```javascript
{
    "uuids": [
        "de2dd2a6-e96c-4843-a80f-28e615699209"
    ]
}
```

## Details

* For getCompletionsCycling it sends all cycled and rejected variants, if none of them are accepted. If some variant is accepted - it doesn't sends rejected notification about others (in plugin implementation)
* it doesn't send about panel completions(but maybe it's JetBrains implementation?)



# Cancel request

If previous completions request is not needed - should be cancelled. E.g. https://github.com/github/copilot.vim/blob/1358e8e45ecedc53daf971924a0541ddf6224faf/autoload/copilot.vim#L116

## Request

Type:
```javascript
{
  "id": "int" // int requestId
}
```

Example:
```javascript
{
  "id": 4
}
```
