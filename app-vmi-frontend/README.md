# Aplicativo VMI Frontend

A aplicação tem como objetivo atender toda a cadeia pós-venda da VMI Security, desenvolvida para dispositivos mobiles e web em Ionic,
O desenvolvimento em Ionic, deve-se ao fato de ser uma framework em javascript com possibilidade de desenvolver para múltiplas plataformas, pela sua facilidade de manutenção e excelente documentação.

## Configurações de ambiente

Para começar a usar a ferramenta Ionic, o único requisito é uma ambiente **Node e NPM**.
Claro, um editor de código também é necessário. Visual Studio Code é recomendado.

### Terminal
Em geral, é recomendado usar um terminal para builds. A grande maioria dos terminais funcionam com Ionic, mas alguns podem não ser suportados.
Para Windows, ​ **Prompt** de Comando​ e ​ **PowerShell**​ são suportados.
Para macOS, e linux o ​ **Terminal**​ é suportado.

### Node & npm
Quase todas as ferramentas utilizadas em projetos JavaScripts são baseadas em ​ *Node.js​*. A​ ​ página de download​ ​ possui pacotes de instalação pré-construídos para todas as plataformas. É recomendado a versão LTS para garantir melhor compatibilidade.
**Node** é fornecido com ​ **npm**​ , o pacote de gerenciamento para JavaScript. 
Para verificar a instalação, abra um novo terminal e execute:
```bash
$ ​ node --version
$ ​ npm --version
```
## Instalando o Ionic
Os aplicativos Ionic são criados e desenvolvidos principalmente por meio do utilitário de linha de comando Ionic. A CLI Ionic é o método preferido de instalação, pois oferece uma ampla gama de ferramentas de desenvolvimento e opções de ajuda ao longo do caminho. É também a principal ferramenta através da qual o aplicativo é executado e conectado a outros serviços, como o Ionic Appflow.

### Instalando o Ionic CLI
Antes de prosseguir, verifique se o seu computador possui o ​ Node.js​ instalado.
Consulte ​ estas instruções​ para configurar um ambiente para o Ionic.
Instale a CLI Ionic com o npm:
```bash
$ ​ npm install -g @ionic/cli
```
Se houve uma instalação anterior da CLI Ionic, ela precisará ser desinstalada devido a uma alteração no nome do pacote.
```bash
$ ​ npm uninstall -g ionic
$ ​ npm install -g @ionic/cli
```
## Alterações do projeto Ionic

Para alterações no projeto é necessário instalar o módulos da aplicação e para isso basta digitar no terminal o seguinte comando:
```bash
$ ​ npm install
```
ou
```bash
$ npm install -g npm-install-peers
```
em casos de erros

## Build da Aplicação
Para adicionar uma plataforma a aplicação, abra um novo terminal no diretório da aplicação e execute:
```bash
$ ​ ionic cordova platform add (platform)
```
Substituir platform por *android/browser/ios*

## IMPORTANTE!
Após adicionar a plataforma android vá ao diretório onde está o projeto depois *​platforms>android>project.properties*​ e substitua a versão da ​cordova.system.library.5

e substitua por:
```javascript
cordova.system.library.5​ =com.google.firebase:firebase-messaging:20.+
```
Feito isso para buildar a aplicação, abra o terminal no diretório da aplicação e execute:
```bash
$ ​ ionic cordova run (platform) --prod
```
Onde --​ prod ​ é o parâmetro para build em produção. Substituir platform por android/browser/ios

Se tudo ocorrer bem, o apk da aplicação será encontrado em :
*platforms>android>app>build>outputs>apk*


**O arquivo "Documentação Vmi Ionic.pdf" contém mais informações sobre a instalação do ambiente de compilação inclusive sobre a instalação dos emuladores necessários para gerar os builds**