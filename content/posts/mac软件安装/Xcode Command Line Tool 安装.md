# Xcode Command Line Tool 安装

## 1. 介绍
Xcode Command Line Tool是Mac OS上的一套在终端上运行的开发工具。

Mac OS并不包含开箱即用的编程所需的所有软件和工具。 相反，Apple 为程序员提供了一个名为 Xcode 的完整开发环境，可以单独下载和安装。 完整的 Xcode 包非常庞大，需要超过 40GB 的磁盘空间，并且支持所有 Apple 操作系统的开发。 许多软件开发人员，尤其是 Web 应用程序开发人员，使用 Mac，但并不只为 Apple 设备开发软件。 他们仍然需要使用 Xcode 包安装的类 Unix 工具和实用程序。 幸运的是，Apple 提供了一个单独且小得多的下载，即 Xcode Command Line Tools，它可以安装软件开发最需要的实用程序。 

Xcode Command Line Tool 提供了 git，gcc，make 等常用的命令。具体包含哪些，使用如下命令查看：
```
ls /Library/Developer/CommandLineTools/usr/bin/
```

```
~ » ls /Library/Developer/CommandLineTools/usr/bin/                                                                            lin@lin-mac
2to3                      cmpdylib                  headerdoc2html            notarytool                swift-api-extract
2to3-3.9                  codesign_allocate         indent                    objdump                   swift-build
DeRez                     codesign_allocate-p       install_name_tool         otool                     swift-demangle
GetFileInfo               cpp                       ld                        otool-classic             swift-experimental-sdk
ResMerger                 crashlog                  ld-classic                pagestuff                 swift-frontend
Rez                       ctags                     lex                       pip3                      swift-package
SetFile                   ctf_insert                libtool                   pip3.9                    swift-package-collection
SplitForks                dsymutil                  lipo                      pydoc3                    swift-package-registry
ar                        dwarfdump                 lldb                      pydoc3.9                  swift-plugin-server
as                        flex                      llvm-cov                  python3                   swift-run
asa                       flex++                    llvm-cxxfilt              python3.9                 swift-stdlib-tool
bison                     g++                       llvm-dwarfdump            ranlib                    swift-symbolgraph-extract
bitcode_strip             gatherheaderdoc           llvm-nm                   resolveLinks              swift-test
c++                       gcc                       llvm-objdump              rpcgen                    swiftc
c++filt                   gcov                      llvm-otool                scalar                    tapi
c89                       git                       llvm-profdata             segedit                   tapi-analyze
c99                       git-receive-pack          llvm-size                 size                      unifdef
cache-build-session       git-shell                 lorder                    size-classic              unifdefall
cc                        git-upload-archive        m4                        sourcekit-lsp             unwinddump
clang                     git-upload-pack           make                      stapler                   vtool
clang++                   gm4                       mig                       strings                   xcindex-test
clang-cache               gnumake                   nm                        strip                     xml2man
clang-stat-cache          gperf                     nm-classic                swift                     yacc
clangd                    hdxml2manxml              nmedit                    swift-api-digester
```


## 2. 安装使用

### 安装
```
xcode-select --install
```
这将启动一个弹出窗口，询问您是否想要安装Xcode命令行工具。单击“安装”按钮并遵循屏幕上的提示即可完成安装

### 查看版本
```
xcode-select -v
```

### 卸载
```
sudo rm -rf /Library/Developer/CommandLineTools
```