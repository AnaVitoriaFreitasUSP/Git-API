class GitView{
    geraCor(){
        let hexadecimais = '0123456789ABCDEF';
        let cor = '#';
        for (let i = 0; i < 6; i++ ) {
            cor += hexadecimais[Math.floor(Math.random() * 16)];
        }
        return cor;
    }

    createDiv(type, atributte, whereToShow){
        let div = document.createElement("div");
        div.setAttribute(type, atributte);
        div.style.backgroundColor = this.geraCor();
        whereToShow.appendChild(div);
        return div;
    }

    createImage(type, atributte, url, whereToShow){
        let img = document.createElement("img");
        img.setAttribute(type, atributte);
        img.src = url;
        whereToShow.appendChild(img);
    }

    createParagraph(type, atributte, text, whereToShow){
        let p = document.createElement("p");
        p.setAttribute(type, atributte);
        p.textContent = text;
        whereToShow.appendChild(p);

    }

    createParagraphLanguage(type, atributte, text, whereToShow){
        let p = document.createElement("p");
        p.setAttribute(type, atributte);
        if(text){
            p.textContent = `Language used: ${text}`;
        }else{
            p.textContent = "Language used: Not shown."
        }
        whereToShow.appendChild(p);
    }
}

class GitModel{
    userRequest(user){
        let firstRequest = new XMLHttpRequest();
        firstRequest.open("GET", `https://api.github.com/users/${user}`);
        return firstRequest;
    }

    repoRequest(user){
        let secondRequest = new XMLHttpRequest();
        secondRequest.open("GET", `https://api.github.com/users/${user}/repos`);
        return secondRequest;
    }
}


class GitController{
    removeElements(from, what){
        from.removeChild(what);
    }

    removeAtributtes(from, what){
        from.removeAttribute(what);
    }

    getValue(from){
        return from.value;
    }

    putValue(from, text){
        from.textContent = text;
    }
    
    callTheWholeThing(){
        document.getElementById("searchButton").addEventListener("click", () => {
            let view = new GitView();
            let model = new GitModel();
            let user = this.getValue(document.getElementById("search"));
        
            let first = model.userRequest(user);
        
            first.addEventListener("load", () => {
                this.removeElements(document.getElementById("container"), document.getElementById("search"));
                this.removeElements(document.getElementById("container"), document.getElementById("searchButton"));
                this.removeAtributtes(document.getElementsByClassName("containerDynamic")[0], "id");
        
                let second = model.repoRequest(user);        
                second.addEventListener("load", () => {
                    
                    JSON.parse(second.responseText).forEach((element) => {
                        let div = view.createDiv("class", "repo", document.getElementById("listOfRepos"));
                        view.createParagraph("class", "name", `Repo name: ${element.name}`, div);
                        view.createParagraphLanguage("class", "language", element.language, div);
                    });
        
                    
                }, false);
        
                second.send();
        
                view.createImage("id", "img", JSON.parse(first.responseText).avatar_url, document.getElementById("firstInnerDiv"));
                view.createParagraph("id", "userName", JSON.parse(first.responseText).name, document.getElementById("firstInnerDiv"));
        
                this.putValue(document.getElementById("repos"),"List of Repositories");
        
        
            }, false);
        
            first.send();
        });
    }
}


let controller = new GitController();
controller.callTheWholeThing();




