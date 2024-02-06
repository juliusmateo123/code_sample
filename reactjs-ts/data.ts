import img1 from './assets/imagess/1.jpg'
import img2 from './assets/imagess/2.jpg'
import img3 from './assets/imagess/3.jpg'
import img4 from './assets/imagess/4.jpg'
import img5 from './assets/imagess/5.jpg'
import img6 from './assets/imagess/6.jpg'
import img7 from './assets/imagess/7.jpg'
import img8 from './assets/imagess/8.jpg'
import img9 from './assets/imagess/9.jpg'
import img10 from './assets/imagess/10.jpg'
import img11 from './assets/imagess/11.jpg'
import img12 from './assets/imagess/12.jpg'
import img13 from './assets/imagess/13.jpg'
import img14 from './assets/imagess/14.jpg'
import img15 from './assets/imagess/15.jpg'
import img16 from './assets/imagess/16.jpg'
import img17 from './assets/imagess/17.jpg'
import img18 from './assets/imagess/18.jpg'
import img19 from './assets/imagess/19.jpg'
import img20 from './assets/imagess/20.jpg'
import img21 from './assets/imagess/21.jpg'
import img22 from './assets/imagess/22.jpg'
import img23 from './assets/imagess/23.jpg'
import img24 from './assets/imagess/24.jpg'
import img25 from './assets/imagess/25.jpg'


interface Quiz {
    id: number
    image: string
    question: string
    answer: string,
    hint?: string[],
    completed: boolean
}

interface User {
    id?: number
    name?: string
    score?: number
}

const quizessData : Array<Quiz> = [
    {
        id: 1,
        question: 'Sino ang naka black na cap?',
        answer: 'Mark Montecillo',
        image: img1,
        hint: ['CE', 'Freshgraduate'],
        completed: false
    },
    {
        id: 2,
        question: 'Sino ang kasama ni Boss Raf?',
        answer: 'Wein Gomez',
        image: img2,
        hint: ['Asawa ni Boss Raf'],
        completed: false
    },
    {
        id: 3,
        question: 'Sino ang may bandanang kulay red?',
        answer: 'Mark Solinap',
        image: img3,
        hint: ['Red Team', 'Senior CE', 'Bokalista ng banda'],
        completed: false
    },
    {
        id: 4,
        question: 'Sino ang may shades sa ulo?',
        answer: 'Yuki Sakakibara',
        image: img4,
        hint: ['Pink Team', 'Producer'],
        completed: false
    },
    {
        id: 5,
        question: 'Sino and unang tao sa harap? yung ligaya na ligaya',
        answer: 'Micko Genovana',
        image: img5,
        hint: ['QA ng Dupixent'],
        completed: false
    },
    {
        id: 6,
        question: 'Sino itong babae na naghawi ng hair?',
        answer: 'Marivie Jaro',
        image: img6,
        hint: ['Support/QA', 'Kaldag ang tawag sa kanya'],
        completed: false
    },
    {
        id: 7,
        question: 'Sino itong naka salamin?',
        answer: 'Bryan Privado',
        image: img7,
        hint: ['Junior Producer', 'Trainor', 'Ruffamae Quinto ang tawag sa kanya'],
        completed: false
    },
    {
        id: 8,
        question: 'Sino itong masayang tao na ito?',
        answer: 'Stephen Sayson',
        image: img8,
        hint: ['QA Support', 'Chickboy'],
        completed: false
    },
    {
        id: 9,
        question: 'Peace tayo! Sino siya?',
        answer: 'Daryl Marquez',
        image: img9,
        hint: ['General QA', 'kapatid ni Ms. Camille'],
        completed: false
    },
    {
        id: 10,
        question: 'Rock and Roll! Sino ako?',
        answer: 'Clint Constantino',
        image: img10,
        hint: ['CE', 'Solid BBM Fan'],
        completed: false
    },
    {
        id: 11,
        question: 'Sino ako?',
        answer: 'Jeero Bukas',
        image: img11,
        hint: ['Senior CE', 'Bokalista ng Banda', 'Tomorrow ang tawag sa kanya'],
        completed: false
    },
    {
        id: 12,
        question: 'Cool lang! Sino ako?',
        answer: 'Joemer Borbe',
        image: img12,
        hint: ['CE ng Global Genzyme/CHC'],
        completed: false
    },
    {
        id: 13,
        question: 'Sino ang kasama ni Ms. Angel?',
        answer: 'Laurden Lopez',
        image: img13,
        hint: ['Analytics'],
        completed: false
    },
    {
        id: 14,
        question: 'Sino ang kasama ni Marivie?',
        answer: 'Ailo Noscal',
        image: img14,
        hint: ['Frontend Developer', 'Under CHC Pod'],
        completed: false
    },
    {
        id: 15,
        question: 'Sino ang hindi naka Shades?',
        answer: 'Jeff Anthony Cartago',
        image: img15,
        hint: ['Frontend Developer', 'Team leader ng yellow team', 'I dont know the lyrics but the chocolate is for diana'],
        completed: false
    },
    {
        id: 16,
        question: 'Sino ito?',
        answer: 'Diana Mendoza',
        image: img16,
        hint: ['QA ng Web Factory', 'Hobby Skating', 'Nezuko'],
        completed: false
    },
    {
        id: 17,
        question: 'Sino siya?',
        answer: 'Jan Loraine Satera',
        image: img17,
        hint: ['Web Factory Developer', 'GF ni Sir Lebue'],
        completed: false
    },
    {
        id: 18,
        question: 'Sino ang panalo?',
        answer: 'Julius Xavier Romero',
        image: img18,
        hint: ['Pogi', 'Overall Champion Team Building'],
        completed: false
    },
    {
        id: 19,
        question: 'Sino ang nasa harap?',
        answer: 'Greg Flores',
        image: img19,
        hint: ['Web Factory Developer', 'Vaper'],
        completed: false
    },
    {
        id: 20,
        question: 'Sino siya?',
        answer: 'Jonathan del Mar',
        image: img20,
        hint: ['Plain Distro', 'Producer Pasteur/HCP'],
        completed: false
    },
    {
        id: 21,
        question: 'Sino ang nasa likod ni JayR?',
        answer: 'Alvin Musa',
        image: img21,
        hint: ['Senior CE', 'Boy Gundam'],
        completed: false
    },
    {
        id: 22,
        question: 'Sino siya?',
        answer: 'Leen Abellanosa',
        image: img22,
        hint: ['Support Agent', 'HA! Ganyan sya tumawa'],
        completed: false
    },
    {
        id: 23,
        question: 'Sino siya?',
        answer: 'Liandre de castro',
        image: img23,
        hint: ['Akamai Expert', 'Backend Developer'],
        completed: false
    },
    {
        id: 24,
        question: 'Sino siya?',
        answer: 'Rodolfo Perez',
        image: img24,
        hint: ['Jun', 'The only sitecore developer'],
        completed: false
    },
    {
        id: 25,
        question: '????',
        answer: 'Raphael Gomez',
        image: img25,
        hint: ['Bossing pamasko po'],
        completed: false
    }
];


const usersData : Array<User> = [
    // {
    //     id: 1,
    //     name: 'Julius R.',
    //     score: 0
    // },
    // {
    //     id: 2,
    //     name: 'Earvin',
    //     score: 0
    // },
    // {
    //     id: 3,
    //     name: 'Jowel',
    //     score: 0
    // },
    // {
    //     id: 4,
    //     name: 'Robin',
    //     score: 0
    // },
    // {
    //     id: 5,
    //     name: 'Dino',
    //     score: 0
    // },
    // {
    //     id: 6,
    //     name: 'Angel',
    //     score: 0
    // },
    // {
    //     id: 7,
    //     name: 'Daryl',
    //     score: 0
    // },
    // {
    //     id: 8,
    //     name: 'Kenny',
    //     score: 0
    // },
    // {
    //     id: 9,
    //     name: 'Ryan U.',
    //     score: 0
    // },
    // {
    //     id: 10,
    //     name: 'Gerry Mae',
    //     score: 0
    // },
    // {
    //     id: 11,
    //     name: 'Kevin',
    //     score: 0
    // },
    // {
    //     id: 12,
    //     name: 'Joegie',
    //     score: 0
    // },
    // {
    //     id: 13,
    //     name: 'JR',
    //     score: 0
    // },
    // {
    //     id: 14,
    //     name: 'Joshua',
    //     score: 0
    // },
    // {
    //     id: 15,
    //     name: 'Leo',
    //     score: 0
    // }
    
]

export {
    quizessData,
    usersData
};