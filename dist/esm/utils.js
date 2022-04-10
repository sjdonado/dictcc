export var getTextMeta = function (text) {
    var abbreviations = Array.from(text.matchAll(/<(.*?)>/g), function (m) { return m[1]; });
    var comments = Array.from(text.matchAll(/\[(.*?)\]/g), function (m) { return m[1]; });
    var optionalData = Array.from(text.matchAll(/\((.*?)\)/g), function (m) { return m[1]; });
    var wordClassDefinitions = Array.from(text.matchAll(/\{(.*?)\}/g), function (m) { return m[1]; });
    return { abbreviations: abbreviations, comments: comments, optionalData: optionalData, wordClassDefinitions: wordClassDefinitions };
};
export var getTranslatedText = function (text) {
    return text
        .replace(/\d|\[.+\]|<.+>|\{.+\}|\(.+\)/g, '')
        .trim();
};
export var prepareData = function (from, to) {
    return from.map(function (element, index) { return ({
        translateFrom: element,
        translateTo: to[index],
    }); });
};