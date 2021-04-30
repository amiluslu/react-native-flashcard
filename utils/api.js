import { AsyncStorage } from "react-native";

export const FL_KEY = "UND_NCP_MobileFlashcards";

function initialData() {
  return {
    "React": {
      title: "React",
      questions: [
        {
          question: "What is ReactJS?",
          answer:
            "ReactJS is an open-source frontend JavaScript library which is used for building user interfaces, specifically for single page applications."
        },
        {
          question: "What is JSX?",
          answer:
            "JSX is a syntax notation for JavaScript XML(XML-like syntax extension to ECMAScript). It stands for JavaScript XML."
        },
        {
          question: "What is virtual DOM?",
          answer:
            "The virtual DOM (VDOM) is an in-memory representation of Real DOM."
        },
        {
          question: "What is Babel?",
          answer: "Babel is a JavaScript compiler"
        }
      ]
    },
    "HTML": {
      title: "HTML",
      questions: [
        {
          question: "What does HTML stand for?",
          answer: "Hyper Text Markup Language"
        },
        {
          question: "What should values always be enclosed in?",
          answer: "Quotation marks"
        },
        {
          question:
            "Where do all items for the same web site need to be saved?",
          answer: "In the same folder"
        },
        {
          question:
            "What is always a welcome page, and explains the purpose or topic of the site?",
          answer: "Home Page"
        }
      ]
    },
    "CSS": {
      title: "CSS",
      questions: [
        {
          question: "What is CSS?",
          answer: "It describes how the HTML content will be shown on screen."
        },
        {
          question: "What are gradients in CSS?",
          answer:
            "It is a property of CSS which allows you to display a smooth transformation between two or more than two specified colors."
        },
        {
          question: "What is a CSS pseudo-class?",
          answer:
            "It is a class that is used to define a special state of an HTML element."
        },
        {
          question: "What is CSS opacity?",
          answer:
            "It is the property that elaborates on the transparency of an element."
        }
      ]
    },
    "Capital Cities": {
      title: "Capital Cities",
      questions: [
        {
          question: "What is the capital city of Germany?",
          answer: "Berlin"
        },
        {
          question: "What is the capital city of France?",
          answer: "Paris"
        },
        {
          question: "What is the capital city of Belgium?",
          answer: "Brüssel"
        },
        {
          question: "What is the capital city of Netherlands?",
          answer: "Amsterdam"
        },
        {
          question: "What is the capital city of Portugal?",
          answer: "Lisbon"
        }
      ]
    }
  };
}

export function setStore() {
  let decks = initialData();
  AsyncStorage.setItem(FL_KEY, JSON.stringify(decks));
  return decks;
}

function getStore(results) {
  if( results == null){
    results = setStore();
  }
  return results;
 // return results === null ? setStore() : results;
}

export function _getDecks() {
  
  return AsyncStorage.getItem(FL_KEY).then(JSON.stringify(getStore()));
}

export function _getDeckByTitle(title) {
  return AsyncStorage.getItem(FL_KEY).then(results => results[title]);
}

export function _saveDeck(title) {
  return AsyncStorage.mergeItem(
    FL_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    })
  );
}

export function _deleteDeck(title) {
  return AsyncStorage.getItem(FL_KEY).then(res => {
    const data = JSON.parse(res);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(FL_KEY, JSON.stringify(data));
  });
}

export function _addCard({ question, answer, name }) {
  return AsyncStorage.getItem(FL_KEY).then(results => {
    let decks = { ...JSON.parse(results) };
    decks = {
      ...decks,
      [name]: {
        ...decks[name],
        questions: decks[name].questions.concat([{ question, answer }])
      }
    };
    AsyncStorage.mergeItem(FL_KEY, JSON.stringify(decks));
  });
}
