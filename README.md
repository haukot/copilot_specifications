## What is this

These are unofficial specs for Github Copilot plugin development, for interactions between agent.js and plugin.

## Basics

The plugin should run agent.js in a side process and communicate with it over jsonrpc.
These specifications for agent.js are based on GitHub Copilot version `1.88.132`.

VS Code doesn't use `agent.js` - it uses `extension.js`. They share much of the same code, with the difference being that agent.js has a jsonrpc interface for plugins. However, some functionality isn't implemented in it.

## Go to the specs

Inside specs you'll see two types of definitions - `uuid: Type.String()` and `"uuid": "String", // String uuid`.
The first one is from agent.js, this is exactly what agent.js can receive.
The second one has been reverse-engineered from the JetBrains GitHub Copilot plugin, and it may not include some options that agent.js supports.

* [Dry start](flows/readme.md)
* [Configurations](flows/configurations.md)
* [Auth](flows/auth.md)
* [Text document](flows/text_document.md)
* [Completions](flows/completions.md)
* [Workspace](flows/workspace.md)
* [Notifications](flows/notifications.md)

There are also some `testing` and `debug` commands, but I didn't document them. You can check them in the [raw plugin specs](raw_plugin_specs) folder.

## Where to get agent.js

Inside [Vim plugin](https://github.com/github/copilot.vim/blob/release/copilot/dist/agent.js) or inside any other plugin, e.g. inside JetBrains' inside plugin folder after installing, in `copilot-agent/dist/agent.js`.
(JetBrains version seems to have more up to date version)

## How can I check types by myself

1. Some types can be easily obtained; search for them in agent.js using:

`Type.Object({`

Btw chrome beautifies the file automatically, so you can open it in the browser inserted in some html page, or inside debug session(see below).

2. You can find other types by checking the corresponding handlers in agent.js and searching by the names of the commands. There are no direct types as in 1, but you can see what structures the handlers are waiting for.

3. Check the code of existing plugins.

## Can I see the code

Main plugin with open code is https://github.com/github/copilot.vim

And there are closed source plugins, e.g. JetBrains version.
Usually http://java-decompiler.github.io/ gives pretty good results with .jar files.

## How to find out Github Copilot version in agent.js

Seek for `"description":"Your AI pair programmer","version":"` in agent.js(or for `"version":"` if the previous doesn't work)

Also in the same line you can find(and change if you need to) advanced Copilot settings from the VS Code version.

## How to debug

We can connect to the node process that runs agent.js and set a debugger in it.
One caveat is that by default, the JetBrains plugin works with the copilot-agent binary, and it runs node somewhere inside. So.

Install IDEA and the Github Copilot plugin.

Then, remove (or move) the bin folder from the plugin directory.

```
rm ~/.local/share/JetBrains/IdeaIC2023.1/github-copilot-intellij/copilot-agent/bin
```

After that run IDEA. It'll show error in the logs, but will not break anything. You can also use `COPILOT_AGENT_VERBOSE=true` to get more logs

```
COPILOT_AGENT_VERBOSE=true ~/apps/idea-IC-231.9011.34/bin/idea.sh
```

This will force copilot to use node process and agent.js directly.
After that you can connect [debugger to node process](https://nodejs.org/en/docs/guides/debugging-getting-started), like

```
$ ps ax | grep agent.js
13837 pts/6    Sl+    0:02 .local/share/JetBrains/IdeaIC2023.1/github-copilot-intellij/copilot-agent/dist/agent.js

$ kill -USR1 13837
```

After that you can open Google Chrome on `chrome://inspect`, click on 'Open dedicated DevTools for Node', and select file for debug.

To check all actions(but not events like didChange) you can set a debugger on `messageHandler`.

## How Copilot works inside

I know about these analyses: [one](https://thakkarparth007.github.io/copilot-explorer/posts/copilot-internals.html) and [two](https://github.com/saschaschramm/github-copilot).

## Support and Warranty

If something is wrong feel free to raise an issue or a PR. No formal support or warranty.
