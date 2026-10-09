# Builds dist/vzy-popup-blocker.zip with manifest.json at the zip root.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$files = @("manifest.json", "background.js", "remove.js", "popup.html", "popup.js", "icons")
$out = "dist/vzy-popup-blocker.zip"

New-Item -ItemType Directory -Force dist | Out-Null
if (Test-Path $out) { Remove-Item $out }
Compress-Archive -Path $files -DestinationPath $out
Write-Host "Built $out"
