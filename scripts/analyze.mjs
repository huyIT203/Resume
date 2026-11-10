import path from 'node:path'
import ts from 'typescript'

const configPath = ts.findConfigFile(process.cwd(), ts.sys.fileExists, 'tsconfig.json')
if (!configPath) throw new Error('tsconfig.json not found')
const config = ts.readConfigFile(configPath, ts.sys.readFile)
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'))
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, path.dirname(configPath))
const program = ts.createProgram(parsed.fileNames, {
  ...parsed.options,
  noEmit: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
})
// Keep the MCP source verbatim, including its unused cirrus constant.
const vendorFile = path.resolve('src/components/originkit/ui/cloud-sky-03.tsx')
const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)].filter(
  (diagnostic) =>
    !(
      diagnostic.code === 6133 &&
      diagnostic.file &&
      path.resolve(diagnostic.file.fileName) === vendorFile &&
      ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n') ===
        "'CIRRUS_DRIFT' is declared but its value is never read."
    ),
)
if (diagnostics.length) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      getNewLine: () => ts.sys.newLine,
    }),
  )
  process.exitCode = 1
}
