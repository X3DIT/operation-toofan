import { Icons } from '../components/Icons'; // We will create this

export const QUESTIONS = [
  {
    id: 1,
    character: 'Pranav',
    statement: 'Natural drugs or herbal products are always safe to use.',
    answer: 'myth',
    explanation: 'Just because a substance comes from a plant doesn\'t mean it is safe. Many natural substances are toxic, addictive, or heavily altered with harmful chemicals.',
  },
  {
    id: 2,
    character: 'Ritha',
    statement: 'Mixing alcohol with energy drinks increases the risk of accidents.',
    answer: 'fact',
    explanation: 'Caffeine masks the sedating effects of alcohol, making people feel more alert than they actually are. This often leads to riskier behavior and severe alcohol poisoning.',
  },
  {
    id: 3,
    character: 'Ashir',
    statement: 'You can tell if someone is struggling with addiction just by looking at them.',
    answer: 'myth',
    explanation: 'Many people dealing with substance abuse maintain high-functioning lives, attend school, or hold jobs without showing obvious physical signs immediately.',
  },
  {
    id: 4,
    character: 'Rijo',
    statement: 'Peer pressure can be positive and help you make healthy choices.',
    answer: 'fact',
    explanation: 'Peer pressure isn\'t always negative. Friends who encourage you to exercise, study, or avoid harmful substances are examples of positive peer influence.',
  },
  {
    id: 5,
    character: 'Prajodh',
    statement: 'Using someone else\'s prescription for ADHD to study is harmless.',
    answer: 'myth',
    explanation: 'Prescription stimulants are calibrated for specific individuals. Taking them without a medical need can cause dangerous heart rates, anxiety, and dependency.',
  },
  {
    id: 6,
    character: 'Aleena',
    statement: 'Drug abuse changes how the brain processes pleasure and rewards.',
    answer: 'fact',
    explanation: 'Repeated substance use alters the brain\'s reward circuitry by flooding it with dopamine, making regular healthy activities feel less rewarding over time.',
  },
  {
    id: 7,
    character: 'Shawn',
    statement: 'Showering or drinking black coffee will sober someone up quickly.',
    answer: 'myth',
    explanation: 'Only time can sober a person up. Coffee or cold showers might make someone an "alert" intoxicated person, but their blood alcohol level stays the same.',
  },
  {
    id: 8,
    character: 'Krishna',
    statement: 'Secondhand vapor from e-cigarettes contains harmful chemicals.',
    answer: 'fact',
    explanation: 'The aerosol exhaled by vape users is not harmless water vapor; it contains nicotine, heavy metals, and ultrafine particles that bystanders breathe in.',
  },
  {
    id: 9,
    character: 'Gautham',
    statement: 'Addiction is a choice and can be cured instantly with willpower alone.',
    answer: 'myth',
    explanation: 'Addiction is a complex biological condition that alters brain chemistry. Recovery usually requires professional support, counseling, and a structured environment.',
  },
  {
    id: 10,
    character: 'Calvin',
    statement: 'Engaging in creative hobbies or sports reduces the risk of substance abuse.',
    answer: 'fact',
    explanation: 'Healthy activities provide natural dopamine rewards, build supportive social circles, and offer constructive outlets for stress management.',
  },
];

export const BADGES = [
  { threshold: 3, icon: <Icons.Medal />, name: 'Myth Buster', desc: 'Identified 3 misconceptions' },
  { threshold: 5, icon: <Icons.Search />, name: 'Truth Seeker', desc: 'Uncovered 5 truths' },
  { threshold: 8, icon: <Icons.Shield />, name: 'Drug-Free Champion', desc: 'Defended against 8 myths' },
  { threshold: 10, icon: <Icons.Star />, name: 'Toofan Agent', desc: 'Completed the full mission' },
];
