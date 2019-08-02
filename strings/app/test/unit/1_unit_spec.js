'use strict';

let chai = require('chai');
let main = require('../../app');
let expect = chai.expect;
chai.use(require('chai-things'));

let phrase = "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.";
let broken25Phrase = "Ora, a fé é a certeza\n" + "daquilo que esperamos e a\n" + "prova das coisas que não\n" + "vemos.\n";
let text = "Ainda que eu fale as línguas dos homens e dos anjos, se não tiver amor, serei como o sino que ressoa ou como o prato que retine. Ainda que eu tenha o dom de profecia, saiba todos os mistérios e todo o conhecimento e tenha uma fé capaz de mover montanhas, se não tiver amor, nada serei. Ainda que eu dê aos pobres tudo o que possuo e entregue o meu corpo para ser queimado, se não tiver amor, nada disso me valerá.\n" +
    "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta.\n" +
    "O amor nunca perece; mas as profecias desaparecerão, as línguas cessarão, o conhecimento passará. Pois em parte conhecemos e em parte profetizamos; quando, porém, vier o que é perfeito, o que é imperfeito desaparecerá. Quando eu era menino, falava como menino, pensava como menino e raciocinava como menino. Quando me tornei homem, deixei para trás as coisas de menino. Agora, pois, vemos apenas um reflexo obscuro, como em espelho; mas, então, veremos face a face. Agora conheço em parte; então, conhecerei plenamente, da mesma forma com que sou plenamente conhecido.\n" +
    "Assim, permanecem agora estes três: a fé, a esperança e o amor. O maior deles, porém, é o amor.";

let broken10Text = "Ainda que\n" + "eu fale as\n" + "línguas\n" + "dos homens\n" + "e dos\n" + "anjos, se\n" + "não tiver\n" + "amor,\n" + "serei como\n" + "o sino que\n" + "ressoa ou\n" + "como o\n" + "prato que\n" + "retine.\n" + "Ainda que\n" + "eu tenha o\n" + "dom de\n" + "profecia,\n" + "saiba\n" + "todos os\n" + "mistérios\n" + "e todo o\n" + "conhecimento\n" + "e tenha\n" + "uma fé\n" + "capaz de\n" + "mover\n" + "montanhas,\n" + "se não\n" + "tiver\n" + "amor, nada\n" + "serei.\n" + "Ainda que\n" + "eu dê aos\n" + "pobres\n" + "tudo o que\n" + "possuo e\n" + "entregue o\n" + "meu corpo\n" + "para ser\n" + "queimado,\n" + "se não\n" + "tiver\n" + "amor, nada\n" + "disso me\n" + "valerá.\n" + "O amor é\n" + "paciente,\n" + "o amor é\n" + "bondoso.\n" + "Não\n" + "inveja,\n" + "não se\n" + "vangloria,\n" + "não se\n" + "orgulha.\n" + "Não\n" + "maltrata,\n" + "não\n" + "procura\n" + "seus\n" + "interesses,\n" + "não se ira\n" + "facilmente,\n" + "não guarda\n" + "rancor. O\n" + "amor não\n" + "se alegra\n" + "com a\n" + "injustiça,\n" + "mas se\n" + "alegra com\n" + "a verdade.\n" + "Tudo\n" + "sofre,\n" + "tudo crê,\n" + "tudo\n" + "espera,\n" + "tudo\n" + "suporta.\n" + "O amor\n" + "nunca\n" + "perece;\n" + "mas as\n" + "profecias\n" + "desaparecerão,\n" + "as línguas\n" + "cessarão,\n" + "o\n" + "conhecimento\n" + "passará.\n" + "Pois em\n" + "parte\n" + "conhecemos\n" + "e em parte\n" + "profetizamos;\n" + "quando,\n" + "porém,\n" + "vier o que\n" + "é\n" + "perfeito,\n" + "o que é\n" + "imperfeito\n" + "desaparecerá.\n" + "Quando eu\n" + "era\n" + "menino,\n" + "falava\n" + "como\n" + "menino,\n" + "pensava\n" + "como\n" + "menino e\n" + "raciocinava\n" + "como\n" + "menino.\n" + "Quando me\n" + "tornei\n" + "homem,\n" + "deixei\n" + "para trás\n" + "as coisas\n" + "de menino.\n" + "Agora,\n" + "pois,\n" + "vemos\n" + "apenas um\n" + "reflexo\n" + "obscuro,\n" + "como em\n" + "espelho;\n" + "mas,\n" + "então,\n" + "veremos\n" + "face a\n" + "face.\n" + "Agora\n" + "conheço em\n" + "parte;\n" + "então,\n" + "conhecerei\n" + "plenamente,\n" + "da mesma\n" + "forma com\n" + "que sou\n" + "plenamente\n" + "conhecido.\n" + "Assim,\n" + "permanecem\n" + "agora\n" + "estes\n" + "três: a\n" + "fé, a\n" + "esperança\n" + "e o amor.\n" + "O maior\n" + "deles,\n" + "porém, é o\n" + "amor.";

let line25 = "Ora, a fé é a certeza";
let justified25Line = "Ora,  a  fé  é  a certeza";
let justified10Text = "Ainda  que\n" + "eu fale as\n" + "línguas\n" + "dos homens\n" + "e      dos\n" + "anjos,  se\n" + "não  tiver\n" + "amor,\n" + "serei como\n" + "o sino que\n" + "ressoa  ou\n" + "como     o\n" + "prato  que\n" + "retine.\n" + "Ainda  que\n" + "eu tenha o\n" + "dom     de\n" + "profecia,\n" + "saiba\n" + "todos   os\n" + "mistérios\n" + "e  todo  o\n" + "conhecimento\n" + "e    tenha\n" + "uma     fé\n" + "capaz   de\n" + "mover\n" + "montanhas,\n" + "se     não\n" + "tiver\n" + "amor, nada\n" + "serei.\n" + "Ainda  que\n" + "eu  dê aos\n" + "pobres\n" + "tudo o que\n" + "possuo   e\n" + "entregue o\n" + "meu  corpo\n" + "para   ser\n" + "queimado,\n" + "se     não\n" + "tiver\n" + "amor, nada\n" + "disso   me\n" + "valerá.\n" + "O  amor  é\n" + "paciente,\n" + "o  amor  é\n" + "bondoso.\n" + "Não\n" + "inveja,\n" + "não     se\n" + "vangloria,\n" + "não     se\n" + "orgulha.\n" + "Não\n" + "maltrata,\n" + "não\n" + "procura\n" + "seus\n" + "interesses,\n" + "não se ira\n" + "facilmente,\n" + "não guarda\n" + "rancor.  O\n" + "amor   não\n" + "se  alegra\n" + "com      a\n" + "injustiça,\n" + "mas     se\n" + "alegra com\n" + "a verdade.\n" + "Tudo\n" + "sofre,\n" + "tudo  crê,\n" + "tudo\n" + "espera,\n" + "tudo\n" + "suporta.\n" + "O     amor\n" + "nunca\n" + "perece;\n" + "mas     as\n" + "profecias\n" + "desaparecerão,\n" + "as línguas\n" + "cessarão,\n" + "o\n" + "conhecimento\n" + "passará.\n" + "Pois    em\n" + "parte\n" + "conhecemos\n" + "e em parte\n" + "profetizamos;\n" + "quando,\n" + "porém,\n" + "vier o que\n" + "é\n" + "perfeito,\n" + "o   que  é\n" + "imperfeito\n" + "desaparecerá.\n" + "Quando  eu\n" + "era\n" + "menino,\n" + "falava\n" + "como\n" + "menino,\n" + "pensava\n" + "como\n" + "menino   e\n" + "raciocinava\n" + "como\n" + "menino.\n" + "Quando  me\n" + "tornei\n" + "homem,\n" + "deixei\n" + "para  trás\n" + "as  coisas\n" + "de menino.\n" + "Agora,\n" + "pois,\n" + "vemos\n" + "apenas  um\n" + "reflexo\n" + "obscuro,\n" + "como    em\n" + "espelho;\n" + "mas,\n" + "então,\n" + "veremos\n" + "face     a\n" + "face.\n" + "Agora\n" + "conheço em\n" + "parte;\n" + "então,\n" + "conhecerei\n" + "plenamente,\n" + "da   mesma\n" + "forma  com\n" + "que    sou\n" + "plenamente\n" + "conhecido.\n" + "Assim,\n" + "permanecem\n" + "agora\n" + "estes\n" + "três:    a\n" + "fé,      a\n" + "esperança\n" + "e  o amor.\n" + "O    maior\n" + "deles,\n" + "porém, é o\n" + "amor.";

describe('Full text test', function () {
    describe('Broken text test', function () {
        it('should break into 10 column', function (done) {

            let brokenText = main.module.part1BreakText(text, 10);

            expect(brokenText).to.be.equal(broken10Text);
            done();
        });
        it('should justify into 10 column', function (done) {

            let justifiedText = main.module.part2JustifyText(broken10Text, 10);

            expect(justifiedText).to.be.equal(justified10Text);
            done();
        });
        it('should get invalid length error', function (done) {
            try {
                return main.module.part1BreakText(text, 0)
            } catch (e) {
                expect(e.message).to.be.equal("Length should be a positive integer.");
                done();
            }
        });
        it('should get invalid type error', function (done) {
            try {
                return main.module.part1BreakText(123, 40)
            } catch (e) {
                expect(e.message).to.be.equal("Data should be a string.");
                done();
            }
        });
    });
});

describe('Intermediate functions test', function () {
    it('should break into 10 column with a last return line', function (done) {
        let brokenText = main.module.breakText(text, 10);

        expect(brokenText).to.be.equal(broken10Text + "\n");
        done();
    });
    it('should break a Phrase', function (done) {
        let brokenPhrase = main.module.breakPhrase(phrase, 25);
        expect(brokenPhrase).to.be.equal(broken25Phrase);
        done()
    });
    it('should justify a line', function (done) {
        let justifiedLine = main.module.justifyLine(line25, 25);
        expect(justifiedLine).to.be.equal(justified25Line);
        done()

    })
});

describe('Utils functions test', function () {
    it('should be true isLessThanEqual test', function (done) {
        let trueResult = main.module.isLessOrEqualThanMax(40, 40);
        expect(trueResult).to.be.equal(true);
        done();
    });
    it('should be false isLessThanEqual test', function (done) {
        let trueResult = main.module.isLessOrEqualThanMax(39, 40);
        expect(trueResult).to.be.equal(true);
        done();
    });
    it('should be true isLessThanEqual test', function (done) {
        let falseResult = main.module.isLessOrEqualThanMax(100, 40);
        expect(falseResult).to.be.equal(false);
        done();
    })
});