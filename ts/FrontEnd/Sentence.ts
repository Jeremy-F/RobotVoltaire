/// <reference path='../../typings/chrome.d.ts' />
import {CordialError} from "../Background/CordialError";
import request = chrome.permissions.request;
export class Sentence{
    private sentenceDiv : Element;
    private sentence : string;

    constructor(sentenceDiv : Element){
        this.sentenceDiv = sentenceDiv;
        this.sentence = this.sentenceDiv.textContent;
    }
    public getErrorAndPrintHelp() {
        chrome.runtime.sendMessage("momckbohdkhegcimglcfoacgkjmjcdpg", {
            "sentence" : this.sentence
        }, (response) => {Sentence.printHelp(response)});
    }
    private static printHelp(response : Array<CordialError>){
        let questionContent = document.querySelector("body > div.sheetView > div.sheetCenter > div.sheetContainer.trainingSheetContainer > div > div.topDiv");
        let newDiv = document.createElement("div");
        if(typeof(response) !== "undefined" && response.length > 0){
            let ul = document.createElement("ul");
            for(let i = 0; i < response.length; i++){
                Sentence.printError(response[i], ul);
                Sentence.printUnderligne(response[i]);
            }
            newDiv.appendChild(ul);
        }else{
            newDiv.innerHTML = "Aucune erreur détecté par le site Cordial-En-Ligne. Vérifiez bien la phrase.";
        }
        questionContent.appendChild(newDiv);
    }

    private static printError(cordialError: CordialError, ul: HTMLUListElement|HTMLElement) {

        let li = document.createElement("li");
        li.innerHTML = Sentence.bbCodeToHTML(cordialError.message) + "(" + cordialError.percent + "% d'être exacte)";

        ul.appendChild(li);
    }
    private static bbCodeToHTML(message : string){
        return message.replace(/[\[]/g, "<").replace(/[\]]/g, ">");
    }

    private static printUnderligne(cordialError: CordialError) {
        var spanWords = document.querySelectorAll(".pointAndClickSpan");
        var spanWord : Element = spanWords[0];
        var totalLength = spanWord.textContent.length;
        for(var i = 1; i < spanWords.length && totalLength <= cordialError.start; i++){
            spanWord = spanWords[i];
            totalLength += spanWord.textContent.length;
        }
        spanWord.classList.add("answerWord");
    }
}