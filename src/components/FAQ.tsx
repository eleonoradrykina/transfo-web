import Question from "./Question";

interface Props {
  copy: any;
}

const FAQ = ({ copy }: Props) => {
  return (
    <div id="faq" className="faq">
      <button id="faq__back__button" className="button faq__button back">
        {copy.faq.back.toUpperCase()}
        <span className="button__arrow right">→</span>
      </button>
      <h2 className="faq__title"> {copy.faq.title}</h2>
      <div id="faq__questions" className="faq__questions">
        <div className="faq__questions__col">
          <Question question="Hoe geraak ik op het evenement?">
            <p>
              Dicht bij het evenement zijn de parkeerplaatsen beperkt. We raden
              dus aan op zo veel mogelijk met de fiets, te voet of met het
              openbaar vervoer te komen.
            </p>
          </Question>
          <Question question="Waar kan ik mijn fiets parkeren?">
            <img src="/map-bikes.webp" />
            <p className="font-bold">Met de fiets heb je de volgende opties:</p>
            <ul>
              <li>
                Het grasplein vooraan de site, bereikbaar via de Blokellestraat
                en de Transfostraat
              </li>
              <li>
                De parking aan de achterkant van de site, bereikbaar via de
                Otegemstraat.
              </li>
            </ul>
          </Question>
          <Question question="Waar kan ik mijn auto parkeren?">
            <img src="/map-cars.webp" />
            <p className="font-bold">Met de auto heb je de volgende opties:</p>
            <ul>
              <li>
                Een beperkt aantal plaatsen zijn beschikbaar aan de voorkant van
                de site, bereikbaar via de Blokellestraat
              </li>
              <li>
                De parking aan de achterkant van de site, bereikbaar via de
                Otegemstraat.
              </li>
              <li>Parkeren in de Stoomstraat</li>
            </ul>
            <p className="mt-8">
              De volgende parkings liggen iets verder, maar zijn ook
              beschikbaar, indien nodig:
            </p>
            <ul>
              <li>Parking Intratuin</li>
              <li>Parking OC Slypemolen (OC Kappaert) </li>
              <li>Parking Gemeentepunt</li>
              <li>Parkeren in omliggende straten</li>
            </ul>
          </Question>
          <Question question="Hoeveel kost het evenement?">
            <p>
              De avond is helemaal gratis! Je kan op elk moment vrij binnen- en
              buitenwandelen.
            </p>
          </Question>
        </div>
        <div className="faq__questions__col">
          <Question question="Zijn er ook activiteiten speciaal voor kinderen?">
            <p>
              Het evenement is bedoeld voor alle leeftijden! Zo zullen de
              kinderen bijvoorbeeld de Amibots van de Breinbrouwerij kunnen
              bewonderen en op stickerzoektocht kunnen gaan.
            </p>
          </Question>
          <Question question="Is het evenement toegankelijk voor mensen met beperkte mobiliteit?">
            <p>
              Het evenement is toegankelijk voor mensen met beperkte mobiliteit.
              De route is ongeveer 750m lang en bevat één trap. Mensen met
              beperkte mobiliteit kunnen hier gebruik maken van een lift
              (uitgang machinezaal).
            </p>
            <p>
              Hou er rekening mee dat het terrein buiten niet altijd effen is en
              dat er stukken deels of volledig onverhard zijn.
            </p>
          </Question>

          <Question question="Kan ik iets drinken en eten op het evenement?">
            <p>
              Aan de Duiktank zal je de kans hebben om iets te drinken. Er zal
              geen eten verkocht worden op het evenement.
            </p>
          </Question>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
