import setWatcher, { Dep } from './watcher'

const utils = {
  firstOrNull: (maybeArray, defaultValue = null) => Array.isArray(maybeArray) ? maybeArray[0] : defaultValue
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
}


const tokenize = {
  tempateTags(template) {
    const tags = template.match(regex.tag.self) || []
    return tags.map(t => {
      const rv = {
        tag: t,
        name: this.tagName(t),
        kind: this.tagKind(t),
        directives: this.tagDirectives(t),
        staticAttrs: this.tagStaticAttrs(t),
        dynamicAttrs: [],
      }
      rv.dynamicAttrs = this.tagDynamicAttrs(t).filter(x => (
        !rv.directives.jFor.includes(x) &&
        !rv.directives.jIf.includes(x) &&
        !rv.directives.jElse.includes(x))
      )
      return rv
    })
  },
  tagName(tag) {
    const match = tag.match(regex.tag.name)
    if (match) {
      const name = match[0].replace(/\W/g, '')
      return name
    }
    return ''
  },
  tagKind(tag) {
    if (regex.tag.kind.selfClosing.test(tag)) return 'selfClosing'
    else if (regex.tag.kind.closing.test(tag)) return 'closing'
    else if (regex.tag.kind.opening.test(tag)) return 'opening'
    else throw new Error('could not tokenize tag: ' + tag)
  },
  tagStaticAttrs(tag) {
    return tag.match(regex.tag.attrs.static) || []
  },
  tagDynamicAttrs(tag) {
    return tag.match(regex.tag.attrs.dynamic) || []
  },
  tagDirectives(tag) {
    return {
      jFor: tag.match(regex.tag.directives.jFor) || [],
      jIf: tag.match(regex.tag.directives.jIf) || [],
      jElse: tag.match(regex.tag.directives.jElse) || [],
    }
  } 
}


/**
 * 
 * @param {string} template 
 */
export default function compileTemplate(template) {
  const tokenizedTags = tokenize.tempateTags(template)
  console.log(tokenizedTags)

  return () => ''
}