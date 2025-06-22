export const restrictionsDb: Array<Restriction> = [
  {
    id: 1,
    name: "Vegana",
    title: "Dieta vegana",
    image: require("@/assets/images/veganismo.jpg"),
    type: "dietary-pattern",

  },
  {
    id: 2,
    name: "Vegetariana",
    title: "Dieta vegetariana",
    image: require("@/assets/images/dieta-vegetariana.jpg"),
    type: "dietary-pattern",

  },
  {
    id: 3,
    name: "Ovolactovegetariana",
    title: "Dieta ovolactovegetariana",
    image: require("@/assets/images/ovolactovegetarianismo.jpg"),
    type: "dietary-pattern",

  },
  {
    id: 4,
    name: "Onívora (comum)",
    title: "Dieta onívora (comum)",
    image: require("@/assets/images/dieta-onivora.jpg"),
    type: "dietary-pattern",

  },
  {
    id: 5,
    name: "Outra",
    type: "dietary-pattern",

  },
  {
    id: 6,
    name: "APLV",
    title: "Alergia a proteína do leite de vaca (APLV)",
    image: require("@/assets/images/leite-de-vaga.png"),
    type: "condition",

  },
  {
    id: 7,
    name: "Intolerância à lactose",
    title: "Intolerância à lactose",
    image: require("@/assets/images/intolerancia-a-lactose.jpg"),
    type: "condition",
    description: {
      "summary": [
        "Intolerância à lactose é o nome que se dá à incapacidade parcial ou completa de digerir o açúcar existente no leite e seus derivados. Ela ocorre quando o organismo não produz, ou produz em quantidade insuficiente, uma enzima digestiva chamada lactase, que quebra e decompõe a lactose, ou seja, o açúcar do leite.",
        "Como consequência, essa substância chega ao intestino grosso inalterada. Ali, ela se acumula e é fermentada por bactérias que fabricam ácido lático e gases, promovem maior retenção de água e o aparecimento de diarreias e cólicas."
      ],
      "types": [
        "Deficiência congênita – por um problema genético, a criança nasce sem condições de produzir lactase (forma rara, mas crônica)",
        "Deficiência primária – diminuição natural e progressiva na produção de lactase a partir da adolescência e até o fim da vida (forma mais comum)",
        "Deficiência secundária – a produção de lactase é afetada por doenças  intestinais, como diarreias, síndrome do intestino irritável, doença de Crohn, doença celíaca, ou alergia à proteína do leite, por exemplo. Nesses casos, a intolerância pode ser temporária e desaparecer com o controle da doença de base."
      ],
      "symptoms": "Os sintomas mais comuns são náusea, dores abdominais, diarréia ácida e abundante, gases e desconforto. A severidade dos sintomas depende da quantidade ingerida e da quantidade de lactose que cada pessoa pode tolerar. Em muitos casos pode ocorrer somente dor e/ou distensão abdominal, sem diarréia. Os sintomas podem levar de alguns minutos até muitas horas para aparecer. A peristaltase, ou seja, o movimento muscular que empurra o alimento ao longo do estômago pode influenciar o tempo para o aparecimento dos sintomas. Apesar de os problemas não serem perigosos eles podem ser bastante desconfortáveis.",
      "treatment": "A intolerância à lactose não é uma doença. É uma carência do organismo que pode ser controlada com dieta e medicamentos.",
      "sources": [
        "https://bvsms.saude.gov.br/intolerancia-a-lactose/",
        "https://drauziovarella.uol.com.br/doencas-e-sintomas/intolerancia-a-lactose/"
      ]
    }
  },
  {
    id: 8,
    name: "Alergia à amendoim",
    title: "Alergia à amendoim",
    image: require("@/assets/images/amendoim.jpeg"),
    type: "condition",

  },
  {
    id: 9,
    name: "Alergia a proteína do ovo",
    title: "Alergia a proteína do ovo",
    image: require("@/assets/images/intolerancia-a-lactose.jpg"),
    type: "condition",

  },
  {
    id: 10,
    name: "Alergia ao glúten",
    title: "Alergia ao glúten",
    image: require("@/assets/images/gluten.jpg"),
    type: "condition",

  },
  {
    id: 11,
    name: "Alergia a crustáceos",
    title: "Alergia a crustáceos",
    image: require("@/assets/images/crustáceos.jpg"),
    type: "condition",

  },
  {
    id: 12,
    name: "Alergia a oleoginosas",
    title: "Alergia a oleoginosas",
    image: require("@/assets/images/oleaginosas.jpg"),
    type: "condition",

  },
];
