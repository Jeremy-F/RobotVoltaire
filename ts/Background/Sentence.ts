import {CordialError} from "./CordialError";
export class Sentence{
    private sentence : string;

    constructor(sentence : string){
        this.sentence = sentence;
    }
    public requestCordial(sendResponse) : void{
        let url = "http://195.154.100.114:80/api/textchecker/correct_logged";
        var httpRequest = new XMLHttpRequest();
        // false désactive l'asynchronisme
        httpRequest.open("POST", url, false);
        httpRequest.setRequestHeader("Content-Type", "application/xml; charset=utf-8");

        httpRequest.send("<RequestData><details>"+this.sentence+"</details><userlogin>AmisAutheurMerci@aut.fr</userlogin></RequestData>");
        let cordialError = Sentence.getCordialResult(httpRequest.responseXML);
        sendResponse(cordialError);
    }

    private static getCordialResult(xmlRequest : XMLDocument) : CordialError[] {
        let responseData : Node = xmlRequest.childNodes.item(0);
        let textCorrectedNode : Node = responseData.childNodes.item(0).childNodes.item(0);
        let xmlCorrected : XMLDocument = new DOMParser().parseFromString(textCorrectedNode.textContent, 'text/xml');
        let errors : NodeList = xmlCorrected.querySelectorAll("error");

        let returnErrors : Array<CordialError> = [];
        for(let i = 0; i < errors.length; i++){
            let error : Element = <Element> errors[i];
            let message : string = error.querySelector("message").textContent;
            let alternative : string = error.getAttribute("substitution");
            let percent : number = parseInt(error.getAttribute("proba"));
            let start : number = parseInt(error.getAttribute("start"));
            let end : number = parseInt(error.getAttribute("end"));
            returnErrors.push(new CordialError(message, alternative, percent, start, end));
        }
        console.log(returnErrors);
        return returnErrors;
    }
}