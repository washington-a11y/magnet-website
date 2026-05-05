#!/bin/bash
# Run this once while Figma is open to pull all local assets into public/assets.
# Usage: bash scripts/download-assets.sh

set -e
DEST="$(dirname "$0")/../public/assets"
mkdir -p "$DEST"

BASE="http://localhost:3845/assets"

assets=(
  "0752151161faa969249a2092707a5c2b8ea43b4f.png"
  "09c6e3847c2a9da11f17d5976e22d9e379752999.svg"
  "0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png"
  "1abd614a8fc8eecfdb31f407b7f412f6187977b5.svg"
  "280f2250d66a9c75ad075b72b10a7b29f8541f84.svg"
  "2e5d62fd69e0fb7ae5669ad870131a87902719c5.svg"
  "3060bc63b25193d203a6a0bcc8c7fca8c28c3df3.png"
  "30f40dd0e8d630d95986ae3bc87f3bc9f2ca284b.svg"
  "34a5f835f54ad0f8263cebeded849b7f8f78548d.svg"
  "36dfdab13d470f1cedc8845d1a22a5425beed4ff.svg"
  "37ab8e7c17520009f6edc01061fcf1609a2341e8.svg"
  "3d73bff43847107234ad568316f21dd2e1918653.png"
  "3d905369f3d2619d6cc19df2a6db734ca80d79cf.svg"
  "3e250ee9c3916049529f40ff730339ba83248388.png"
  "3e2629b56c31f21c4b03753658638044716b853b.svg"
  "41fba5acd42a6b72dbb6b9903ddb58ae8130ad71.svg"
  "43adfb967cb30121a49fd2aedf25d0a3e740acf8.png"
  "43fbd1bbb3d3a3e249e03c79b9ca211a2cbdb973.png"
  "4d398202905b0e70152ceb1cc8476cc0bd55af24.svg"
  "4f42e92c380197238bb55cca677c987ffb62ab7e.svg"
  "54981ac01f676b8630d69c2998ac170543dc058c.svg"
  "5bf92d92120899ea625773fc465a6a74df5decfa.svg"
  "61aa992793c1430c855f0a55a462f7cdace9b080.svg"
  "68abfc13d7ccaec57e93ae611ce73d1be87a4d83.svg"
  "6d774790104d0cb6fcd56ada474b7ad2abfdae42.svg"
  "714abcd3e8cb1f8571b281786c0effc8828750fa.svg"
  "74eedc4876e73c3efff47e73a1ab172fcf2345f0.svg"
  "79f4c69a18de5baf839446384307f085fd15a31a.png"
  "7f68765c7b3c7d95adb2ff34d7c9b715db5392b3.png"
  "832b31364304dc024a9d95606cc195f0c6d867fa.svg"
  "8688675135c75e4f2ba8e3e02f349d55387287f1.svg"
  "87c3d4ed9eac32e0cc620d2b7afe0734556df8cf.svg"
  "942e91d951eb14cbb7e72e650f00fcca3bb0b037.png"
  "9765a166d08477b82315c7b42431cf7010e44222.png"
  "9faad5bf3d4f78f8e9d90af477654607626b6168.png"
  "a0d43afc8112fbe95229601fe597a5b3c88ca65c.png"
  "a25b6b5ffc7a5e030ab80baedc939135f1af4c72.png"
  "a7d506ddb0d4708d78c4b7abea26668e69a7cc31.png"
  "b121895865d4d90aa11d08b92e06de70780fb577.svg"
  "06d75213a82ca6ab4ccbfd6f14a5a1cf7c0b5682.svg"
  "01a5a20bb1d17468808014a8599af1e5c341d6a5.svg"
  "9f0df09b188077ac42b0c6a4e841c8c4b3a5bdf4.svg"
  "18c75eec11d300f03e92dd2f7824bf70f06a841c.svg"
  "57a4102024d58cfedde822d861444b49cb864b91.svg"
  "b26ad21cd114f5a0799cb0e084f0474030a60ff3.svg"
  "c1b8de66591eb992fe5106fe70f217b8f3b6a390.svg"
  "c7d13a0a8c7c53f021e0ca1578dd61043a8ad36b.svg"
  "c889f38fce03a6ae9c3472b1e5ca9ac76a85fd00.svg"
  "c978a3271c9c7951c04cf4e98d4b49b61d54419c.svg"
  "d0b77ce149b1f99de71fcc1a20043ef02022cbc8.png"
  "d29099a355c65750667c69a33a39dc4ce6897c90.png"
  "d376bbfaf87b16b9f1819c6e1f2cbaa6e67ff3a7.svg"
  "d3f6da31a406b372959221c94a6b294a784e262e.png"
  "d7d92b39dd5e592722d0848974ed64eafb321f5c.png"
  "e3a1032c2e0214c275d68511daa612859b7e7d3c.png"
  "e3b1833c7b3d8d79e0d2faecc07682d205ff0961.svg"
  "e629751f536d67c0c11462459e513c38c37526f1.svg"
  "ee48e31e9c6ce2362b7eb8e8b95bf54f278f3509.svg"
  "efc2050eaeeb437c5dbe262e760da8354b510874.svg"
  "f396358826920d0fcfe97c1734fcc79e717e1ab6.svg"
  "f5794adda0f69053da568b3b48b1fff3132414f4.png"
  "fe40aa7c31db576d420704a8ac0a7e24a1457288.png"
)

success=0
failed=0

for asset in "${assets[@]}"; do
  out="$DEST/$asset"
  if [ -f "$out" ]; then
    echo "skip  $asset (already exists)"
    ((success++))
  elif curl -sf "$BASE/$asset" -o "$out"; then
    echo "ok    $asset"
    ((success++))
  else
    echo "FAIL  $asset"
    ((failed++))
  fi
done

echo ""
echo "────────────────────────────"
echo "✓ $success  ✗ $failed"

if [ $failed -gt 0 ]; then
  echo "Some assets failed — make sure Figma is open and the MCP plugin is active, then re-run."
  exit 1
fi

echo "All assets saved to public/assets/"
echo "Now run: git add public/assets && git commit -m 'chore: add local figma assets to public folder'"
