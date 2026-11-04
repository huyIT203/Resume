import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const layers = ['shared', 'features', 'pages', 'app']

export function dependencyViolation(from, to) {
  const [fromLayer, fromSlice] = from.split('/')
  const [toLayer, toSlice] = to.split('/')
  const fromRank = layers.indexOf(fromLayer)
  const toRank = layers.indexOf(toLayer)
  if (fromRank === -1 || toRank === -1) return null
  if (toRank > fromRank) return 'Dependencies must point toward lower layers'
  if (fromLayer === toLayer && ['features', 'pages'].includes(fromLayer) && fromSlice !== toSlice) {
    return 'Sibling pages/features must be composed by a higher layer'
  }
  return null
}

export function checkArchitecture(root = process.cwd()) {
  const src = path.join(root, 'src')
  const configFile = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile)
  if (configFile.error)
    throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'))
  const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root)
  const files = config.fileNames
    .map((file) => path.resolve(file))
    .filter((file) => file.startsWith(src + path.sep))
  if (files.length === 0) throw new Error('No source files found; architecture checks cannot run')
  const errors = []
  const graph = new Map()
  const relative = (file) => path.relative(src, file).split(path.sep).join('/')

  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(file, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    )
    const dependencies = []
    const inspect = (node) => {
      let specifier
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
        specifier = node.moduleSpecifier
      else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword)
        specifier = node.arguments[0]
      else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument))
        specifier = node.argument.literal
      if (specifier && ts.isStringLiteralLike(specifier)) {
        const name = specifier.text
        if (name.startsWith('.') || name.startsWith('@/')) {
          const resolvedModule = ts.resolveModuleName(name, file, config.options, ts.sys)
            .resolvedModule?.resolvedFileName
          const resolved = resolvedModule ? path.resolve(resolvedModule) : undefined
          const asset = name.startsWith('@/')
            ? path.join(src, name.slice(2))
            : path.resolve(path.dirname(file), name)
          if (!resolved && !fs.existsSync(asset))
            errors.push(`${relative(file)}: Unresolved import ${name}`)
          if (resolved && resolved.startsWith(src + path.sep)) {
            dependencies.push(resolved)
            const violation = dependencyViolation(relative(file), relative(resolved))
            if (violation) errors.push(`${relative(file)} → ${relative(resolved)}: ${violation}`)
          }
        }
      }
      ts.forEachChild(node, inspect)
    }
    inspect(source)
    graph.set(file, dependencies)
  }

  const visiting = new Set()
  const visited = new Set()
  const visit = (file, trail = []) => {
    if (visiting.has(file)) {
      errors.push(`Import cycle: ${[...trail, file].map(relative).join(' → ')}`)
      return
    }
    if (visited.has(file)) return
    visiting.add(file)
    for (const dependency of graph.get(file) ?? []) visit(dependency, [...trail, file])
    visiting.delete(file)
    visited.add(file)
  }
  for (const file of graph.keys()) visit(file)
  return { errors, fileCount: files.length }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { errors, fileCount } = checkArchitecture()
  if (errors.length) {
    console.error(errors.join('\n'))
    process.exitCode = 1
  } else console.log(`Architecture checks passed for ${fileCount} source files.`)
}
