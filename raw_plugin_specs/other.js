github/DeviceCodeResponse
{
  "device_code": "String", // String deviceCode
  "user_code": "String", // String userCode
  "verification_uri": "String", // String verificationUri
  "expires_in": "long", // long expiresIn
  "interval": "long" // long intervalSeconds
}

telemetry/GitHubPanicStackFrame
{
  "level": "int", // int level
  "method": "String", // String method
  "assembly": "String", // String assembly
  "fileName": "String", // String fileName
  "line": "int" // int line
}

lang/agent/rpc/JsonRpcError
{
  "code": "Integer",        // int code
  "message": "String",      // String error
  "data": "Object"          // JsonElement data
}

lang/agent/notifications/StatusNotification
{
  "status": "Object", // Status status
  "message": "String" // String message
}

lang/agent/notifications/LogMessageNotification
{
  "level": "int", // int level
  "message": "String", // String message
  "metadataStr": "String" // String metadata
}

lang/agent/notifications/LspLogMessage
{
  "type": "int", // int messageType
  "message": "String" // String message
}

lang/agent/notifications/WindowLogMessageRequest
{
  "actions": [
    {
      "title": "String" // title
    }
  ] // List<MessageActionItem> actions
}
