#!/bin/bash

if curl --fail "https://masto.es"; then
	sed "s/<b>masto.es<\/b>.*/<b>masto.es<\/b>: <span class='green'>Funcionando<\/span>/g" index.html | sponge index.html
else
	sed "s/<b>masto.es<\/b>.*/<b>masto.es<\/b>: <span class='red'>Fallando<\/span>/g" index.html | sponge index.html
fi

if curl --fail "https://masto.es/system/accounts/avatars/109/326/388/519/117/627/original/c2702e04351e0b56.jpg" --output avatar.jpg; then
	sed "s/<b>Multimedia<\/b>.*/<b>Multimedia<\/b>: <span class='green'>Funcionando<\/span>/g" index.html | sponge index.html
else
	sed "s/<b>Multimedia<\/b>.*/<b>Multimedia<\/b>: <span class='red'>Fallando<\/span>/g" index.html | sponge index.html
fi

sed "s/Última comprobación.*/Última comprobación: $(date)/g" index.html | sponge index.html
sed "s/Última actualización.*/Última actualización $(date -r index.js)/g" index.html | sponge index.html
