/// <reference path='../../typings/chrome.d.ts' />

import {Sentence} from "./Sentence";
class BackgroundMain{
    public static initializePageListener() : void{
        chrome.webNavigation.onCompleted.addListener((details) => {

            /**
             * Injection du script
             */
            chrome.tabs.executeScript(details.tabId, {
                file: "jsGenerated/FrontEnd.js",
                runAt: "document_end"
            });

            /**
             * Injection du Style
             */
            chrome.tabs.insertCSS(details.tabId, {
                file: "include/style/frontEnd.style.css",
                runAt : "document_start"
            });

        }, {url: [{urlPrefix: "https://www.projet-voltaire.fr/voltaire/"}]});
    }
    public static initializeMail(){
        chrome.runtime.onMessage.addListener(
            (request : any, sender : any, sendResponse) => {

                let sentence = new Sentence(request.sentence);
                sentence.requestCordial(sendResponse);
            }
        );

    }
    public static initialize():void{
        BackgroundMain.initializePageListener();
        BackgroundMain.initializeMail();
    }
}
BackgroundMain.initialize();