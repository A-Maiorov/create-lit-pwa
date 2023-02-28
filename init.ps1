$tplPath = $args[0] + "template\*"
$pwaTitle = $args[1]
$pwaId = $args[3]
$pwaPrefix = $args[2]

Copy-Item -Path $tplPath -Destination . -Recurse 

Get-ChildItem -Path . -Include "*.html", "*.json" -File -Recurse -ErrorAction SilentlyContinue | 
ForEach { (Get-Content $_ | ForEach { $_ -replace 'litpwatitleplaceholder', $pwaTitle }) | Set-Content $_ }

Get-ChildItem -Path . -Include "*.html", "*.json" -File -Recurse -ErrorAction SilentlyContinue | 
ForEach { (Get-Content $_ | ForEach { $_ -replace 'litpwapackagenameplaceholder', $pwaId }) | Set-Content $_ }

Get-ChildItem -Path . -Include "*.ts", "*.js", "*.html" -File -Recurse -ErrorAction SilentlyContinue | 
ForEach { (Get-Content $_ | ForEach { $_ -replace 'litpwaelementprefixplaceholder', $pwaPrefix }) | Set-Content $_ }

npm i