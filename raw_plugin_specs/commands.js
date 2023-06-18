lang/agent/commands/SetEditorInfoCommand
command = "setEditorInfo"
{
  "editorInfo": {
    "name": "String",        // String name
    "version": "String"      // String version
  },
  "editorPluginInfo": {
    "name": "String",        // String name
    "version": "String"      // String version
  },
  "editorConfiguration": {
    "showEditorCompletions": "Boolean",
    "enableAutoCompletions": "Boolean",
    "disabledLanguages": [
      {
        "languageId": "String" // Language
      }
    ],
    "networkProxy": "AgentProxySettings"
  },    // EditorSettings editorConfiguration
  "networkProxy": "AgentProxySettings" // AgentProxySettings networkProxy
}

lang/agent/commands/Document
{
  "position": {
    "line": "Integer",
    "character": "Integer"
  },       // Position position
  "insertSpaces": "boolean",  // boolean useSpaces
  "tabSize": "int",           // int tabSize
  "uri": "String",            // VirtualFileUri uri
  "version": "int"            // int version
}

lang/agent/commands/ConfigurationChangeCommand
command = "workspace/didChangeConfiguration"
{
  "settings": {
    "showEditorCompletions": "Boolean",
    "enableAutoCompletions": "Boolean",
    "disabledLanguages": [
      {
        "languageId": "String" // Language
      }
    ],
    "networkProxy": "AgentProxySettings"
  },        // EditorSettings settings
  "networkProxy": "AgentProxySettings"     // AgentProxySettings networkProxy
}

lang/agent/commands/GetCompletionsResult
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

lang/agent/commands/CheckStatusCommand
command = "checkStatus"
{
  "localChecksOnly": "boolean" // boolean localChecksOnly
}

lang/agent/commands/GetCompletionsCommand
command = "getCompletions"
{
  "doc": {
    "position": {
      "line": "Integer",
      "character": "Integer"
    },
    "insertSpaces": "boolean",
    "tabSize": "int",
    "uri": "String",
    "version": "int"
  }, // Document doc
  "options": "Map<Object, Object>" // Map<Object, Object> options
}

lang/agent/commands/TelemetryExceptionCommand
command = "telemetry/exception"
{
  "origin": "String", // String origin
  "stacktrace": "String", // String stacktrace
  "additionalProperties": "Map<String, String>" // Map<String, String> additionalProperties
}

lang/agent/commands/GetPanelCompletionsResult
{
  "panelId": "String", // String panelId
  "solutionCountTarget": "int" // int solutionCountTarget
}
class GetPanelCompletionsResult.Solution:
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
class GetPanelCompletionsResult.DoneStatus:
{
  "panelId": "String", // String panelId
  "status": "String", // String status
  "errorMessage": "String" // String errorMessage
}

lang/agent/commands/NotifyAcceptedCommand
command = "notifyAccepted"
{
  "uuid": "String" // String uuid
}

lang/agent/commands/CancelRequestNotification
command = "$/cancelRequest"
{
  "id": "int" // int requestId
}

lang/agent/commands/NotifyShownCommand
command = "notifyShown"
{
  "uuid": "String" // String uuid
}

lang/agent/commands/GetCompletionsCyclingCommand
command = "getCompletionsCycling"
{
  "doc": {
    "position": {
      "line": "Integer",
      "character": "Integer"
    },
    "insertSpaces": "boolean",
    "tabSize": "int",
    "uri": "String",
    "version": "int"
  }, // Document doc
  "options": "Map<Object, Object>" // options
}

lang/agent/commands/debug/VerifyStateCommand
command = "debug/verifyState"
{
  "source": "String", // source
  "languageId": "String", // languageId
  "version": "Integer", // version
  "uri": "String" // VirtualFileUri uri
}

lang/agent/commands/debug/VerifyStateResult
{
  "status": "boolean", // valid
  "message": "String" // message
}

lang/agent/commands/NotifyRejectedCommand
command = "notifyRejected"
{
  "uuids": "List<String>" // uuids
}

lang/agent/commands/GetPanelCompletionsCommand
command = "getPanelCompletions"
{
  "panelId": "String", // panelId
  "doc": {
    "position": {
      "line": "Integer",
      "character": "Integer"
    },
    "insertSpaces": "boolean",
    "tabSize": "int",
    "uri": "String",
    "version": "int"
  }, // Document doc
  "options": "Map<Object, Object>" // options
}

lang/agent/commands/AuthStatusResult
{
  "status": "Status", // status
  "user": "String", // user
  "errorMessage": "String" // errorMessage
}

lang/agent/commands/SignInConfirmCommand
command = "signInConfirm"

lang/agent/commands/SignInInitiateCommand
command = "signInInitiate"

lang/agent/commands/SignOutCommand
command = "signOut"

lang/agent/commands/testing/CreateContextCommand
command = "testing/createContext"
