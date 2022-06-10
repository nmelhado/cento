export const simplifyRecipe = (data) => {
    data.previewImage = getImg(data.previewImage);
    data.mainImage = getImg(data.mainImage);

    data.recipe = generateParagraph(data.recipe);

    return data
}

export const simplifyRecipePreview = (data) => {
    const resp = {
        name: data.name,
        difficulty: data.difficulty,
        cookTime: data.cookTime,
        tags: data.tags,
        meal: data.meal,
        season: data.season,
        previewImage: getImg(data.previewImage),
    }

    return resp
}

const getImg = (img) => {
    return `https://${img.fields.file.url.split('//')[1]}`;
}

const generateParagraph = (paragraph, indent = true) => {
    let paragraphText = '';
    switch (paragraph.nodeType) {
        case 'paragraph':
            if(indent) {
                paragraphText += '<p class="bodyParagraph">'
            }
            break;
        case 'unordered-list':
            paragraphText += '<ul>'
            break;
        case 'ordered-list':
            paragraphText += '<ol>'
            break;
        case 'blockquote':
            paragraphText += '<blockquote>'
            indent = false;
            break;
        case 'hr':
            paragraphText += '<hr />'
            break;
        case 'embedded-asset-block':
            paragraphText += `<img class="recipeImg" src="${getImg(paragraph.data.target)}" alt="${paragraph.data.target.fields.title}" />`
            break;
    
        default:
            break;
    }
    for(const element of paragraph.content) {
        // if the node type is a paragraph, then recursively call generateParagraph on it
        if(element.nodeType == 'paragraph') {
            paragraphText += generateParagraph(element, indent);
            continue;
        }
        // add list item
        if(element.nodeType == 'list-item') {
            paragraphText += '<li>';
            paragraphText += generateParagraph(element, false);
            paragraphText += '</li>';
            continue;
        }
        // add image
        if(element.nodeType == 'embedded-asset-block') {
            paragraphText += generateParagraph(element, false);
            continue;
        }
        // add orderer list
        if(element.nodeType == 'ordered-list') {
            paragraphText += generateParagraph(element, false);
            continue;
        }
        // add unorderer list
        if(element.nodeType == 'unordered-list') {
            paragraphText += generateParagraph(element, false);
            continue;
        }

        // add modifiers
        if(element.marks) {
            for(const modifier of element.marks) {
                // add bold text
                if(modifier.type == 'bold') {
                    paragraphText += '<b>';
                }
                // add italic modifier
                if(modifier.type == 'italic') {
                    paragraphText += '<i>';
                }
                // add underline text
                if(modifier.type == 'underline') {
                    paragraphText += '<u>';
                }
                // add code text
                if(modifier.type == 'code') {
                    paragraphText += '<code>';
                }
            }
        }
        // add content
        if(element.nodeType == 'text') {
            paragraphText += element.value;
        }
        if(element.nodeType == 'hyperlink') {
            paragraphText += `<a href="${element.data.uri}" class="blogLink">`;
            paragraphText += generateParagraph(element);
            paragraphText += '</a>';
        }
        // add closing modifiers
        if(element.marks) {
            for(const modifier of element.marks) {
                // add code text
                if(modifier.type == 'code') {
                    paragraphText += '</code>';
                }
                // add underline text
                if(modifier.type == 'underline') {
                    paragraphText += '</u>';
                }
                // add italic modifier
                if(modifier.type == 'italic') {
                    paragraphText += '</i>';
                }
                
                // add bold text
                if(modifier.type == 'bold') {
                    paragraphText += '</b>';
                }
            }
        }
    }
    switch (paragraph.nodeType) {
        case 'paragraph':
            if(indent) {
                paragraphText += '</p>'
            }
            break;
        case 'unordered-list':
            paragraphText += '</ul>'
            break;
        case 'blockquote':
            paragraphText += '</blockquote>'
            break;
        case 'ordered-list':
            paragraphText += '</ol>'
            break;
        default:
            break;
    }
    
    return paragraphText;
}