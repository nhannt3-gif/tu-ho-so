#!/bin/sh
# Dựng HanTraHSSV.exe (chạy trên Windows 10/11 có sẵn .NET Framework 4.x) — cần mono-mcs:
#   sudo apt install mono-mcs libmono-system-windows-forms4.0-cil
# Trên Windows có thể dựng bằng csc của .NET Framework:
#   C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe /target:winexe /codepage:65001 /r:System.Windows.Forms.dll /r:System.Drawing.dll /out:HanTraHSSV.exe HanTraHSSV.cs
cd "$(dirname "$0")"
mcs -target:winexe -optimize+ -codepage:utf8 -r:System.Windows.Forms.dll -r:System.Drawing.dll -out:HanTraHSSV.exe HanTraHSSV.cs
