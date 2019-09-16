const fs = require('fs');
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');

fetch('https://github.com/search/advanced')
    .then(response => response.text())
    .then(text => {

        const classScrub = new RegExp(/class=(["'])(?:(?=(\\?))\2.)*?\1/gm);
        const htmlDocument = parse(text);

        const languageElement = htmlDocument.querySelector('#search_language');
        const languageElText = languageElement.toString();
        const scrubbedLanguageEl = languageElText.replace(classScrub, '');

        createSimpleVueComponent('ProgrammingLanguageSelect', scrubbedLanguageEl);

        const licenseElement = htmlDocument.querySelector('#search_license');
        const licenseElText = licenseElement.toString();
        const scrubbedLicenseEl = licenseElText.replace(classScrub, '');

        createSimpleVueComponent('LicenseSelect', scrubbedLicenseEl);
    });

    function createSimpleVueComponent(name, html) {
    const template =
        `<template>
<div>
    ${html}
</div>
</template>
<script>
export default {
  name: '${name}',
}
</script>`;

    const path = `src/components/${name}.vue`;

    fs.writeFile(path, template, function (err) {
        if (err) throw console.log(err);
        console.log(`Saved ${path}`);
    });
}