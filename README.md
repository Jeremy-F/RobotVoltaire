# C'est quoi ? #
L'objectif de cette application chrome est de permettre aux étudiants d'avoir une aide suplémentaire lors de la réalisation de leurs exercices sur le site web projet-voltaire. 

# Comment ca marche (Version simple) #
Lorsque vous cliquez sur le bouton "Help", l'application copie la phrase est la colle sur le site http://www.cordial-enligne.fr/

# CCM (V Geek) #
L'ensemble de l'application est codé en TypeScript. 
Tout comme un site web j'ai fais le choix de la découper en deux partie, une "Background" (ca pourrait représenter le côté serveur), et une partie "FrontEnd". 
## FrontEnd ##
C'est un script qu'on retrouve dans "ts/FrontEnd".
On injecte directement ce script sur toute les pages https://www.projet-voltaire.fr/voltaire/
Une fois injecté le script créé un bouton "help" sur les pages comportant des "sentences" (phrase).
Lorsque l'utilisateur clique sur le bouton le script copie la phrase et l'envoie à la partie background pour connaitre les erreurs. 
Une fois la réponse reçut, le script analyse et met en forme la réponse.

## Background (Backend) ##
Il devrait s'appeler BackEnd... 
Il permet d'injecter justement le frontEnd, ainsi que d'analyser les phrases envoyé par le frontEnd. 
Pour l'analyse nous envoyer une requête (post, XML) à cordial qui nous répond en XML. Il faut alors parser l'ensemble du messsage pour créer un objet simple d'utilisation pour que le frontend ne "travail" pas trop. 
L'objectif étant de donner tous le boulot au Background biensûr. 

# How to ? #
J'utilise Watchify (browserify) pour concataner les dépences. 
``` watchify ts/Background/BackgroundMain.js -o jsGenerated/Background.js ```
``` watchify ts/FrontEnd/FrontEndMain.js -o jsGenerated/FrontEnd.js ```

# Download ? #


# Contact #
Jérémy Fornarino -> http://www.creatio.fr/



 
