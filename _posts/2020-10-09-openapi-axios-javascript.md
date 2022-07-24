---
layout: post
title: "How to make OpenAPI generator typescript-axios support JavaScript"
date: 2020-10-09 01:23
categories:
- General
tags: [dev, javascript, howto, openapi]
---

Sometimes there is a moment when you don't want or cannot use the default OpenAPI generator preset, but you need to import your API library package in your JavaScript project.

I'm talking about `typescript-axios` preset that generates only TS files. It forces you to use babel or other transpiler.

### JS-TS issue
I suppose you store npm package in npm repository (public or private like Nexus).

If you import your generated package it can cause an error in ES imports:

```
Failed to compile with 1 errors  

This dependency was not found:

* your-api-package in ./src/store/actions.js

To install it, you can run: npm install —save your-api-package
```

So you either have to add TS support or change building process.

`npm publish` runs `npm run build` as preinstall hooks.
That gives you a `dist` folder with all necessary JavaScript code so such package can be used in both TS and JS projects.

### Build template
But when you publish such package all you get is this basic `*.ts` files in root without `dist`.

All you need is to add to `package.json` these lines:
```
    'files': [
        'dist'
    ]
```
And then publish it.

But you cannot edit `package.json` every time you update your OpenAPI spec.

Consider you use Java stack and build all your libs with gradle. The secret is that you can override `*.mustache` templates that is used during code generation.

In this case you should copy and edit [original template](https://github.com/OpenAPITools/openapi-generator/blob/master/modules/openapi-generator/src/main/resources/typescript-axios/package.mustache) and place it in your gradle templates folder (i.e. .`templates/libraries/TypeScriptAxios/package.mustache`).

`build.gradle` example:
```
...
def rootClientTemplateDir = '$rootDir/templates/libraries/TypeScriptAxios'.toString()
...
tasks.register('generateClient', org.openapitools.generator.gradle.plugin.tasks.GenerateTask) {
    println 'Start generating client ${clientConf.artifactId}'
    inputSpec = clientConf.inputSpec
    def info = [
            version: extractVersion(clientConf.inputSpec)
    ]
    generatorName = clientConf.generatorName
    outputDir = clientOutputDir
    configOptions = clientConf.extendedConfiguration
    configOptions['npmName'] = clientConf.artifactId
    configOptions['npmVersion'] = '${info.version}'
    templateDir = rootClientTemplateDir
}
```