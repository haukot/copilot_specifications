lang/agent/lsp/DidChangeWorkspaceFolders
command = "workspace/didChangeWorkspaceFolders"
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

// TODO
lang/agent/lsp/ClientCapabilities
{
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
}

lang/agent/lsp/textDocument/DidCloseCommand
command = "textDocument/didClose"
{
  "textDocument": {
    "uri": "String"  // VirtualFileUri uri
  }  // TextDocumentIdentifier textDocument
}

lang/agent/lsp/textDocument/TextDocumentContentChangeEvent
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

lang/agent/lsp/textDocument/DidFocusCommand
command = "textDocument/didFocus"
{
  "uri": "String"   // VirtualFileUri uri
}

lang/agent/lsp/textDocument/DidOpenCommand
command = "textDocument/didOpen"
{
  "textDocument": {
    "uri": "String",          // VirtualFileUri uri
    "languageId": "String",   // languageId
    "version": "Integer",     // version
    "text": "String"          // text
  } // TextDocumentItem textDocument
}

lang/agent/lsp/textDocument/DidChangeCommand
command = "textDocument/didChange"
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

lang/agent/lsp/InitializeCommand
command = "initialize"
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


// TODO: ServerCapabilites doesn't have serializable fields?
lang/agent/lsp/InitializeResult
{
  "capabilities": "Object" // ServerCapabilities capabilities
}
