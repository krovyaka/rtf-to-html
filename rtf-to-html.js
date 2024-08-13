'use strict'

const RTFSpan = require('./rtf-span');
const RTFParagraph = require('./rtf-paragraph');
const RTFDocument = require('./rtf-document');

class RtfToHtml {
    toHtmlParagraph = (rftParagraph) => {
        let result = '<p>';
    
        if (rftParagraph?.content) {
            for (const content of rftParagraph.content) {
                result += toHtmlElement(content);
            }
        }
        result += '</p>'
        return result;
    }
    
    toHtmlSpan = (rftSpan) => {
        const value = rftSpan && rftSpan.value && rftSpan.value.replace(/<[^>]*>/g, '');
        if (value) {
            let htmlStyle = '';
            const font = rftSpan.style?.font;
            if (font) {
                htmlStyle += 'font-family: "' + font.name + '"'
                if (font.family) {
                    htmlStyle += ', ' + font.family;
                }
                htmlStyle += '; ';
            }
            if (rftSpan.style?.fontSize) {
                htmlStyle += `font-size: ${ rftSpan.style.fontSize }px; `;
            }
            return `<span${ htmlStyle && ` style="${ htmlStyle }"` }>${ value }</span>`;
        }
        return '';
    }
    
    toHtmlDocument = (rftDocument) => {
        let result = '';
        if (rftDocument?.content) {
            for (const content of rftDocument.content) {
                result += toHtmlElement(content);
            }
        }
        return result;
    }
    
    toHtmlElement = (rftElement) => {
        if (rftElement instanceof RTFParagraph) {
            return toHtmlParagraph(rftElement);
        } else if (rftElement instanceof RTFSpan) {
            return toHtmlSpan(rftElement);
        } else if (rftElement instanceof RTFDocument) {
            return toHtmlDocument(rftElement);
        }
        return '';
    }
}

// parseRTF.string(rtfContent, (err, doc) => {
//     console.log(toHtmlElement(doc));
// })

module.exports = RtfToHtml