// If the dependencies was changed in "PackageJson.ts" we need to generate a new lock file
export function PnpmLock() {
  return `
  lockfileVersion: '6.0'

  settings:
    autoInstallPeers: true
    excludeLinksFromLockfile: false
  
  devDependencies:
    glob:
      specifier: ^10.3.10
      version: 10.3.10
    vite:
      specifier: ^4.4.5
      version: 4.4.11
  
  packages:
  
    /@esbuild/android-arm64@0.18.20:
      resolution: {integrity: sha512-Nz4rJcchGDtENV0eMKUNa6L12zz2zBDXuhj/Vjh18zGqB44Bi7MBMSXjgunJgjRhCmKOjnPuZp4Mb6OKqtMHLQ==}
      engines: {node: '>=12'}
      cpu: [arm64]
      os: [android]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/android-arm@0.18.20:
      resolution: {integrity: sha512-fyi7TDI/ijKKNZTUJAQqiG5T7YjJXgnzkURqmGj13C6dCqckZBLdl4h7bkhHt/t0WP+zO9/zwroDvANaOqO5Sw==}
      engines: {node: '>=12'}
      cpu: [arm]
      os: [android]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/android-x64@0.18.20:
      resolution: {integrity: sha512-8GDdlePJA8D6zlZYJV/jnrRAi6rOiNaCC/JclcXpB+KIuvfBN4owLtgzY2bsxnx666XjJx2kDPUmnTtR8qKQUg==}
      engines: {node: '>=12'}
      cpu: [x64]
      os: [android]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/darwin-arm64@0.18.20:
      resolution: {integrity: sha512-bxRHW5kHU38zS2lPTPOyuyTm+S+eobPUnTNkdJEfAddYgEcll4xkT8DB9d2008DtTbl7uJag2HuE5NZAZgnNEA==}
      engines: {node: '>=12'}
      cpu: [arm64]
      os: [darwin]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/darwin-x64@0.18.20:
      resolution: {integrity: sha512-pc5gxlMDxzm513qPGbCbDukOdsGtKhfxD1zJKXjCCcU7ju50O7MeAZ8c4krSJcOIJGFR+qx21yMMVYwiQvyTyQ==}
      engines: {node: '>=12'}
      cpu: [x64]
      os: [darwin]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/freebsd-arm64@0.18.20:
      resolution: {integrity: sha512-yqDQHy4QHevpMAaxhhIwYPMv1NECwOvIpGCZkECn8w2WFHXjEwrBn3CeNIYsibZ/iZEUemj++M26W3cNR5h+Tw==}
      engines: {node: '>=12'}
      cpu: [arm64]
      os: [freebsd]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/freebsd-x64@0.18.20:
      resolution: {integrity: sha512-tgWRPPuQsd3RmBZwarGVHZQvtzfEBOreNuxEMKFcd5DaDn2PbBxfwLcj4+aenoh7ctXcbXmOQIn8HI6mCSw5MQ==}
      engines: {node: '>=12'}
      cpu: [x64]
      os: [freebsd]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/linux-arm64@0.18.20:
      resolution: {integrity: sha512-2YbscF+UL7SQAVIpnWvYwM+3LskyDmPhe31pE7/aoTMFKKzIc9lLbyGUpmmb8a8AixOL61sQ/mFh3jEjHYFvdA==}
      engines: {node: '>=12'}
      cpu: [arm64]
      os: [linux]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/linux-arm@0.18.20:
      resolution: {integrity: sha512-/5bHkMWnq1EgKr1V+Ybz3s1hWXok7mDFUMQ4cG10AfW3wL02PSZi5kFpYKrptDsgb2WAJIvRcDm+qIvXf/apvg==}
      engines: {node: '>=12'}
      cpu: [arm]
      os: [linux]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/linux-ia32@0.18.20:
      resolution: {integrity: sha512-P4etWwq6IsReT0E1KHU40bOnzMHoH73aXp96Fs8TIT6z9Hu8G6+0SHSw9i2isWrD2nbx2qo5yUqACgdfVGx7TA==}
      engines: {node: '>=12'}
      cpu: [ia32]
      os: [linux]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/linux-loong64@0.18.20:
      resolution: {integrity: sha512-nXW8nqBTrOpDLPgPY9uV+/1DjxoQ7DoB2N8eocyq8I9XuqJ7BiAMDMf9n1xZM9TgW0J8zrquIb/A7s3BJv7rjg==}
      engines: {node: '>=12'}
      cpu: [loong64]
      os: [linux]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/linux-mips64el@0.18.20:
      resolution: {integrity: sha512-d5NeaXZcHp8PzYy5VnXV3VSd2D328Zb+9dEq5HE6bw6+N86JVPExrA6O68OPwobntbNJ0pzCpUFZTo3w0GyetQ==}
      engines: {node: '>=12'}
      cpu: [mips64el]
      os: [linux]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/linux-ppc64@0.18.20:
      resolution: {integrity: sha512-WHPyeScRNcmANnLQkq6AfyXRFr5D6N2sKgkFo2FqguP44Nw2eyDlbTdZwd9GYk98DZG9QItIiTlFLHJHjxP3FA==}
      engines: {node: '>=12'}
      cpu: [ppc64]
      os: [linux]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/linux-riscv64@0.18.20:
      resolution: {integrity: sha512-WSxo6h5ecI5XH34KC7w5veNnKkju3zBRLEQNY7mv5mtBmrP/MjNBCAlsM2u5hDBlS3NGcTQpoBvRzqBcRtpq1A==}
      engines: {node: '>=12'}
      cpu: [riscv64]
      os: [linux]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/linux-s390x@0.18.20:
      resolution: {integrity: sha512-+8231GMs3mAEth6Ja1iK0a1sQ3ohfcpzpRLH8uuc5/KVDFneH6jtAJLFGafpzpMRO6DzJ6AvXKze9LfFMrIHVQ==}
      engines: {node: '>=12'}
      cpu: [s390x]
      os: [linux]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/linux-x64@0.18.20:
      resolution: {integrity: sha512-UYqiqemphJcNsFEskc73jQ7B9jgwjWrSayxawS6UVFZGWrAAtkzjxSqnoclCXxWtfwLdzU+vTpcNYhpn43uP1w==}
      engines: {node: '>=12'}
      cpu: [x64]
      os: [linux]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/netbsd-x64@0.18.20:
      resolution: {integrity: sha512-iO1c++VP6xUBUmltHZoMtCUdPlnPGdBom6IrO4gyKPFFVBKioIImVooR5I83nTew5UOYrk3gIJhbZh8X44y06A==}
      engines: {node: '>=12'}
      cpu: [x64]
      os: [netbsd]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/openbsd-x64@0.18.20:
      resolution: {integrity: sha512-e5e4YSsuQfX4cxcygw/UCPIEP6wbIL+se3sxPdCiMbFLBWu0eiZOJ7WoD+ptCLrmjZBK1Wk7I6D/I3NglUGOxg==}
      engines: {node: '>=12'}
      cpu: [x64]
      os: [openbsd]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/sunos-x64@0.18.20:
      resolution: {integrity: sha512-kDbFRFp0YpTQVVrqUd5FTYmWo45zGaXe0X8E1G/LKFC0v8x0vWrhOWSLITcCn63lmZIxfOMXtCfti/RxN/0wnQ==}
      engines: {node: '>=12'}
      cpu: [x64]
      os: [sunos]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/win32-arm64@0.18.20:
      resolution: {integrity: sha512-ddYFR6ItYgoaq4v4JmQQaAI5s7npztfV4Ag6NrhiaW0RrnOXqBkgwZLofVTlq1daVTQNhtI5oieTvkRPfZrePg==}
      engines: {node: '>=12'}
      cpu: [arm64]
      os: [win32]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/win32-ia32@0.18.20:
      resolution: {integrity: sha512-Wv7QBi3ID/rROT08SABTS7eV4hX26sVduqDOTe1MvGMjNd3EjOz4b7zeexIR62GTIEKrfJXKL9LFxTYgkyeu7g==}
      engines: {node: '>=12'}
      cpu: [ia32]
      os: [win32]
      requiresBuild: true
      dev: true
      optional: true
  
    /@esbuild/win32-x64@0.18.20:
      resolution: {integrity: sha512-kTdfRcSiDfQca/y9QIkng02avJ+NCaQvrMejlsB3RRv5sE9rRoeBPISaZpKxHELzRxZyLvNts1P27W3wV+8geQ==}
      engines: {node: '>=12'}
      cpu: [x64]
      os: [win32]
      requiresBuild: true
      dev: true
      optional: true
  
    /@isaacs/cliui@8.0.2:
      resolution: {integrity: sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==}
      engines: {node: '>=12'}
      dependencies:
        string-width: 5.1.2
        string-width-cjs: /string-width@4.2.3
        strip-ansi: 7.1.0
        strip-ansi-cjs: /strip-ansi@6.0.1
        wrap-ansi: 8.1.0
        wrap-ansi-cjs: /wrap-ansi@7.0.0
      dev: true
  
    /@pkgjs/parseargs@0.11.0:
      resolution: {integrity: sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==}
      engines: {node: '>=14'}
      requiresBuild: true
      dev: true
      optional: true
  
    /ansi-regex@5.0.1:
      resolution: {integrity: sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==}
      engines: {node: '>=8'}
      dev: true
  
    /ansi-regex@6.0.1:
      resolution: {integrity: sha512-n5M855fKb2SsfMIiFFoVrABHJC8QtHwVx+mHWP3QcEqBHYienj5dHSgjbxtC0WEZXYt4wcD6zrQElDPhFuZgfA==}
      engines: {node: '>=12'}
      dev: true
  
    /ansi-styles@4.3.0:
      resolution: {integrity: sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==}
      engines: {node: '>=8'}
      dependencies:
        color-convert: 2.0.1
      dev: true
  
    /ansi-styles@6.2.1:
      resolution: {integrity: sha512-bN798gFfQX+viw3R7yrGWRqnrN2oRkEkUjjl4JNn4E8GxxbjtG3FbrEIIY3l8/hrwUwIeCZvi4QuOTP4MErVug==}
      engines: {node: '>=12'}
      dev: true
  
    /balanced-match@1.0.2:
      resolution: {integrity: sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==}
      dev: true
  
    /brace-expansion@2.0.1:
      resolution: {integrity: sha512-XnAIvQ8eM+kC6aULx6wuQiwVsnzsi9d3WxzV3FpWTGA19F621kwdbsAcFKXgKUHZWsy+mY6iL1sHTxWEFCytDA==}
      dependencies:
        balanced-match: 1.0.2
      dev: true
  
    /color-convert@2.0.1:
      resolution: {integrity: sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==}
      engines: {node: '>=7.0.0'}
      dependencies:
        color-name: 1.1.4
      dev: true
  
    /color-name@1.1.4:
      resolution: {integrity: sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==}
      dev: true
  
    /cross-spawn@7.0.3:
      resolution: {integrity: sha512-iRDPJKUPVEND7dHPO8rkbOnPpyDygcDFtWjpeWNCgy8WP2rXcxXL8TskReQl6OrB2G7+UJrags1q15Fudc7G6w==}
      engines: {node: '>= 8'}
      dependencies:
        path-key: 3.1.1
        shebang-command: 2.0.0
        which: 2.0.2
      dev: true
  
    /eastasianwidth@0.2.0:
      resolution: {integrity: sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA==}
      dev: true
  
    /emoji-regex@8.0.0:
      resolution: {integrity: sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==}
      dev: true
  
    /emoji-regex@9.2.2:
      resolution: {integrity: sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==}
      dev: true
  
    /esbuild@0.18.20:
      resolution: {integrity: sha512-ceqxoedUrcayh7Y7ZX6NdbbDzGROiyVBgC4PriJThBKSVPWnnFHZAkfI1lJT8QFkOwH4qOS2SJkS4wvpGl8BpA==}
      engines: {node: '>=12'}
      hasBin: true
      requiresBuild: true
      optionalDependencies:
        '@esbuild/android-arm': 0.18.20
        '@esbuild/android-arm64': 0.18.20
        '@esbuild/android-x64': 0.18.20
        '@esbuild/darwin-arm64': 0.18.20
        '@esbuild/darwin-x64': 0.18.20
        '@esbuild/freebsd-arm64': 0.18.20
        '@esbuild/freebsd-x64': 0.18.20
        '@esbuild/linux-arm': 0.18.20
        '@esbuild/linux-arm64': 0.18.20
        '@esbuild/linux-ia32': 0.18.20
        '@esbuild/linux-loong64': 0.18.20
        '@esbuild/linux-mips64el': 0.18.20
        '@esbuild/linux-ppc64': 0.18.20
        '@esbuild/linux-riscv64': 0.18.20
        '@esbuild/linux-s390x': 0.18.20
        '@esbuild/linux-x64': 0.18.20
        '@esbuild/netbsd-x64': 0.18.20
        '@esbuild/openbsd-x64': 0.18.20
        '@esbuild/sunos-x64': 0.18.20
        '@esbuild/win32-arm64': 0.18.20
        '@esbuild/win32-ia32': 0.18.20
        '@esbuild/win32-x64': 0.18.20
      dev: true
  
    /foreground-child@3.1.1:
      resolution: {integrity: sha512-TMKDUnIte6bfb5nWv7V/caI169OHgvwjb7V4WkeUvbQQdjr5rWKqHFiKWb/fcOwB+CzBT+qbWjvj+DVwRskpIg==}
      engines: {node: '>=14'}
      dependencies:
        cross-spawn: 7.0.3
        signal-exit: 4.1.0
      dev: true
  
    /fsevents@2.3.3:
      resolution: {integrity: sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==}
      engines: {node: ^8.16.0 || ^10.6.0 || >=11.0.0}
      os: [darwin]
      requiresBuild: true
      dev: true
      optional: true
  
    /glob@10.3.10:
      resolution: {integrity: sha512-fa46+tv1Ak0UPK1TOy/pZrIybNNt4HCv7SDzwyfiOZkvZLEbjsZkJBPtDHVshZjbecAoAGSC20MjLDG/qr679g==}
      engines: {node: '>=16 || 14 >=14.17'}
      hasBin: true
      dependencies:
        foreground-child: 3.1.1
        jackspeak: 2.3.6
        minimatch: 9.0.3
        minipass: 7.0.4
        path-scurry: 1.10.1
      dev: true
  
    /is-fullwidth-code-point@3.0.0:
      resolution: {integrity: sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==}
      engines: {node: '>=8'}
      dev: true
  
    /isexe@2.0.0:
      resolution: {integrity: sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==}
      dev: true
  
    /jackspeak@2.3.6:
      resolution: {integrity: sha512-N3yCS/NegsOBokc8GAdM8UcmfsKiSS8cipheD/nivzr700H+nsMOxJjQnvwOcRYVuFkdH0wGUvW2WbXGmrZGbQ==}
      engines: {node: '>=14'}
      dependencies:
        '@isaacs/cliui': 8.0.2
      optionalDependencies:
        '@pkgjs/parseargs': 0.11.0
      dev: true
  
    /lru-cache@10.0.1:
      resolution: {integrity: sha512-IJ4uwUTi2qCccrioU6g9g/5rvvVl13bsdczUUcqbciD9iLr095yj8DQKdObriEvuNSx325N1rV1O0sJFszx75g==}
      engines: {node: 14 || >=16.14}
      dev: true
  
    /minimatch@9.0.3:
      resolution: {integrity: sha512-RHiac9mvaRw0x3AYRgDC1CxAP7HTcNrrECeA8YYJeWnpo+2Q5CegtZjaotWTWxDG3UeGA1coE05iH1mPjT/2mg==}
      engines: {node: '>=16 || 14 >=14.17'}
      dependencies:
        brace-expansion: 2.0.1
      dev: true
  
    /minipass@7.0.4:
      resolution: {integrity: sha512-jYofLM5Dam9279rdkWzqHozUo4ybjdZmCsDHePy5V/PbBcVMiSZR97gmAy45aqi8CK1lG2ECd356FU86avfwUQ==}
      engines: {node: '>=16 || 14 >=14.17'}
      dev: true
  
    /nanoid@3.3.6:
      resolution: {integrity: sha512-BGcqMMJuToF7i1rt+2PWSNVnWIkGCU78jBG3RxO/bZlnZPK2Cmi2QaffxGO/2RvWi9sL+FAiRiXMgsyxQ1DIDA==}
      engines: {node: ^10 || ^12 || ^13.7 || ^14 || >=15.0.1}
      hasBin: true
      dev: true
  
    /path-key@3.1.1:
      resolution: {integrity: sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==}
      engines: {node: '>=8'}
      dev: true
  
    /path-scurry@1.10.1:
      resolution: {integrity: sha512-MkhCqzzBEpPvxxQ71Md0b1Kk51W01lrYvlMzSUaIzNsODdd7mqhiimSZlr+VegAz5Z6Vzt9Xg2ttE//XBhH3EQ==}
      engines: {node: '>=16 || 14 >=14.17'}
      dependencies:
        lru-cache: 10.0.1
        minipass: 7.0.4
      dev: true
  
    /picocolors@1.0.0:
      resolution: {integrity: sha512-1fygroTLlHu66zi26VoTDv8yRgm0Fccecssto+MhsZ0D/DGW2sm8E8AjW7NU5VVTRt5GxbeZ5qBuJr+HyLYkjQ==}
      dev: true
  
    /postcss@8.4.31:
      resolution: {integrity: sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==}
      engines: {node: ^10 || ^12 || >=14}
      dependencies:
        nanoid: 3.3.6
        picocolors: 1.0.0
        source-map-js: 1.0.2
      dev: true
  
    /rollup@3.29.4:
      resolution: {integrity: sha512-oWzmBZwvYrU0iJHtDmhsm662rC15FRXmcjCk1xD771dFDx5jJ02ufAQQTn0etB2emNk4J9EZg/yWKpsn9BWGRw==}
      engines: {node: '>=14.18.0', npm: '>=8.0.0'}
      hasBin: true
      optionalDependencies:
        fsevents: 2.3.3
      dev: true
  
    /shebang-command@2.0.0:
      resolution: {integrity: sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==}
      engines: {node: '>=8'}
      dependencies:
        shebang-regex: 3.0.0
      dev: true
  
    /shebang-regex@3.0.0:
      resolution: {integrity: sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==}
      engines: {node: '>=8'}
      dev: true
  
    /signal-exit@4.1.0:
      resolution: {integrity: sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==}
      engines: {node: '>=14'}
      dev: true
  
    /source-map-js@1.0.2:
      resolution: {integrity: sha512-R0XvVJ9WusLiqTCEiGCmICCMplcCkIwwR11mOSD9CR5u+IXYdiseeEuXCVAjS54zqwkLcPNnmU4OeJ6tUrWhDw==}
      engines: {node: '>=0.10.0'}
      dev: true
  
    /string-width@4.2.3:
      resolution: {integrity: sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==}
      engines: {node: '>=8'}
      dependencies:
        emoji-regex: 8.0.0
        is-fullwidth-code-point: 3.0.0
        strip-ansi: 6.0.1
      dev: true
  
    /string-width@5.1.2:
      resolution: {integrity: sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==}
      engines: {node: '>=12'}
      dependencies:
        eastasianwidth: 0.2.0
        emoji-regex: 9.2.2
        strip-ansi: 7.1.0
      dev: true
  
    /strip-ansi@6.0.1:
      resolution: {integrity: sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==}
      engines: {node: '>=8'}
      dependencies:
        ansi-regex: 5.0.1
      dev: true
  
    /strip-ansi@7.1.0:
      resolution: {integrity: sha512-iq6eVVI64nQQTRYq2KtEg2d2uU7LElhTJwsH4YzIHZshxlgZms/wIc4VoDQTlG/IvVIrBKG06CrZnp0qv7hkcQ==}
      engines: {node: '>=12'}
      dependencies:
        ansi-regex: 6.0.1
      dev: true
  
    /vite@4.4.11:
      resolution: {integrity: sha512-ksNZJlkcU9b0lBwAGZGGaZHCMqHsc8OpgtoYhsQ4/I2v5cnpmmmqe5pM4nv/4Hn6G/2GhTdj0DhZh2e+Er1q5A==}
      engines: {node: ^14.18.0 || >=16.0.0}
      hasBin: true
      peerDependencies:
        '@types/node': '>= 14'
        less: '*'
        lightningcss: ^1.21.0
        sass: '*'
        stylus: '*'
        sugarss: '*'
        terser: ^5.4.0
      peerDependenciesMeta:
        '@types/node':
          optional: true
        less:
          optional: true
        lightningcss:
          optional: true
        sass:
          optional: true
        stylus:
          optional: true
        sugarss:
          optional: true
        terser:
          optional: true
      dependencies:
        esbuild: 0.18.20
        postcss: 8.4.31
        rollup: 3.29.4
      optionalDependencies:
        fsevents: 2.3.3
      dev: true
  
    /which@2.0.2:
      resolution: {integrity: sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==}
      engines: {node: '>= 8'}
      hasBin: true
      dependencies:
        isexe: 2.0.0
      dev: true
  
    /wrap-ansi@7.0.0:
      resolution: {integrity: sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==}
      engines: {node: '>=10'}
      dependencies:
        ansi-styles: 4.3.0
        string-width: 4.2.3
        strip-ansi: 6.0.1
      dev: true
  
    /wrap-ansi@8.1.0:
      resolution: {integrity: sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==}
      engines: {node: '>=12'}
      dependencies:
        ansi-styles: 6.2.1
        string-width: 5.1.2
        strip-ansi: 7.1.0
      dev: true  
  `;
}