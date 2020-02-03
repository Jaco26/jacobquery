
const utils = {
  firstOr(maybeArray, defaultValue = null) {
    if (Array.isArray(maybeArray)) {
      return maybeArray[0]
    }
    return defaultValue
  }
}

const regex = {
  tag: {
    self: /<\/?[\w\s-+/*"'={}\[\]().]*\/?>/g,
    name: /<\/?[\w-]+/g,
    kind: {
      opening: /<.*>$/,
      closing: /<\/[\w-]*>$/,
      selfClosing: /<.*\/>$/,
    },
    attrs: {
      dynamic: /[\w-]+=\{.*?\}/g,
      static: /[\w-]+=".*?"/g,
    },
    directives: {
      jFor: /j-for=\{[\w\s+-=*/<>]+\}/g,
      jIf: /j-if=\{[\w\s+-=*/<>]+\}/g,
      jElse: /j-else/g,
    },
  },
  text: {
    dynamicContent: /\{.*?\}/g
  }
}

const tokenizeTag = {
  name(tag) {
    const match = tag.match(regex.tag.name)
    if (match) {
      const name = match[0].replace(/\W/g, '')
      return name
    }
    return ''
  },
  kind(tag) {
    if (regex.tag.kind.selfClosing.test(tag)) return 'selfClosing'
    else if (regex.tag.kind.closing.test(tag)) return 'closing'
    else if (regex.tag.kind.opening.test(tag)) return 'opening'
    else throw new Error('could not tokenize tag: ' + tag)
  },
  staticAttrs(tag) {
    return tag.match(regex.tag.attrs.static) || []
  },
  dynamicAttrs(tag) {
    return tag.match(regex.tag.attrs.dynamic) || []
  },
  directives(tag) {
    return {
      jFor: utils.firstOr(tag.match(regex.tag.directives.jFor), '').slice(7, -1),
      jIf: utils.firstOr(tag.match(regex.tag.directives.jIf), '').slice(6, -1),
      jElse: utils.firstOr(tag.match(regex.tag.directives.jElse), '').slice(8, -1),
    }
  } 
}


export class ElementNode {
  constructor(tag) {
    this.children = []
    
    this.tag = tag
    this.name = tokenizeTag.name(tag)
    this.kind = tokenizeTag.kind(tag)
    this.directives = tokenizeTag.directives(tag)
    this.staticAttrs = tokenizeTag.staticAttrs(tag)
    this.dynamicAttrs = tokenizeTag.dynamicAttrs(tag).filter(x => !x.startsWith('j-for') && !x.startsWith('j-if') && !x.startsWith('j-else'))
  }
}

export class TextNode {
  constructor(kind, value) {
    this.kind = kind
    this.value = value
  }
}


/**
 * 
 * @param {string} text 
 */
function parseText(text) {
  const textNodes = []
  const dynamicContentMatches = text.match(regex.text.dynamicContent) || []

  dynamicContentMatches.forEach(match => {
    const textBeforeMatch = text.slice(0, text.indexOf(match))
    if (textBeforeMatch) {
      textNodes.push(new TextNode('static', textBeforeMatch))
    }
    textNodes.push(new TextNode('dynamic', match.slice(1, -1)))
    text = text.replace(textBeforeMatch + match, '')
  })

  if (text.length) {
    textNodes.push(new TextNode('static', text))
  }

  return textNodes
}



export default function parseTemplate(template) {
  const tags = template.match(regex.tag.self) || []

  return tags.reduce((accum, tag) => {

    let textBeforeTag = template.slice(0, template.indexOf(tag)).trim()

    if (textBeforeTag) {
      const textNodes = parseText(textBeforeTag)

      accum = accum.concat(textNodes)

      template = template.replace(textBeforeTag, '')
    }

    accum.push(new ElementNode(tag))

    template = template.replace(tag, '')

    return accum
  }, []);

}