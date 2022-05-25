module.exports = {
    wordFrequency: function(doc, word){
        let regex = new RegExp("\\b" + word + "\\b", "gim");
        regex = JSON.stringify(doc.match(regex));
        return regex;
    },

    wordSentences: function(doc, word){
        let regex = new RegExp("([\\w\\sa-zA-ZçÇÀ-ú()“”/]+)?\\b" + word + "\\b([\\w\\sa-zA-ZçÇÀ-ú()“”/]+)?", "gim");
        regex = JSON.stringify(doc.match(regex));
        return regex;
    },

    topWords: function(doc, count, minWordLength){

        let regex = doc.match(/[a-zÀ-ú]+/gmi)
        let map = new Map();
        
        transformLowerCase();
        filterWordLength();
        countOcorrencyWord();
        regex = Array.from(map);
        sortWords();
        regex = regex.slice(0, count);

        // FUNCTIONS
        function transformLowerCase(){
            for(let i = 0; i < regex.length; i++){
                regex[i] = regex[i].toLowerCase();
            }
        }

        function filterWordLength(){
            for(let i = regex.length - 1; i >= 0; i--){
                if(regex[i].length < minWordLength){
                    regex.splice(i, 1)
                }
            }
        }
        
        function countOcorrencyWord(){
            for(let i = 0; i < regex.length; i++){   
                let count = 0;  
                for(let j = regex.length - 1; j >= 0; j--){
                    if(regex[i] === regex[j]){
                        count++;
                        if(i != j){
                            regex.splice(j, 1)
                        }
                    }
                }
                map.set(regex[i], count);
            } 
        }
        
        function sortWords(){
            let sort = false;
            let aux;
            while(sort == false){
                sort = true;
                for(let i = regex.length - 2; i >= 0; i--){
                    if(regex[i][1] < regex[i + 1][1]){
                        aux = regex[i];
                        regex[i] = regex[i + 1];
                        regex[i + 1] = aux; 
                        sort = false;
                    }
                }
            }
        }

        return regex;
    }
}