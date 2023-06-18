lang/agent/commands/testing/SetCompletionDocumentsCommand
command = "testing/setCompletionDocuments"
{
  "testingCtx": "Integer", // int testingCtx
  "documents": ["String"] // List<String> documents
}

lang/agent/commands/testing/AlwaysAuthCommand
command = "testing/alwaysAuth"
{
  "testingCtx": "Integer" // int testingCtx
}

lang/agent/commands/testing/SetPanelCompletionDocumentsCommand
command = "testing/setPanelCompletionDocuments"
{
  "testingCtx": "Integer", // int testingCtx
  "documents": [
    {
      "text": "String", // String text
      "score": "Double" // double score
    },
    {
      "text": "String", // String text
      "score": "Double" // double score
    },
    ...
  ] // List<PanelCompletionDocument> documents
}

lang/agent/commands/testing/UseTestingTokenCommand
command = "testing/useTestingToken"
{
  "testingCtx": "Integer" // int testingCtx
}

lang/agent/commands/testing/NeverAuthCommand
command = "testing/neverAuth"
{
  "testingCtx": "Integer" // int testingCtx
}

command = "testing/triggerShowMessageRequest"
// not used, no json
