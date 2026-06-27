import { Icons } from '../components/Icons'; // We will create this

export const QUESTIONS = [
  {
    id: 1,
    character: 'Anu',
    statement: 'Trying drugs just once won\'t hurt me.',
    answer: 'myth',
    explanation: 'Even one use can be dangerous. Some drugs can cause severe reactions, accidents, or lead to repeated use.',
  },
  {
    id: 2,
    character: 'Meera',
    statement: 'Vapes are just flavored water vapor.',
    answer: 'myth',
    explanation: 'Many vapes contain nicotine and other chemicals that can affect developing brains and lungs.',
  },
  {
    id: 3,
    character: 'Arjun',
    statement: 'Only bad students use drugs.',
    answer: 'myth',
    explanation: 'Substance abuse can affect people from any background. Good choices and support systems help prevent it.',
  },
  {
    id: 4,
    character: 'Rahul',
    statement: 'Prescription medicines are always safe.',
    answer: 'myth',
    explanation: 'Medicines are safe only when used as directed by a doctor. Misusing them can be dangerous.',
  },
  {
    id: 5,
    character: 'Priya',
    statement: 'Drugs help people perform better in school.',
    answer: 'myth',
    explanation: 'Drug use often affects memory, concentration, decision-making, and academic performance.',
  },
  {
    id: 6,
    character: 'Deepak',
    statement: 'If my friends do it, I should too.',
    answer: 'myth',
    explanation: 'Real friends respect your decisions. Saying "No" is a sign of confidence and responsibility.',
  },
  {
    id: 7,
    character: 'Sneha',
    statement: 'Energy pills and unknown tablets are harmless.',
    answer: 'myth',
    explanation: 'Never take unknown substances. They may contain harmful or illegal ingredients.',
  },
  {
    id: 8,
    character: 'Vikram',
    statement: 'Asking for help is a weakness.',
    answer: 'myth',
    explanation: 'Asking for help shows courage and maturity. It is a sign of strength, not weakness.',
  },
  {
    id: 9,
    character: 'Kavya',
    statement: 'Drug addiction happens only to adults.',
    answer: 'myth',
    explanation: 'Young people can also be affected. Prevention and awareness are important at every age.',
  },
  {
    id: 10,
    character: 'Arun',
    statement: 'A healthy lifestyle isn\'t important.',
    answer: 'myth',
    explanation: 'Exercise, hobbies, good sleep, and supportive friends help protect physical and mental health.',
  },
];

export const BADGES = [
  { threshold: 3, icon: <Icons.Medal />, name: 'Myth Buster', desc: 'Identified 3 misconceptions' },
  { threshold: 5, icon: <Icons.Search />, name: 'Truth Seeker', desc: 'Uncovered 5 truths' },
  { threshold: 8, icon: <Icons.Shield />, name: 'Drug-Free Champion', desc: 'Defended against 8 myths' },
  { threshold: 10, icon: <Icons.Star />, name: 'Toofan Agent', desc: 'Completed the full mission' },
];
