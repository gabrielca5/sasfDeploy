$ErrorActionPreference = 'Continue'
Set-Location $PSScriptRoot

function Test-Up {
  try { (Invoke-WebRequest -Uri 'http://localhost:5173' -TimeoutSec 2 -UseBasicParsing) | Out-Null; return $true }
  catch { return $false }
}

$started = $false
if (-not (Test-Up)) {
  Write-Output "Dev server nao detectado — iniciando 'npm run dev'..."
  Start-Process -FilePath 'cmd.exe' -ArgumentList '/c','npm run dev > dev_server.log 2>&1' -WindowStyle Hidden
  $started = $true
} else {
  Write-Output "Dev server ja esta no ar em :5173"
}

for ($i = 0; $i -lt 90; $i++) {
  if (Test-Up) { break }
  Start-Sleep -Seconds 1
}

if (-not (Test-Up)) {
  Write-Output "ERRO: dev server nao subiu em 90s. Veja dev_server.log"
  exit 2
}

Write-Output "Servidor pronto. Rodando teste E2E (Chrome visivel)..."
$env:SLOWMO = '80'
node pw_cadastro_e2e.js
$code = $LASTEXITCODE
Write-Output "EXIT_CODE=$code"
exit $code
