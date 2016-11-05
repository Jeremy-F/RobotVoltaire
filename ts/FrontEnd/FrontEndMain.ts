import {Sentence} from "./Sentence";
/**
 * Created by jeremyfornarino on 04/11/2016.
 */
export class FrontEndMain{
    public static getExtensionID(){
        return "momckbohdkhegcimglcfoacgkjmjcdpg";
    }
    private static initializeListenerOnLaunchingTest() : void {
        setInterval(() => {
            if(document.querySelector(".sentence") !== null &&
               document.querySelector("#helpButton") === null){
                FrontEndMain.createHelpButton();
            }
        },500);/*
        var activityCellDivs : NodeList = document.querySelectorAll(".activityCellDiv");
        if(activityCellDivs !== null){
            for(let i = 0; i < activityCellDivs.length; i++){
                let div = activityCellDivs[i];
                div.addEventListener("click", (clickEvent) => {
                    let interval = setInterval(() => {
                        if(document.querySelector("body > div.sheetView > div.sheetCenter > div.sheetContainer.trainingSheetContainer > div > div.middleDiv > div.middleQuestionDiv > div.noMistakeContainer > div") !== null){
                            clearInterval(interval);
                        }
                    }, 100*5);
                });
            }
        }else{
            throw new Error("Impossible de trouver la celule active");
        }*/
    }
    private static createHelpButton() : void {
        let noMistakeView = document.querySelector("body > div.sheetView > div.sheetCenter > div.sheetContainer.trainingSheetContainer > div > div.middleDiv > div.middleQuestionDiv > div.noMistakeContainer > div");
        let helpButton : Element = document.createElement("button");
        helpButton.setAttribute("id", "helpButton");
        helpButton.innerHTML = "Help";
        helpButton.addEventListener("click", () => {
            FrontEndMain.needHelp();
        });
        noMistakeView.appendChild(helpButton);
    }
    public static initialize() : void {

        FrontEndMain.initializeListenerOnLaunchingTest();
    }

    private static needHelp() {
        let phrase = new Sentence(document.querySelector(".sentence"));
        phrase.getErrorAndPrintHelp();
    }


}
let interval = setInterval(() => {
    if(document.querySelectorAll(".activityCellDiv").length > 0){
        clearInterval(interval);
        FrontEndMain.initialize();
    }
}, 100*5);