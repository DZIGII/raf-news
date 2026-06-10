"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const database_1 = require("./database/database");
const User_1 = require("./models/User");
const Category_1 = require("./models/Category");
const Tag_1 = require("./models/Tag");
const News_1 = require("./models/News");
const NewsTag_1 = require("./models/NewsTag");
const Comment_1 = require("./models/Comment");
const NewsVisits_1 = require("./models/NewsVisits");
const bcrypt_1 = __importDefault(require("bcrypt"));
function getId(instance, field) {
    return instance.get(field);
}
async function seed() {
    await database_1.sequelize.authenticate();
    await database_1.sequelize.sync({ force: true });
    const adminPass = await bcrypt_1.default.hash('admin123', 10);
    const creatorPass = await bcrypt_1.default.hash('creator123', 10);
    const creator2Pass = await bcrypt_1.default.hash('creator123', 10);
    const admin = await User_1.User.create({
        firstName: 'Nikola',
        lastName: 'Raskovic',
        email: 'admin@raf.rs',
        password: adminPass,
        role: 'ADMIN',
        isActive: true
    });
    const creator1 = await User_1.User.create({
        firstName: 'Marko',
        lastName: 'Petrovic',
        email: 'marko@raf.rs',
        password: creatorPass,
        role: 'CREATOR',
        isActive: true
    });
    const creator2 = await User_1.User.create({
        firstName: 'Ana',
        lastName: 'Jovanovic',
        email: 'ana@raf.rs',
        password: creator2Pass,
        role: 'CREATOR',
        isActive: true
    });
    const adminId = getId(admin, 'userId');
    const c1Id = getId(creator1, 'userId');
    const c2Id = getId(creator2, 'userId');
    const catTech = await Category_1.Category.create({ name: 'Tehnologija', description: 'Vesti iz sveta tehnologije, IT industrije i inovacija' });
    const catSport = await Category_1.Category.create({ name: 'Sport', description: 'Sportske vesti, rezultati i analize utakmica' });
    const catScience = await Category_1.Category.create({ name: 'Nauka', description: 'Naucna dostignuca, istrazivanja i otkrica' });
    const catCulture = await Category_1.Category.create({ name: 'Kultura', description: 'Kulturni dogadjaji, filmovi, muzika i umetnost' });
    const catEdu = await Category_1.Category.create({ name: 'Obrazovanje', description: 'Vesti iz obrazovanja, univerziteti i studentski zivot' });
    const tId = getId(catTech, 'categoryId');
    const sId = getId(catSport, 'categoryId');
    const scId = getId(catScience, 'categoryId');
    const cuId = getId(catCulture, 'categoryId');
    const eId = getId(catEdu, 'categoryId');
    const tagAI = await Tag_1.Tag.create({ keyword: 'vestacka inteligencija' });
    const tagProgramming = await Tag_1.Tag.create({ keyword: 'programiranje' });
    const tagFootball = await Tag_1.Tag.create({ keyword: 'fudbal' });
    const tagTennis = await Tag_1.Tag.create({ keyword: 'tenis' });
    const tagSpace = await Tag_1.Tag.create({ keyword: 'svemir' });
    const tagRobotika = await Tag_1.Tag.create({ keyword: 'robotika' });
    const tagFilm = await Tag_1.Tag.create({ keyword: 'film' });
    const tagRAF = await Tag_1.Tag.create({ keyword: 'RAF' });
    const tagStartup = await Tag_1.Tag.create({ keyword: 'startup' });
    const tagSrbija = await Tag_1.Tag.create({ keyword: 'Srbija' });
    const tAI = getId(tagAI, 'tagId');
    const tProg = getId(tagProgramming, 'tagId');
    const tFoot = getId(tagFootball, 'tagId');
    const tTen = getId(tagTennis, 'tagId');
    const tSpace = getId(tagSpace, 'tagId');
    const tRobot = getId(tagRobotika, 'tagId');
    const tFilm = getId(tagFilm, 'tagId');
    const tRAF = getId(tagRAF, 'tagId');
    const tStart = getId(tagStartup, 'tagId');
    const tSrb = getId(tagSrbija, 'tagId');
    const newsData = [
        { title: 'Novi napredak u vestackoj inteligenciji menja IT industriju', text: 'Poslednji meseci doneli su znacajne promene u nacinu na koji kompanije koriste vestacku inteligenciju. Veliki jezicki modeli postaju sve pristupacniji, a njihova primena se siri od automatizacije korisnicke podrske do generisanja koda. Strucnjaci predvidjaju da ce do kraja godine vecina tehnoloskoh kompanija integrisati AI u svoje proizvode. Ova transformacija donosi nove mogucnosti za developere, ali i postavlja pitanja o buducnosti odredjenih profesija. Posebno je interesantan trend u Srbiji, gde startapi sve vise koriste AI u svojim proizvodima.', userId: c1Id, categoryId: tId, like: 15, dislike: 2 },
        { title: 'Reprezentacija Srbije ostvarila veliku pobedu', text: 'Fudbalska reprezentacija Srbije odigrala je fantastican mec u kvalifikacijama i ostvarila ubedljivu pobedu. Igrac utakmice bio je nas mladi napadac koji je postigao dva gola. Selektor je nakon utakmice izjavio da je ponosan na tim i da veruje u prolazak u sledecu fazu takmicenja. Navijaci su napunili stadion i pruzili nevidjenu podrsku. Ova pobeda je znacajna za moral tima pred predstojeće utakmice.', userId: c1Id, categoryId: sId, like: 25, dislike: 1 },
        { title: 'Otkrivena nova egzoplaneta u nastanjivoj zoni', text: 'Naucnici su pomocu svemirskog teleskopa otkrili novu planetu koja se nalazi u takozvanoj nastanjivoj zoni svoje zvezde. Planeta je velicine slicne Zemlji i mogla bi imati tecnu vodu na svojoj povrsini. Ovo otkrice je izazvalo veliko uzbudjenje u naucnoj zajednici jer povecava sanse za pronalazenje vanzemaljskog zivota. Tim istrazivaca planira dalja posmatranja kako bi utvrdili sastav atmosfere planete.', userId: c2Id, categoryId: scId, like: 30, dislike: 0 },
        { title: 'RAF studenti razvili inovativnu aplikaciju', text: 'Studenti Racunarskog fakulteta razvili su aplikaciju koja koristi vestacku inteligenciju za pomoc u ucenju programiranja. Aplikacija analizira kod korisnika, predlaze poboljsanja i objasnjava greske na razumljiv nacin. Projekat je nastao u okviru studentske prakse i vec je privukao paznju nekoliko IT kompanija. Profesori su izrazili zadovoljstvo kreativnoscu studenata i kvalitetom realizovanog resenja.', userId: adminId, categoryId: eId, like: 20, dislike: 0 },
        { title: 'Premijera novog srpskog filma privukla veliku paznju', text: 'Na Beogradskom filmskom festivalu odrzana je premijera novog domaceg filma koji je odmah privukao veliku paznju publike i kritike. Film se bavi temom odrastanja u malom gradu i vec je osvojio nekoliko nagrada na medjunarodnim festivalima. Reditelj je izjavio da je inspiraciju nasao u sopstvenom detinjstvu. Bioskopske projekcije krecu sledece nedelje.', userId: c2Id, categoryId: cuId, like: 12, dislike: 3 },
        { title: 'Novi programski jezik osvaja popularnost medju developerima', text: 'Programski jezik koji je razvijen pre samo dve godine belezi eksponencijalan rast popularnosti. Developeri hvale njegovu jednostavnost, performanse i moderan pristup upravljanju memorijom. Sve veci broj kompanija pocinje da ga koristi za backend razvoj, a zajednica oko jezika raste svakim danom. Na RAF-u je vec uveden kao izborni predmet na visim godinama studija.', userId: c1Id, categoryId: tId, like: 18, dislike: 5 },
        { title: 'Novak Djokovic se priprema za naredni Grand Slam', text: 'Novak Djokovic je zapoceo pripreme za naredni Grand Slam turnir. Srpski teniser je u odlicnoj formi i veruje da moze da osvoji jos jedan trofej. Njegov tim je potvrdio da je Novak potpuno zdrav i motivisan. Trenira po intenzivnom programu koji ukljucuje i rad sa novim trenerom za fizicku pripremu. Navijaci sirom sveta nestrpljivo ocekuju njegov nastup.', userId: c1Id, categoryId: sId, like: 35, dislike: 2 },
        { title: 'Robotika u Srbiji - rastuca industrija', text: 'Srbija postaje sve prepoznatljivija na mapi robotike u Evropi. Nekoliko domacih kompanija razvija robotska resenja za industriju, medicinu i poljoprivredu. Na nedavnoj konferenciji u Beogradu predstavljeni su roboti koji mogu da obavljaju precizne hirurske zahvate. Vlada najavljuje nove podsticaje za razvoj robotike i vestacke inteligencije u zemlji.', userId: c2Id, categoryId: tId, like: 22, dislike: 1 },
        { title: 'Medjunarodni naucni projekat sa ucescem srpskih naucnika', text: 'Grupa srpskih naucnika ucestvuje u velikom medjunarodnom projektu istrazivanja svemira. Projekat, koji finansira Evropska svemirska agencija, ima za cilj razvoj novih tehnologija za istrazivanje Marsa. Srpski tim je zaduzen za razvoj senzora koji ce se koristiti na marsovskim roverima. Ovo je jedan od najvecih naucnih projekata u kojima Srbija ucestvuje.', userId: adminId, categoryId: scId, like: 28, dislike: 0 },
        { title: 'IT konferencija okupila preko 2000 ucesnika u Beogradu', text: 'Najveca IT konferencija u regionu odrzana je u Beogradu i privukla je vise od 2000 ucesnika iz cele Evrope. Na konferenciji su predstavljeni najnoviji trendovi u web razvoju, cloud tehnologijama i vestackoj inteligenciji. Posebnu paznju privukla su predavanja o buducnosti programiranja i ulozi AI alata u svakodnevnom radu developera. Organizatori najavljuju da ce sledece godine konferencija biti jos veca.', userId: c1Id, categoryId: tId, like: 16, dislike: 1 },
        { title: 'Uspeh mladih sportista na evropskom prvenstvu', text: 'Mladi sportisti iz Srbije ostvarili su izvanredne rezultate na Evropskom prvenstvu. Osvojene su tri zlatne, dve srebrne i jedna bronzana medalja. Posebno se istakla ekipa u atletici koja je postavila novi drzavni rekord. Sportski savez je najavio dodatna ulaganja u razvoj mladih sportista i poboljsanje uslova za treniranje.', userId: c2Id, categoryId: sId, like: 19, dislike: 0 },
        { title: 'Novi studijski programi na RAF-u', text: 'Racunarski fakultet uvodi nove studijske programe od naredne skolske godine. Planirani su programi iz oblasti vestacke inteligencije, sajber bezbednosti i razvoja video igara. Ovi programi su dizajnirani u saradnji sa vodecim IT kompanijama i pruze studentima prakticna znanja potrebna na trzistu rada. Prijave za nove programe pocet ce u martu.', userId: adminId, categoryId: eId, like: 24, dislike: 2 },
    ];
    const newsItems = [];
    for (const data of newsData) {
        const n = await News_1.News.create(data);
        newsItems.push(getId(n, 'newsId'));
    }
    const [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12] = newsItems;
    await NewsTag_1.NewsTag.bulkCreate([
        { newsId: n1, tagId: tAI },
        { newsId: n1, tagId: tProg },
        { newsId: n1, tagId: tStart },
        { newsId: n2, tagId: tFoot },
        { newsId: n2, tagId: tSrb },
        { newsId: n3, tagId: tSpace },
        { newsId: n4, tagId: tRAF },
        { newsId: n4, tagId: tAI },
        { newsId: n4, tagId: tProg },
        { newsId: n5, tagId: tFilm },
        { newsId: n5, tagId: tSrb },
        { newsId: n6, tagId: tProg },
        { newsId: n7, tagId: tTen },
        { newsId: n7, tagId: tSrb },
        { newsId: n8, tagId: tRobot },
        { newsId: n8, tagId: tAI },
        { newsId: n8, tagId: tSrb },
        { newsId: n9, tagId: tSpace },
        { newsId: n9, tagId: tSrb },
        { newsId: n10, tagId: tProg },
        { newsId: n10, tagId: tAI },
        { newsId: n11, tagId: tSrb },
        { newsId: n12, tagId: tRAF },
        { newsId: n12, tagId: tAI },
    ]);
    await Comment_1.Comment.bulkCreate([
        { authorName: 'Petar', content: 'Odlican clanak, veoma informativan!', newsId: n1, like: 3, dislike: 0 },
        { authorName: 'Jovana', content: 'AI je definitivno buducnost.', newsId: n1, like: 5, dislike: 1 },
        { authorName: 'Milan', content: 'Svaka cast momcima!', newsId: n2, like: 10, dislike: 0 },
        { authorName: 'Jelena', content: 'Fantastican mec!', newsId: n2, like: 7, dislike: 0 },
        { authorName: 'Stefan', content: 'Fascinantno otkrice!', newsId: n3, like: 8, dislike: 0 },
        { authorName: 'Milica', content: 'Bravo za RAF studente!', newsId: n4, like: 6, dislike: 0 },
        { authorName: 'Lazar', content: 'Jedva cekam da pogledam film.', newsId: n5, like: 4, dislike: 1 },
        { authorName: 'Dusan', content: 'Idemo Nole!', newsId: n7, like: 15, dislike: 1 },
        { authorName: 'Katarina', content: 'Odlicna vest za Srbiju!', newsId: n8, like: 3, dislike: 0 },
        { authorName: 'Nikola', content: 'RAF je najbolji fakultet!', newsId: n12, like: 9, dislike: 2 },
    ]);
    const now = Date.now();
    const visits = [];
    const visitData = [
        [n7, 50], [n3, 40], [n2, 35], [n1, 30], [n9, 25],
        [n4, 20], [n10, 15], [n12, 12], [n5, 10], [n11, 8]
    ];
    for (const [nId, count] of visitData) {
        for (let i = 0; i < count; i++) {
            visits.push({ newsId: nId, visitedAt: new Date(now - Math.random() * 20 * 86400000) });
        }
    }
    await NewsVisits_1.NewsVisits.bulkCreate(visits);
    console.log('Seed completed successfully!');
    console.log('Admin: admin@raf.rs / admin123');
    console.log('Creator 1: marko@raf.rs / creator123');
    console.log('Creator 2: ana@raf.rs / creator123');
    process.exit(0);
}
seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map