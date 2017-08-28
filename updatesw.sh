#!/usr/bin/env bash
# set -x #echo on
# ADD UNIQUE ID TO SERVICE WORKER FILES ON BUILD TO ENSURE SITE DETECTS CHANGES AND RE-LOADS SITE #
echo 'uniquify service worker files'
# Generate a pseudo UUID
uuid()
{
	local N B C='89ab'

	for (( N=0; N < 16; ++N ))
	do
		B=$(( $RANDOM%256 ))

		case $N in
			6)
				printf '4%x' $(( B%16 ))
				;;
			8)
				printf '%c%x' ${C:$RANDOM%${#C}:1} $(( B%16 ))
				;;
			3 | 5 | 7 | 9)
				printf '%02x-' $B
				;;
			*)
				printf '%02x' $B
				;;
		esac
	done

	echo
}

UUID=$(uuid)

echo "// <do not remove line>[${UUID}]" > temp_file.js
echo "// <do not remove line>[${UUID}]" > temp_file2.js
cat dist/OneSignalSDKWorker.js >> temp_file.js
cat dist/OneSignalSDKUpdaterWorker.js >> temp_file2.js
mv temp_file.js dist/OneSignalSDKWorker.js
mv temp_file2.js dist/OneSignalSDKUpdaterWorker.js
