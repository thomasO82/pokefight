// @ts-ignore
import promptSync from "prompt-sync";

const prompt: any = promptSync();
const attack_player_one: string[] = ["charge", "soin", "aqua-jet", "draco-rage"];
const attack_player_two: string[] = ["charge", "soin", "aqua-jet", "draco-rage"];
let lifePlayerOne: number = 50;
let lifePlayerTwo: number = 50;
let round: number = 1;
let currentPlayer: number = 1;

function game(){
    let userChoice: number = 0;
    let choisenAttack: string = "";
    while(lifePlayerTwo > 0 && lifePlayerOne > 0){
        displayLife()
        if (round % 2 != 0){
            console.log("choisissez votre attaque")
            for (let i: number = 0; i < attack_player_one.length; i++) {
                console.log(attack_player_one[i] + "("+ i +")")
            }
            userChoice = parseInt(prompt())
            console.clear()
            choisenAttack = attack_player_one[userChoice]
            attack(choisenAttack)
        }else{
            choisenAttack = cpuChoiceAttack()
            attack(choisenAttack)
        }
        console.log("le CPU utilise " + choisenAttack)
        if (prompt("Appuyer sur entrer pour continuer, ou entrez 'q' pour quitter") === "q"){
            break
        }
        console.clear()
        round++
    }
    if (lifePlayerOne < 1){
        console.log("vous avez perdu")
    }else if(lifePlayerTwo < 1){
        console.log("vouys avez gagné")
    }
}


function attack(attack: string): void {
    let attackHasSucceed: boolean = false;
    let dice: number = 0;
    switch (attack) {
        case "charge":
            attackHasSucceed = checkIfAttackHasSucceed(0, 1);
            if (attackHasSucceed) {
                updateLifeOpponent(-10);
            }
            break
        case "soin":
            attackHasSucceed = checkIfAttackHasSucceed(0, 1);
            if (attackHasSucceed) {
                updateLifeCurrentPlayer(10)
            }
            break
        case "aqua-jet":
            attackHasSucceed = checkIfAttackHasSucceed(0, 2);
            if (attackHasSucceed) {
                updateLifeOpponent(-20);
            }
            break
        case "draco-rage":
            attackHasSucceed = checkIfAttackHasSucceed(0, 4);
            if (attackHasSucceed) {
                updateLifeOpponent(-50);
            }
            break
        default:
            console.log("votre creature n'a pas compris votre ordre !!! vous perdez un tour")
    }
}

function checkIfAttackHasSucceed(min: number, max: number): boolean {
    let sentence: string = "";
    if (round % 2 === 0){
        sentence = "L'attaque du CPU a "
    }else{
        sentence = "Votre attaque a "
    }
    let attackHasSucceed: boolean = false;
    let dice: number = aleatoire(min, max);
    if (dice == max) {
        attackHasSucceed = true;
        console.log(sentence + "réussie" )
    }else{
        console.log(sentence + "échouée" )

    }
    return attackHasSucceed
}

function aleatoire(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
}

function updateLifeOpponent(modificator: number): void {
    if (round % 2 === 0) {
        lifePlayerOne = lifePlayerOne + modificator
    } else {
        lifePlayerTwo = lifePlayerTwo + modificator
    }
}

function updateLifeCurrentPlayer(modificator: number): void {
    if (round % 2 === 0) {
        lifePlayerTwo = lifePlayerTwo + modificator
    } else {
        lifePlayerOne = lifePlayerOne + modificator
    }
}

function cpuChoiceAttack(): string{
    let dice: number = aleatoire(0, attack_player_two.length - 1);
    let attack: string = attack_player_two[dice];
    return attack;
}

function displayLife(){
    console.log("votre adversaire a: " + lifePlayerTwo + "PV")
    console.log("vous avez: " + lifePlayerOne + "PV")
}

game()


